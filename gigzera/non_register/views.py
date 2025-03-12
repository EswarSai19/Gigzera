from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib.auth.hashers import check_password, make_password
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ValidationError
from django.contrib import messages
import json
import re
import random
import requests
from django.core.cache import cache
from .utils import send_sms
from django.utils.timezone import now
from db_schemas.models import Contact, PartnerLogos, JobsPageImages, WebAnnouncement, JobsPageAdv, Client, ProjectsDisplay, Freelancer, Skill, Certificate
# from .forms import ContactForm


currency_symbols = {
    "USD": "$", "EUR": "€", "JPY": "¥", "GBP": "£", "CNY": "¥", 
    "AUD": "A$", "CAD": "C$", "CHF": "CHF", "INR": "₹", "NZD": "NZ$"
}
def get_currency_symbol(currency_code):
    return currency_symbols.get(currency_code, "-")

# Index
def index(request):
    jobs = ProjectsDisplay.objects.all().order_by('-created_at')[0:3]
    
    for job in jobs:
        job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]
        job.cur_symbol = get_currency_symbol(job.currency)
    logos = PartnerLogos.objects.all()
    print(len(logos), "the length of logos")
    context = {'jobs': jobs, 'logos':logos}
    return render(request, 'non_register/index.html', context)

def jobs(request):

    is_mobile = 'Mobi' in request.META.get('HTTP_USER_AGENT', '')

    jobs = ProjectsDisplay.objects.all().order_by('-created_at')

    sec1 = JobsPageAdv.objects.filter(section_name="sec_1").all()
    sec2 = JobsPageAdv.objects.filter(section_name="sec_2").all()
    sec3 = JobsPageAdv.objects.filter(section_name="sec_3").all()
    web_obj = WebAnnouncement.objects.all().order_by('-created_at').first()
    images = JobsPageImages.objects.all()
    print(len(images), "Images length")
    print("WEB Image", web_obj)
    print(f"MOBI: {is_mobile}")
     # Add a flag for mobile ad placement
        

    ad_positions = set(random.sample(range(min(10, len(jobs))), 3))  # Pick 3 unique positions
    ad_sections = [sec1, sec2, sec3]  # List of available ad sections
    print("Boy scott",ad_positions, ad_sections)
    slider_counter = 6
    for i, job in enumerate(jobs):
        job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]

        # Show ad only if in the selected positions
        job.show_ad = is_mobile and i in ad_positions

        if job.show_ad:
            section_index = (i // 3) % len(ad_sections)  # Cycles through [0, 1, 2]
            job.ad_section = ad_sections[section_index]  
            job.slider_class = f"{slider_counter}"
            slider_counter+=1
            
        # Assign an ad section only if the job has an ad and within section range
        # if job.show_ad and len(ad_sections) > len(ad_positions):  
        #     job.ad_section = ad_sections.pop(0)  # Pick the first available section
        # elif job.show_ad:
        #     job.ad_section = ad_sections[i % len(ad_sections)]  # Cycle through sections if needed

    context = {
        'jobs': jobs, 
        'sec1': sec1,
        'sec2': sec2,
        'sec3': sec3,
        'web_obj':web_obj,
        'images':images,
        'is_mobile': is_mobile,
    } 
    return render(request, 'non_register/jobs.html', context)

def aboutus(request):
    return render(request, 'non_register/aboutus.html')

def industries(request):
    return render(request, 'non_register/industries.html')

def findajob(request):
    return render(request, 'non_register/findajob.html')

def postajob(request):
    return render(request, 'non_register/postajob.html')

def signup(request):
    return render(request, 'non_register/signup.html')


def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Fetch user from both tables
        freelancer = Freelancer.objects.filter(email=email).first()
        client = Client.objects.filter(email=email).first()

        if freelancer and check_password(password, freelancer.password):
            request.session['user_id'] = freelancer.userId
            request.session['user_role'] = 'freelancer'
            return redirect('fl_index')  # Redirect to freelancer dashboard

        elif client and check_password(password, client.password):
            request.session['user_id'] = client.userId
            request.session['user_role'] = 'client'
            print(client.userId, client.user_role)
            return redirect('cl_index')  # Redirect to client dashboard

        else:
            messages.error(request, 'Invalid credentials')

    return render(request, 'non_register/login.html')


def test(request):
    jobs = ProjectsDisplay.objects.all()
    for job in jobs:
        job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]
    context = {'jobs': jobs}
    return render(request, 'non_register/test.html', context)


