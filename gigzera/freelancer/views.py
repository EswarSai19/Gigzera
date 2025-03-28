from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, auth
from django.contrib.auth.hashers import check_password, make_password
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
import json
import os
import time
import locale
import re
import random
import boto3
from django.utils import timezone
from urllib.parse import urlparse
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from db_schemas.models import Contact, ProjectQuote, PartnerLogos, JobsPageImages, WebAnnouncement, JobsPageAdv, Tasks, Freelancer, OngoingProjects, EmploymentHistory, Certificate, Skill, ProjectsDisplay  # Create a model for storing quotes
from django.core.exceptions import ValidationError
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt




# from django.contrib.auth.decorators import login_required

# To get initial of the username
def get_initials(name):
    # Split the name into parts
    name_parts = name.strip().split()
    
    # Extract the first letter from each part and capitalize it
    initials = ''.join(part[0].upper() for part in name_parts)
    
    return initials

currency_symbols = {
    "USD": "$", "EUR": "€", "JPY": "¥", "GBP": "£", "CNY": "¥", 
    "AUD": "A$", "CAD": "C$", "CHF": "CHF", "INR": "₹", "NZD": "NZ$"
}

def get_currency_symbol(currency_code):
    return currency_symbols.get(currency_code, "-")

currency_locales = {
    "USD": "en_US.UTF-8", "EUR": "de_DE.UTF-8", "JPY": "ja_JP.UTF-8",
    "GBP": "en_GB.UTF-8", "CNY": "zh_CN.UTF-8", "AUD": "en_AU.UTF-8",
    "CAD": "en_CA.UTF-8", "CHF": "de_CH.UTF-8", "INR": "en_IN.UTF-8",
    "NZD": "en_NZ.UTF-8"
}

def clean_number(value, currency_code):
    """Cleans and converts different numeric formats based on currency rules."""
    if isinstance(value, (int, float)):  
        return value  # Already a number

    value = str(value).replace("'", "").replace(" ", "")  # Remove spaces and apostrophes

    if currency_code in ["EUR", "CHF"]:
        value = value.replace(".", "").replace(",", ".")  # Convert '2.000' → '2000' and '2,50' → '2.50'
    else:
        value = value.replace(",", "")  # Convert '2,000' → '2000'

    try:
        return float(value) if '.' in value else int(value)  
    except ValueError:
        raise ValueError(f"Invalid number format: {value}")

# def format_currency(amount, currency_code):
#     """Formats the number according to the given currency locale."""
#     try:
#         locale_code = currency_locales.get(currency_code, "en_US.UTF-8")
#         try:
#             locale.setlocale(locale.LC_ALL, locale_code)
#         except locale.Error:
#             print(f"Warning: Locale '{locale_code}' not found. Using default.")

#         amount = clean_number(amount, currency_code)  # Clean number before conversion

#         if amount.is_integer():
#             formatted_amount = locale.format_string("%d", int(amount), grouping=True)
#         else:
#             formatted_amount = locale.format_string("%.2f", amount, grouping=True)

#         # ✅ **Force decimal separator to be '.' (dot) instead of ',' (comma)**
#         if currency_code in ["EUR", "CHF"]:
#             formatted_amount = formatted_amount.replace(",", ".")

#         return formatted_amount
#     except ValueError:
#         return "Invalid amount"


def format_currency(amount, currency_code):
    """Formats the number according to the given currency locale."""
    try:
        locale_code = currency_locales.get(currency_code, "en_US.UTF-8")
        try:
            locale.setlocale(locale.LC_ALL, locale_code)
        except locale.Error:
            print(f"Warning: Locale '{locale_code}' not found. Using default.")

        amount = clean_number(amount, currency_code)

        if isinstance(amount, int):
            formatted_amount = locale.format_string("%d", amount, grouping=True)
        else:
            formatted_amount = locale.format_string("%.2f", amount, grouping=True)

        return formatted_amount
    except ValueError:
        return "Invalid amount"


# print(format_currency("200000", "USD"))  # Output: 2,000.00
# print(format_currency("2000", "INR"))  # Output: 2,000.00

def calculate_percentage(amount_str, percentage, currency_code):
    """Calculates a percentage of the given amount and formats it."""
    print(f" I am getting the amount {amount_str} {percentage} {currency_code}")
    numeric_part = amount_str.replace(",", "").strip()  # Extract numeric value

    try:
        amount = float(str(numeric_part))
        percentage_value = amount * (percentage / 100)  # Calculate percentage
        return format_currency(percentage_value, currency_code)  # Format result
    except ValueError:
        return "Invalid amount"



