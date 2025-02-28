from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib.auth.hashers import check_password, make_password
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from django.contrib import messages
import json
import re
from django.utils.timezone import now
from db_schemas.models import Contact, JobsPageImages, WebAnnouncement, JobsPageAdv, Client, ProjectsDisplay, Freelancer, Skill, Certificate
# from .forms import ContactForm

def index(request):
    jobs = ProjectsDisplay.objects.all().order_by('-created_at')[0:3]
    for job in jobs:
        job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]
    context = {'jobs': jobs}
    return render(request, 'non_register/index.html', context)

def jobs(request):
    jobs = ProjectsDisplay.objects.all().order_by('-created_at')
    for job in jobs:
        job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]

    sec1 = JobsPageAdv.objects.filter(section_name="sec_1").all()
    sec2 = JobsPageAdv.objects.filter(section_name="sec_2").all()
    sec3 = JobsPageAdv.objects.filter(section_name="sec_3").all()
    web_obj = WebAnnouncement.objects.all().order_by('-created_at').first()
    images = JobsPageImages.objects.all()
    print(len(images), "Images length")
    print("WEB Image", web_obj)
    context = {
        'jobs': jobs, 
        'sec1': sec1,
        'sec2': sec2,
        'sec3': sec3,
        'web_obj':web_obj,
        'images':images,
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


def forgot(request):
    return render(request, 'non_register/forgot.html')

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
                    profilePic = "https://eswar-s3-bkt.s3.ap-south-1.amazonaws.com/freelancers/profile_sample.jpeg"
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
                    profilePic = "https://eswar-s3-bkt.s3.ap-south-1.amazonaws.com/clients/default_profile.png"
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

            if db_phone_digits.endswith(input_digits[-10:]):  # Compare last 10 digits
                request.session['user_role'] = user_role
                request.session['user_id'] = user.userId
                print(f"My role is {user_role} and id is {user.userId}")
                print(messages.get_level(request))
                return render(request, "non_register/forgot.html", {"show_otp_frame": True})

        messages.error(request, "The entered mobile number is not registered.")
        print(messages.get_level(request))
        return render(request, "non_register/forgot.html", {"show_otp_frame": False})

    return render(request, "non_register/forgot.html", {"show_otp_frame": False})





def validate_otp(otp):
    """Ensure OTP is a 6-digit number."""
    if not otp.isdigit() or len(otp) != 6:
        raise ValidationError("Invalid OTP")

def validate_password(password, confirm_password):
    """Ensure passwords match."""
    if password != confirm_password:
        raise ValidationError("Passwords do not match.")

def test_resetpass(request):
    user_role = request.session.get('user_role')  # Get user role from session
    user_id = request.session.get('user_id')  # Get user ID from session

    if not user_role or not user_id:
        messages.error(request, "No user information found.")
        return redirect('forgot')  # Redirect to forgot password page if no user info in session

    if request.method == "POST":
        otp = request.POST.get("otp")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        try:
            validate_otp(otp)  # Validate OTP (6-digit number)
            validate_password(password, confirm_password)  # Validate password match

            # Fetch the user based on userId and userRole
            if user_role == "freelancer":
                user = Freelancer.objects.filter(userId=user_id).first()
                if user:
                    print(f"My role is {user_role} and id is {user.userId}")
                    user.password = make_password(password)    # Update password
                    user.save()
                    messages.success(request, "Password reset successfully for Freelancer.")
                else:
                    messages.error(request, "Freelancer not found.")
            elif user_role == "client":
                user = Client.objects.filter(userId=user_id).first()
                if user:
                    print(f"My role is {user_role} and id is {user.userId}")
                    user.password = make_password(password)    # Update password
                    user.save()
                    messages.success(request, "Password reset successfully for Client.")
                else:
                    messages.error(request, "Client not found.")
            else:
                messages.error(request, "Invalid user role.")

        except ValidationError as e:
            print(messages.get_level(request))
            messages.error(request, e.message)

        return render(request, "non_register/login.html", {"user_role": user_role})

    return render(request, "non_register/login.html", {"user_role": user_role})