def submit_contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        phone_number = request.POST.get('phone_number')
        email = request.POST.get('email')
        reason = request.POST.get('reason')
        description = request.POST.get('description')

        # Check if all fields are filled
        if not all([name, phone_number, email, reason, description]):
            messages.error(request, "Please fill out all fields!")
            return redirect(request.META.get('HTTP_REFERER', 'contact'))  # Redirect to the same page

        # Create and save the contact object
        Contact.objects.create(
            name=name,
            phone_number=phone_number,
            email=email,
            reason=reason,
            description=description
        )

        messages.success(request, "Your form has been submitted successfully!")
        return redirect('index')  # Redirect to home page

    messages.error(request, "Invalid request!")
    return redirect(request.META.get('HTTP_REFERER', 'contact'))


# Freelancer form
def submit_freelancer(request):
    if request.method == "POST":
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        designation = request.POST.get("designation")
        otherdesignation=request.POST.get("otherdesignation")
        education = request.POST.get("education")
        certifications = request.POST.get("certifications")
        experience = request.POST.get("experience")
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        social_media = request.POST.get("social_media")
        print("Certificates", certifications)
    

        # Assign the non-empty value
        designation = otherdesignation if otherdesignation else designation
        
        # Collect skills and experiences
        skills = {}
        for i in range(1, 4):  # Adjust range if you have more skill fields
            print("Top Counter", i)
            skill = request.POST.get(f"skill{i}")
            exp = request.POST.get(f"experience{i}")
            print(f"skill {skill}, exp:{exp}")
            if skill and exp:
                skills[skill] = float(exp)  # Convert experience to float
                
        # Check if certifications contain a comma
        if "," in certifications:
            print("I am inside ,")
            # Split by comma and remove any empty strings after stripping whitespace
            certificate_list = [cert.strip() for cert in certifications.split(",") if cert.strip()]
            print(certificate_list, "LIST")
            # If any empty certificate is found (e.g., "AWS Certified, , Google Cloud"), raise an error
            if not certificate_list:
                messages.error(request, "Please provide valid certificate names separated by commas.")
                return render(request, "non_register/findajob.html")
        else:
            print("I am outside the ,")
            # No comma present, treat the entire string as one certificate
            certificate_list = [certifications.strip()]
            print(certificate_list, "Outside list")

  
        # Save Freelancer object
        if password1 == password2:
            if Freelancer.objects.filter(email=email).exists():
                messages.info(request, "Email already exists")
                return render(request, "non_register/findajob.html")
            elif Freelancer.objects.filter(phone=phone).exists():
                messages.info(request, "Phone number already exists")
                return render(request, "non_register/findajob.html")
            else:
                freelancer = Freelancer(
                    name=name,
                    phone=phone,
                    email=email,
                    designation=designation,
                    education=education,
                    certifications=certifications,
                    experience=experience,
                    skills=skills,
                    social_media=social_media,
                    password=password1,
                    profilePic = "https://d32216yx1hwrs8.cloudfront.net/freelancers/profile_sample.jpeg"
                )
                freelancer.save()
                for i in range(1,4):
                    print("Counter", i)
                    skill = request.POST.get(f"skill{i}")
                    exp = request.POST.get(f"experience{i}")
                    print(f"skill {skill}, exp:{exp}")
                    if skill and exp:
                        Skill.objects.create(freelancer=freelancer, skill_name=skill, experience_years=exp)

                # Save certificates to the Certificate model
                for cert_name in certificate_list:
                    Certificate.objects.create(
                        freelancer=freelancer,
                        certificate_name=cert_name,
                        issue_date=None,            
                        expiry_date=None,           # Leave expiry_date as None
                        certification_id=None,      # Leave certification_id as None
                        certification_url=None      # Leave certification_url as None
                    )
                    print(cert_name, "Name")
                return render(request, "non_register/login.html")  # Redirect to success page
        else:
            messages.info(request, "Password does not match")
            return render(request, "non_register/findajob.html")

        
    return render(request, "non_register/findajob.html")


def submit_client(request):
    if request.method == "POST":
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        selected_company = request.POST.get("selected_company")
        other_company = request.POST.get("other_company")
        designation = request.POST.get("designation")
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        social_media = request.POST.get("social_media")

        # Assign the non-empty value
        company = other_company if other_company else selected_company

        # Save Freelancer object
        if password1 == password2:
            if Client.objects.filter(email=email).exists():
                messages.info(request, "Email already exists")
                return render(request, "non_register/postajob.html")
            elif Client.objects.filter(phone=phone).exists():
                messages.info(request, "Phone number already exists")
                return render(request, "non_register/postajob.html")
            else:
                client = Client(
                    name=name,
                    phone=phone,
                    email=email,
                    company=company,
                    designation=designation,
                    social_media=social_media,
                    password=password1,
                    profilePic = "https://d32216yx1hwrs8.cloudfront.net/clients/profile_sample.jpeg"
                )
                client.save()
                return render(request, "non_register/login.html")
        else:
            messages.info(request, "Password does not match")
            return render(request, "non_register/postajob.html")
    return render(request, "non_register/postajob.html")



def extract_digits(phone_number):
    """Extracts only the numeric part of the phone number."""
    return re.sub(r"\D", "", phone_number)  # Removes non-numeric characters