# Normal functions start

def index(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    # print(user.name, "Name")
    jobs = ProjectsDisplay.objects.all().order_by('-created_at')[0:3]
    for job in jobs:
        job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]
        job.cur_symbol = get_currency_symbol(job.currency)
        
    user.initials = get_initials(user.name)
    print(user.initials)
    logos = PartnerLogos.objects.all()
    context = {'jobs': jobs, 'user': user, 'logos':logos}
    return render(request, 'freelancer/index.html', context)




def jobs(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
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
        job.cur_symbol = get_currency_symbol(job.currency)

        # Show ad only if in the selected positions
        job.show_ad = is_mobile and i in ad_positions

        if job.show_ad:
            section_index = (i // 3) % len(ad_sections)  # Cycles through [0, 1, 2]
            job.ad_section = ad_sections[section_index]  
            job.slider_class = f"{slider_counter}"
            slider_counter+=1

    context = {
        'jobs': jobs, 
        'user': user,
        'sec1': sec1,
        'sec2': sec2,
        'sec3': sec3,
        'web_obj':web_obj,
        'images':images,
        'is_mobile': is_mobile,
    }    
    return render(request, 'freelancer/jobs.html', context)

def aboutus(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    context = {'user': user}
    return render(request, 'freelancer/aboutus.html', context)

def industries(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    context = {'user': user}
    return render(request, 'freelancer/industries.html', context)

def profile(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing

    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    employment_history = EmploymentHistory.objects.filter(freelancer_id=user_id).order_by('-start_date')
    certificates = Certificate.objects.filter(freelancer_id=user_id).order_by('-issue_date')
    skills = Skill.objects.filter(freelancer_id=user_id).order_by('-updated_at')

    context = {
        'user': user,
        'employment_history': employment_history,  # Corrected the assignment
        'certificates': certificates,
        'skills':skills
    }
    return render(request, 'freelancer/profile.html', context)

def test(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing

    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    employment_history = EmploymentHistory.objects.filter(freelancer_id=user_id).order_by('-start_date')
    certificates = Certificate.objects.filter(freelancer_id=user_id).order_by('-issue_date')
    skills = Skill.objects.filter(freelancer_id=user_id).order_by('-updated_at')

    context = {
        'user': user,
        'employment_history': employment_history,  # Corrected the assignment
        'certificates': certificates,
        'skills':skills
    }
    return render(request, 'freelancer/test.html', context)


# Profile summary editing
def edit_profile_summary(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    
    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)

    if request.method == 'POST':
        profile_summary = request.POST.get('profile_summary')
        print(f"Received Summary: {profile_summary}")  # Debugging
        
        if profile_summary:
            freelancer.profile_summary = profile_summary
            freelancer.save()
            print(f"Updated Summary: {freelancer.profile_summary}")
        else:
            print("No summary received in POST request.")

        return redirect('fl_profile')

    return render(request, 'freelancer/profile.html', {'user': freelancer})

# Work history related
def add_work_history(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)

    if request.method == 'POST':
        # Retrieve form data
        company = request.POST.get('company')
        job_title = request.POST.get('job_title')
        description = request.POST.get('description')
        city = request.POST.get('city')
        country = request.POST.get('country')
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')

        # Checkbox handling
        currently_working = request.POST.get('currently_working') == 'on'

        print("Here are the details\n", company, job_title, description, city, country, start_date, end_date, currently_working)

        # Validation (end_date is optional if currently working)
        if not all([company, job_title, description, city, country, start_date]):
            messages.error(request, "Please fill out all required fields!")
            return redirect('fl_profile')

        if not currently_working and not end_date:
            messages.error(request, "Please provide an end date if you're not currently working.")
            return redirect('fl_profile')

        end_date = end_date if not currently_working else None  # Clear end date if currently working

        EmploymentHistory.objects.create(
            company = company,
            job_title = job_title,
            description = description,
            city = city,
            country = country,
            start_date = start_date,
            end_date = end_date,
            currently_working = currently_working,
            freelancer_id=user_id
        )

        # Redirect or show success message
        messages.success(request, "Work history updated successfully!")
        return redirect('fl_profile')

    return render(request, 'freelancer/profile.html', {'user': freelancer})

def edit_job(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)
    job_id = request.POST.get('job_id')
    job = get_object_or_404(EmploymentHistory, id=job_id)
    if request.method == 'POST':
        job_id = request.POST.get('job_id')
        company = request.POST.get('company')
        city = request.POST.get('city')
        country = request.POST.get('country')
        job_title = request.POST.get('job_title')
        description = request.POST.get('description')
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        currently_working = request.POST.get('currently_working') == 'on'

        # Handle end_date if currently_working is True
        if currently_working:
            end_date = None

        try:
            # Validate start_date
            start_date_obj = datetime.strptime(start_date, '%Y-%m-%d')

            # Validate end_date only if it's provided
            end_date_obj = None
            if end_date:
                end_date_obj = datetime.strptime(end_date, '%Y-%m-%d')

            # Update the job in the database (pseudo-code)
            job.company = company
            job.city = city
            job.country = country
            job.job_title = job_title
            job.description = description
            job.start_date = start_date_obj
            job.end_date = end_date_obj
            job.currently_working = currently_working
            job.save()
            messages.success(request, "Work history details edited successfully!")
            return redirect('fl_profile')  # Redirect back to dashboard after saving
        except ValueError as e:
            message.error(request, ValidationError(f"Invalid date format: {e}"))
            return redirect('fl_profile')

    return render('freelancer/profile.html', {'user':freelancer})  # Redirect to an error page if not POST

def delete_job(request, job_id):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)
    print("I am inside delete job", job_id)
    if request.method == 'POST':
        job = get_object_or_404(EmploymentHistory, id=job_id)
        job.delete()
        return redirect('fl_profile')  # Replace with your dashboard or relevant page name
    return render(request, 'freelancer/profile.html', {'user': freelancer})


# certificates related
def add_certification(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)

    if request.method == 'POST':
        # Retrieve form data
        cert_name = request.POST.get('cert_name')
        issue_date = request.POST.get('issue_date')
        expiry_date = request.POST.get('expiry_date')
        cert_id = request.POST.get('cert_id')
        cert_url = request.POST.get('cert_url')

        try:
            issue_date = datetime.strptime(issue_date, "%Y-%m-%d").date() if issue_date else None
            expiry_date = datetime.strptime(expiry_date, "%Y-%m-%d").date() if expiry_date else None
        except ValueError:
            messages.error(request, "Invalid date format! Please select a valid date.")
            return redirect('fl_profile')

        cert_file = request.FILES.get('cert_file')
        if cert_file:
            image_url = upload_to_s3("freelancers_certificates", cert_file)
        else:
            image_url="None"

        print("Here are the details\n", cert_name, issue_date, expiry_date, cert_id, cert_url)

        # Validation (end_date is optional if currently working)
        if not all([cert_name, issue_date]):
            messages.error(request, "Please fill out all required fields!")
            return redirect('fl_profile')

        Certificate.objects.create(
            certificate_name = cert_name,
            issue_date = issue_date,
            expiry_date = expiry_date,
            certification_id = cert_id,
            certification_url = cert_url,
            freelancer_id=user_id,
            certificate_img = image_url

        )

        current_certifications = freelancer.certifications
        certificates_list = current_certifications.split(',') if current_certifications else []

        # Append the new certificate name (strip extra spaces)
        certificates_list.append(cert_name.strip())

        # Update the freelancer's certifications with the new list
        freelancer.certifications = ','.join(certificates_list)
        freelancer.save()

        # Redirect or show success message
        messages.success(request, "Certification added successfully!")
        return redirect('fl_profile')

    return render(request, 'freelancer/profile.html', {'user': freelancer})

def edit_cert(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)
    cert_id = request.POST.get('cert_id')
    job = get_object_or_404(Certificate, id=cert_id)
    current_url = str(job.certificate_img)
    if request.method == 'POST':
        cert_id = request.POST.get('cert_id')
        cert_name = request.POST.get('cert_name')
        issue_date = request.POST.get('issue_date')
        expiry_date = request.POST.get('expiry_date')
        certification_id = request.POST.get('certification_id')
        cert_url = request.POST.get('cert_url')

        try:
            # Validate issue_date
            issue_date_obj = datetime.strptime(issue_date, '%Y-%m-%d')

            # Validate end_date only if it's provided
            expiry_date_obj = None
            if expiry_date:
                expiry_date_obj = datetime.strptime(expiry_date, '%Y-%m-%d')

            cert_file = request.FILES.get('cert_file')
            if cert_file:
                image_url = upload_to_s3("freelancers_certificates", cert_file)
                if current_url:
                    delete_if_uploaded(current_url)
                job.certificate_img = image_url
            else:
                image_url="None"

            # Update the job in the database (pseudo-code)
            job.certificate_name = cert_name
            job.issue_date = issue_date
            job.expiry_date = expiry_date
            job.certification_id = certification_id
            job.certification_url = cert_url
            job.freelancer_id = user_id

            job.save()
            messages.success(request, "Certication details edited successfully!")
            return redirect('fl_profile')  # Redirect back to dashboard after saving
        except ValueError as e:
            message.error(request, ValidationError(f"Invalid date format: {e}"))
            return redirect('fl_profile')

    return render('freelancer/profile.html', {'user':freelancer}) 

def delete_cert(request, cert_id):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing

    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)
    print("I am inside delete job", cert_id)

    if request.method == 'POST':
        # Get the certificate to be deleted
        job = get_object_or_404(Certificate, id=cert_id)

        # Get the existing certificates (comma-separated) for the freelancer
        current_certificates = freelancer.certifications
        certificates_list = current_certificates.split(',') if current_certificates else []
        print(certificates_list, "List")
        print(job.certificate_name, "cert name")

        # Remove the deleted certificate from the list
        certificates_list = [cert.strip() for cert in certificates_list]
        if job.certificate_name.strip() in certificates_list:
            certificates_list.remove(job.certificate_name.strip())

        print(certificates_list, "After removing from list of cert table")

        # Update the certificates field in the freelancer record
        freelancer.certifications = ','.join(certificates_list)
        freelancer.save()

        # Delete the certificate
        job.delete()

        return redirect('fl_profile')  # Replace with your dashboard or relevant page name

    return render(request, 'freelancer/profile.html', {'user': freelancer})


# Skills related

def delete_skill(request, skill_id):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing

    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)
    print("Inside delete skill", skill_id)

    if request.method == 'POST':
        # Get the skill to be deleted
        skill = get_object_or_404(Skill, id=skill_id, freelancer=freelancer)

        # Check if skills is a string or dict before loading
        if isinstance(freelancer.skills, str):
            current_skills = json.loads(freelancer.skills) if freelancer.skills else {}
        elif isinstance(freelancer.skills, dict):
            current_skills = freelancer.skills
        else:
            current_skills = {}

        print("Current skills:", current_skills)

        # Remove the skill from the JSON field
        skill_name = skill.skill_name
        if skill_name in current_skills:
            del current_skills[skill_name]
            print(f"Removed {skill_name} from freelancer's skills")

        # Convert dictionary back to JSON string and update the Freelancer's skills field
        freelancer.skills = current_skills
        freelancer.save()

        # Delete the skill from the Skill table
        skill.delete()

        return redirect('fl_profile')  # Redirect to your dashboard or relevant page

    return render(request, 'freelancer/profile.html', {'user': freelancer})

def add_skill(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    freelancer = get_object_or_404(Freelancer, userId=user_id)
    freelancer.initials = get_initials(freelancer.name)

    if request.method == 'POST':
        # Retrieve form data
        new_skill = request.POST.get('new_skill')
        new_exp = request.POST.get('new_exp')


        print("Here are the details\n", new_skill, new_exp)

        # Validation (end_date is optional if currently working)
        if not all([new_skill, new_exp]):
            messages.error(request, "Please fill out all required fields!")
            return redirect('fl_profile')

        Skill.objects.create(
            skill_name = new_skill,
            experience_years = new_exp,
            freelancer_id=user_id
        )

        # Check if skills is a string or dict before loading
        if isinstance(freelancer.skills, str):
            current_skills = json.loads(freelancer.skills) if freelancer.skills else {}
        elif isinstance(freelancer.skills, dict):
            current_skills = freelancer.skills
        else:
            current_skills = {}

        print("Current skills:", current_skills)
        current_skills[new_skill] = new_exp

        freelancer.skills = current_skills
        freelancer.save()

        # Redirect or show success message
        messages.success(request, "New skill added successfully!")
        return redirect('fl_profile')

    return render(request, 'freelancer/profile.html', {'user': freelancer})



# Freelancer changes
def edit_freelancer(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    freelancer = get_object_or_404(Freelancer, userId=user_id)
    current_img_url = str(freelancer.profilePic)

    # Check if the request method is POST
    if request.method == 'POST':
        # Retrieve the data from the request
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        designation = request.POST.get('designation')
        social_media = request.POST.get('social_media')
        # experience = request.POST.get('experience')

        # Handle file upload for profilePic
        profile_pic = request.FILES.get('profilePic')

        if profile_pic:
            response = delete_if_uploaded(current_img_url)
            print("Response", response)
            image_url = upload_to_s3("freelancers", profile_pic)
            freelancer.profilePic = image_url

        # Update the freelancer instance
        freelancer.name = name
        freelancer.phone = phone
        freelancer.email = email
        freelancer.designation = designation
        freelancer.social_media = social_media

        # Save the updated freelancer object
        freelancer.save()

        # Redirect to a new page or display a success message
        return redirect('fl_profile')

    return render(request, 'freelancer/profile.html', {'user': freelancer})


def upload_to_s3(folder_name, image):
    """
    Uploads an image to the specified S3 folder and returns the image URL.
    Handles duplicate file names by appending a timestamp.
    """
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
    )

    # Get the file extension
    file_extension = os.path.splitext(image.name)[1]
    base_filename = os.path.splitext(image.name)[0]

    # Generate a unique file name to avoid duplicates
    timestamp = int(time.time())  # Current Unix timestamp
    unique_filename = f"{base_filename}_{timestamp}{file_extension}"

    # Full path in S3
    file_path = f"{folder_name}/{unique_filename}"

    # Upload image to S3
    s3_client.upload_fileobj(
        image,
        settings.AWS_STORAGE_BUCKET_NAME,
        file_path,
        ExtraArgs={'ContentType': image.content_type}
    )

    # Generate the S3 image URL
    image_url = f"https://{settings.AWS_S3_CUSTOM_DOMAIN}/{file_path}"
    print(f"I just completed the upload image process with url: {image_url}")
    return image_url


def delete_if_uploaded(url):
    """
    Deletes the file from S3 only if the filename contains a 10-digit number.
    :param url: The full S3 file URL.
    :return: A response message indicating success or failure.
    """
    print("I am inside the delete:", url)

    # Extract the file path from the URL
    parsed_url = urlparse(url)
    file_path = parsed_url.path.lstrip('/')  # Remove leading '/'
    
    # Extract the filename from the path
    filename = str(file_path.split('/')[-1]).strip()  # Ensure it's a clean string
    print("Deleted file name:", repr(filename))  # Debugging print

    # Check if the filename contains a 10-digit number
    match = re.search(r'\d{10}', filename)
    print("Regex Match:", match.group() if match else "No Match")  # Debugging print

    if match:  
        s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME
        )

        try:
            # Delete the file from S3
            s3_client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_path)
            print(f"Successfully deleted {file_path}")
            return {"success": True, "message": f"File '{file_path}' deleted successfully"}
        except Exception as e:
            print(f"Error during S3 deletion: {str(e)}")  # Debugging print
            return {"success": False, "message": str(e)}

    print("File name does not contain a 10-digit number, skipping deletion.")
    return {"success": False, "message": "File name does not contain a 10-digit number, deletion skipped"}




def delete_profile_pic(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    freelancer = get_object_or_404(Freelancer, userId=user_id)

    if freelancer.profilePic:
        # Construct the full path to the profile picture
        profile_pic_path = os.path.join(settings.MEDIA_ROOT, freelancer.profilePic.name)

        # Check if file exists and delete it
        if os.path.isfile(profile_pic_path):
            os.remove(profile_pic_path)
            print(f"Deleted file: {profile_pic_path}")
        else:
            print("File not found on disk:", profile_pic_path)

        # Clear the profilePic field in the database
        freelancer.profilePic = "freelancer/profile_pics/default_profile.png"
        freelancer.save()
        return redirect('fl_profile')

    return render(request, 'freelancer/profile.html', {'user': freelancer})

# @login_required
def submit_quote(request):
    if request.method == "POST":
        print(request.POST)
        opportunityId = request.POST.get("opportunity_id")
        budget = request.POST.get("budget")
        comments = request.POST.get("comments")
        time_estimation = request.POST.get("time_estimation")
        time_estimation = format_time_estimation(time_estimation)
        freelancer_id = request.session.get('user_id')  # Ensure it's stored in session
        if not freelancer_id:
            messages.error(request, "Freelancer session expired. Please log in again.")
            return redirect("login")
        if not opportunityId:
            messages.error(request, "opportunityId session expired.")
            return redirect("fl_jobs")

        # Validate Inputs
        if not opportunityId or not budget or not time_estimation or not comments:
            messages.error(request, "All fields are required.")
            return redirect("fl_jobs")

        # Fetch Freelancer Object
        try:
            freelancer = Freelancer.objects.get(userId=freelancer_id)
            job = ProjectsDisplay.objects.filter(opportunityId=opportunityId).first()
        except Freelancer.DoesNotExist:
            messages.error(request, "Freelancer not found.")
            return redirect("fl_jobs")

        # Debugging prints
        print(f"User ID from session: {freelancer_id}")
        print(f"Saving quote for {opportunityId} by {freelancer}")
        # formated_budget = format_currency(budget, job.currency)
        # admin_margin = calculate_percentage(budget, 30, job.currency)
        admin_margin = 0.30 * int(budget)
        admin_margin = str(admin_margin)
        print(f"Budget: {job.currency}")
        # Store in DB
        ProjectQuote.objects.create(
            freelancer_id=freelancer.userId,  # Use ForeignKey if applicable
            opportunityId=opportunityId,
            currency=job.currency,
            budget=budget,
            admin_margin=admin_margin,
            time_estimation=time_estimation,
            comments=comments,
            client_id=job.client_id,
        )

        messages.success(request, "Quote submitted successfully!")
        return redirect("fl_jobs")

    return redirect("fl_jobs")


def format_time_estimation(time_estimation):
    time_estimation = time_estimation.strip()
    
    # If only digits are given, assume months
    if time_estimation.isdigit():
        return f"{time_estimation} month" if time_estimation == "1" else f"{time_estimation} months"
    
    return time_estimation

# Example test cases
# examples = ["5", "1", "5 days", "3 weeks", "1 month", "7 mnts"]
# for example in examples:
#     print(format_time_estimation(example))


def jobs_test(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    jobs = ProjectsDisplay.objects.all().order_by('-created_at')
    for job in jobs:
        job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]
    context = {'jobs': jobs, 'user': user}    
    return render(request, 'freelancer/jobs_test.html', context)
    

def logout(request):
    request.session.flush()  # ✅ Clears all session data (logs user out)
    return redirect('login')


def load_job_details(request):
    job_id = request.POST.get("job_id")  # Get job ID from HTMX request
    job = get_object_or_404(ProjectsDisplay, opportunityId=job_id)
    # Process skills into a list for the selected job
    job.cur_symbol = get_currency_symbol(job.currency)
    job.deliverables_list = [line.strip() for line in job.deliverables.split("\n")]
    job.requirements_list = [line.strip() for line in job.requirements.split("\n")]
    job.challenges_list = [line.strip() for line in job.challenges.split("\n")]
    job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]
    return render(request, "freelancer/job_detail_partial.html", {"job": job})

def projectTracking(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    print("Userid", user_id)
    ongProjects = OngoingProjects.objects.filter(freelancer_id=user_id)
    print("OG", ongProjects)
    for ogp in ongProjects:
        print(ogp.opportunityId,"OPP id")
        fl_user = Freelancer.objects.filter(userId=ogp.freelancer_id).first()
        job = ProjectsDisplay.objects.filter(opportunityId=ogp.opportunityId).first()
        if job:
            full_description = job.description or ""
            split_desc = full_description.split(".", 1)  # Split at first full stop

            ogp.short_description = split_desc[0] + "." if len(split_desc) > 1 else full_description
            ogp.full_description = split_desc[1] if len(split_desc) > 1 else ""

        ogp.title = job.title if job else ""
        ogp.name = fl_user.name if fl_user else ""

    context={'user':user, 'ongProjects':ongProjects}
    return render(request, 'freelancer/projectTracking.html', context)

def singleProjectTracking(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    
    ongp_id = request.GET.get('ongpId')
    print("here is the id", ongp_id)
    singleOgp = OngoingProjects.objects.filter(ongProjectId=ongp_id).first()
    opportunity_id = singleOgp.opportunityId
    bid = ProjectQuote.objects.filter(projectQuoteId=singleOgp.bidId).first()

    job = ProjectsDisplay.objects.filter(opportunityId=opportunity_id).first()
    job.deliverables_list = [line.strip() for line in job.deliverables.split("\n")]
    job.cur_symbol = get_currency_symbol(job.currency)

    tasks = Tasks.objects.filter(taskBid_id=bid.projectQuoteId)
    msg_comments = singleOgp.msg_comments
    # Sorting the messages based on the timestamp extracted from the key
    sorted_msg_comments = dict(sorted(
        msg_comments.items(), key=lambda item: int(item[0].split("_")[1])
    )) if msg_comments else {}

    context={'user':user, 'job':job, 'bid':bid, 'singleOgp':singleOgp, 'msg_comments':sorted_msg_comments, 'tasks':tasks}

    return render(request, 'freelancer/singleProjectTracking.html', context)


def get_latest_messages(request):
    ongp_id = request.GET.get('ongpId')
    if not ongp_id:
        return JsonResponse({'error': 'Missing ongpId'}, status=400)

    singleOgp = OngoingProjects.objects.filter(ongProjectId=ongp_id).first()
    if not singleOgp:
        return JsonResponse({'error': 'Project not found'}, status=404)

    # Fetch and sort messages
    msg_comments = singleOgp.msg_comments or {}
    sorted_msg_comments = dict(sorted(
        msg_comments.items(), key=lambda item: int(item[0].split("_")[1])
    ))

    return JsonResponse({'messages': sorted_msg_comments})



def fl_updateProgress(request):
    ongp_id = request.POST.get('ongpId') or request.GET.get('ongpId')
    if not ongp_id:
        return JsonResponse({"success": False, "error": "Missing ongpId"}, status=400)

    if request.method == "POST":
        project_progress = request.POST.get('project_progress')

        if not project_progress:
            return JsonResponse({"success": False, "error": "Missing project progress"}, status=400)

        try:
            ongp = get_object_or_404(OngoingProjects, ongProjectId=ongp_id)
            ongp.progress = int(project_progress)  # Ensure it's an integer
            ongp.save()

            return JsonResponse({"success": True, "message": "Progress updated successfully"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=500)

    return JsonResponse({"success": False, "error": "Invalid request"}, status=400)



# Contact form 
def fl_contact(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        if not user_id:
            return redirect('login')  # Redirect to login if session is missing
        name = request.POST.get('name')
        phone_number = request.POST.get('phone_number')
        email = request.POST.get('email')
        reason = request.POST.get('reason')
        description = request.POST.get('description')
        print(user_id, name, phone_number, email, reason, description)

        # Check if all fields are filled
        if not all([name, phone_number, email, reason, description]):
            messages.error(request, "Please fill out all fields!")
            return redirect(request.META.get('HTTP_REFERER', 'contact'))  # Redirect to the same page

        # Create and save the contact object
        Contact.objects.create(
            user_type='freelancer',
            user_id=user_id,
            name=name,
            phone_number=phone_number,
            email=email,
            reason=reason,
            description=description
        )

        messages.success(request, "Your concern has been submitted successfully!")
        return redirect('fl_index')  # Redirect to home page

    messages.error(request, "Invalid request!")
    return redirect(request.META.get('HTTP_REFERER', 'contact'))

# taks related
def delete_tasks(request):
    print("I am inside the delete tasks")
    if request.method == "POST":
        try:
            task_ids = request.POST.getlist("task_ids[]")
            print(f"Received Task IDs: {task_ids}")  # Debugging print

            if not task_ids:
                return JsonResponse({"success": False, "message": "No tasks selected."})

            deleted_count, _ = Tasks.objects.filter(taskId__in=task_ids).delete()
            print(f"Deleted {deleted_count} tasks.")  # Debugging print

            return JsonResponse({"success": True, "message": f"Deleted {deleted_count} tasks."})
        except Exception as e:
            print(f"Error: {str(e)}")  # Debugging print
            return JsonResponse({"success": False, "message": "An error occurred."})
    
    return JsonResponse({"success": False, "message": "Invalid request method."})

def add_task(request):
    print("I am inside the add task")
    if request.method == "POST":
        try:
            title = request.POST.get("title").title()
            status = request.POST.get("status", "Requirement Gathering")
            bid_id = request.POST.get('bid_id')
            print(f"I am getting add tasks details: {title}, {status}, {bid_id}")

            Tasks.objects.create(title=title, status=status, taskBid_id=bid_id)
            print("Saved task successfully")
            return JsonResponse({"success": True, "message": "Task added successfully!"})
            
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request"})

def update_task(request):
    if request.method == "POST":
        task_id = request.POST.get("task_id")  # ✅ Use POST, not GET
        new_title = request.POST.get("title")  # ✅ Get title from POST
        new_status = request.POST.get("status")  # ✅ Get status from POST
        
        print(f"Updating Task: {task_id}, New Title: {new_title}, New Status: {new_status}")

        if not task_id:
            return JsonResponse({"success": False, "message": "No tasks selected."}, status=400)
        
        try:
            task = Tasks.objects.get(taskId=task_id)
            if new_title:
                task.title = new_title.title()
            if new_status:
                task.status = new_status
            task.save()
            return JsonResponse({"success": True, "message": "Task updated successfully."})
        except Tasks.DoesNotExist:
            return JsonResponse({"success": False, "message": "Task not found."}, status=404)
    return JsonResponse({"success": False, "message": "Invalid request."}, status=400)

# testing

def aws_profile_view(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']
        folder_name = "freelancers"  # Folder inside the S3 bucket
        file_path = f"{folder_name}/{image.name}"  # Full path in S3

        s3_client = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME
        )

        # Upload image to S3 inside the 'freelancers/' folder
        s3_client.upload_fileobj(
            image,
            settings.AWS_STORAGE_BUCKET_NAME,
            file_path,
            ExtraArgs={'ContentType': image.content_type}
        )

        # Generate the S3 image URL
        image_url = f"https://{settings.AWS_S3_CUSTOM_DOMAIN}/{file_path}"
        
        return JsonResponse({'image_url': image_url})

    return render(request, 'freelancer/test_profile_aws.html')

# chat model
@csrf_exempt
def fl_sendMessage(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    
    if request.method == 'POST':
        user_message = request.POST.get('user_message')
        task_id = request.POST.get('msgTaskId')
        task = Tasks.objects.filter(taskId=task_id).first()
        
        if not task:
            return JsonResponse({"success": False, "error": "Task not found"})
            
        ongp_obj = OngoingProjects.objects.filter(bidId=task.taskBid_id).first()
        print(f"tasks are: {task}, {ongp_obj.ongProjectId}")
        print(user_message, task_id)
        
        # Get current time in 12-hour format (e.g., 02:05 PM)
        current_time = timezone.now().strftime("%I:%M %p")
        
        # Create message key using client ID and timestamp
        # Make sure the user_id is used as-is to preserve the CL prefix
        message_key = f"{user_id}_{int(timezone.now().timestamp())}"
        
        # Prepare message data
        message_data = {
            "message": user_message,
            "time": current_time
        }
        
        # Get existing comments or initialize as empty dict if None
        comments = task.comments if task.comments else {}
        
        # Add new message
        comments[message_key] = message_data
        
        # Save updated comments back to task
        task.comments = comments
        task.save()
        
        return JsonResponse({
            "success": True, 
            "message": "Message saved successfully",
            "messageKey": message_key,
            "messageTime": current_time
        })
    
    return JsonResponse({"success": False, "error": "Invalid request method"})      


def get_task_comments(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return JsonResponse({"success": False, "error": "Not logged in"})
    
    task_id = request.GET.get('taskId')
    if not task_id:
        return JsonResponse({"success": False, "error": "No task ID provided"})
    
    task = Tasks.objects.filter(taskId=task_id).first()
    if not task:
        return JsonResponse({"success": False, "error": "Task not found"})
    
    # Get comments or return empty dict if None
    comments = task.comments if task.comments else {}
    
    return JsonResponse({
        "success": True,
        "comments": comments
    })


@csrf_exempt
def fl_sendMsgMessage(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    
    user = Freelancer.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    
    if request.method == 'POST':
        print(" i am inside the post method of sendMsgMessage")
        user_message = request.POST.get('user_message')
        ongp_id = request.POST.get('msgId')
        msg = OngoingProjects.objects.filter(ongProjectId=ongp_id).first()
        
        if not msg:
            return JsonResponse({"success": False, "error": "msg not found"})
            
        # ongp_obj = OngoingProjects.objects.filter(bidId=task.taskBid_id).first()
        # print(f"tasks are: {task}, {ongp_obj.ongProjectId}")
        # print(user_message, ongp_id)
        
        # Get current time in 12-hour format (e.g., 02:05 PM)
        current_time = timezone.now().strftime("%I:%M %p")
        
        # Create message key using client ID and timestamp
        # Make sure the user_id is used as-is to preserve the CL prefix
        message_key = f"{user_id}_{int(timezone.now().timestamp())}"
        
        # Prepare message data
        message_data = {
            "message": user_message,
            "time": current_time
        }
        
        # Get existing comments or initialize as empty dict if None
        comments = msg.msg_comments if msg.msg_comments else {}
        
        # Add new message
        comments[message_key] = message_data
        
        # Save updated comments back to msg
        msg.msg_comments = comments
        msg.save()
        
        return JsonResponse({
            "success": True, 
            "message": "Message saved successfully",
            "messageKey": message_key,
            "messageTime": current_time
        })
    
    return JsonResponse({"success": False, "error": "Invalid request method"})      