def forgot(request):
    if request.method == "POST":
        input_phone = request.POST.get("phone", "").strip()  # Ensure input is valid
        user_role = request.POST.get("user_role", "").strip().lower()  # Get user role
        input_digits = extract_digits(input_phone)  # Remove non-numeric characters
        print("input digits", input_digits)

        if not input_digits:
            messages.error(request, "Please enter a valid mobile number.")
            print(messages.get_level(request))
            return render(request, "non_register/forgot.html", {"show_otp_frame": False})

        # Determine which model to search based on user role
        if user_role == "freelancer":
            users = Freelancer.objects.all()
        elif user_role == "client":
            users = Client.objects.all()
        else:
            messages.error(request, "Please select a valid role.")
            return render(request, "non_register/forgot.html", {"show_otp_frame": False})

        # Check if phone number exists in the selected model
        for user in users:
            db_phone_digits = extract_digits(user.phone)  # Extract numeric part of stored phone
            print(f"db_phone_digits {db_phone_digits}")

            if db_phone_digits==input_digits:  
                request.session['user_role'] = user_role
                request.session['user_phone'] = db_phone_digits
                request.session['user_id'] = user.userId
                print(f"My role is {user_role} and id is {user.userId}")

                # sending OTP
                otp = random.randint(100000, 999999)
                cache.set(input_digits, otp, timeout=300)  # Store OTP for 5 minutes
                response = send_sms(input_digits, otp)
                print(messages.get_level(request), response)
                return render(request, "non_register/forgot.html", {"show_otp_frame": True})

        messages.error(request, "The entered mobile number is either not registered or country code not matched.")
        print(messages.get_level(request))
        return render(request, "non_register/forgot.html", {"show_otp_frame": False})

    return render(request, "non_register/forgot.html", {"show_otp_frame": False})





def validate_otp(phone_number, otp):
    """Ensure OTP is a 6-digit number and verify it against the stored OTP."""
    if not otp.isdigit() or len(otp) != 6:
        raise ValidationError("Invalid OTP. Must be a 6-digit number.")
    
    stored_otp = cache.get(phone_number)
    if not stored_otp or str(stored_otp) != otp:
        raise ValidationError("Invalid OTP. Please try again.")


def validate_password(password, confirm_password):
    """Ensure passwords match."""
    if password != confirm_password:
        raise ValidationError("Passwords do not match.")

def test_resetpass(request):
    user_role = request.session.get('user_role')  # Get user role from session
    user_id = request.session.get('user_id')  # Get user ID from session
    phone_number = request.session.get('user_phone')

    if not user_role or not user_id:
        messages.error(request, "No user information found.")
        return redirect('forgot')  # Redirect to forgot password page if no user info in session

    if request.method == "POST":
        user_otp = request.POST.get("otp")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        try:
            validate_otp(phone_number,user_otp)  # Validate OTP (6-digit number)
            validate_password(password, confirm_password)  # Validate password match

            # Fetch the user based on userId and userRole
            if user_role == "freelancer":
                user = Freelancer.objects.filter(userId=user_id).first()
                if user:
                    print(f"My role is {user_role} and id is {user.userId}")
                    user.password = make_password(password)    # Update password
                    user.save()
                    messages.success(request, "Password reset successfully for Freelancer.")
                    return redirect('login')
                else:
                    messages.error(request, "Freelancer not found.")
            elif user_role == "client":
                user = Client.objects.filter(userId=user_id).first()
                if user:
                    print(f"My role is {user_role} and id is {user.userId}")
                    user.password = make_password(password)    # Update password
                    user.save()
                    messages.success(request, "Password reset successfully for Client.")
                    return redirect('login')
                else:
                    messages.error(request, "Client not found.")
            else:
                messages.error(request, "Invalid user role.")

        except ValidationError as e:
            print(messages.get_level(request))
            messages.error(request, e.message)
            return redirect('test_resetpass')

    return render(request, "non_register/login.html", {"user_role": user_role})


def send_otp(request):
    phone_number = request.GET.get("phone")
    print(phone_number,"I am getting number as ")
    
    if phone_number:
        otp = random.randint(100000, 999999)
        cache.set(phone_number, otp, timeout=300)  # Store OTP for 5 minutes
        response = send_sms(phone_number, otp)
        return JsonResponse({"message": "OTP Sent", "response": response})
    else:
        return JsonResponse({"error": "Phone number required"}, status=400)


def verify_otp(request):
    phone_number = request.GET.get("phone")
    user_otp = request.GET.get("otp")

    stored_otp = cache.get(phone_number)

    if stored_otp and str(stored_otp) == user_otp:
        print("Verified by OTP")
        return JsonResponse({"message": "OTP Verified"})
    else:
        return JsonResponse({"error": "Invalid OTP"}, status=400)
