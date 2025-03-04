

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, auth
from django.contrib.auth.hashers import check_password, make_password
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib import messages
import json
import os
import boto3
import time
import locale
import re
from django.utils import timezone
from urllib.parse import urlparse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from db_schemas.models import Client, Tasks, ProjectsDisplay, Milestones, OngoingProjects, Contact, ProjectQuote, Freelancer, EmploymentHistory,Certificate, Skill
from django.core.exceptions import ValidationError
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta






def calculate_end_date(start_date: str, option: str) -> str:
    option_mapping = {
        "Less than 1 Month": 1,
        "1-2 Months": 1,
        "2-4 Months": 2,
        "4-8 Months": 4,
        "8-12 Months": 8,
        "More than 12 Months": 12
    }

    months_to_add = option_mapping.get(option, 1)  # Default to 1 month if option is not found
    start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
    end_date_obj = start_date_obj + relativedelta(months=months_to_add)

    return end_date_obj.strftime("%Y-%m-%d")



def divide_dates(start_date: str, end_date: str):
    # Convert strings to datetime objects
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")

    # Calculate the total duration
    total_days = (end - start).days

    # Check if total_days can be divided into 3 parts
    if total_days < 3:
        return "Date range is too short to divide into 3 parts."

    # Calculate the interval for each part
    interval = total_days // 3

    # Find the last two division points
    part2 = start + timedelta(days=interval)   # End of 1st part
    part3 = part2 + timedelta(days=interval)   # End of 2nd part

    # Return dates in "YYYY-MM-DD" format
    return part2.strftime("%Y-%m-%d"), part3.strftime("%Y-%m-%d")


currency_locales = {
    "USD": "en_US.UTF-8", "EUR": "de_DE.UTF-8", "JPY": "ja_JP.UTF-8", 
    "GBP": "en_GB.UTF-8", "CNY": "zh_CN.UTF-8", "AUD": "en_AU.UTF-8", 
    "CAD": "en_CA.UTF-8", "CHF": "de_CH.UTF-8", "INR": "en_IN.UTF-8", "NZD": "en_NZ.UTF-8"
}

def clean_number(value, currency_code):
    """Cleans and converts numbers based on currency format."""
    if isinstance(value, (int, float)):
        return value  # Already a number
    
    value = str(value).replace("'", "").replace(" ", "")  # Remove Swiss & extra spaces
    
    if currency_code in ["EUR", "DE", "FR", "CHF"]:  # European style (dot as thousand separator)
        value = value.replace(".", "").replace(",", ".")  # Remove thousand dots & fix decimal commas
    else:  # Standard format (comma as thousand separator)
        value = value.replace(",", "")

    try:
        return float(value) if "." in value else int(value)  # Convert to int if no decimals
    except ValueError:
        raise ValueError(f"Invalid number format: {value}")

def add_and_format(budget, admin_margin, currency_code):
    """Adds two numbers and formats them based on the currency code."""
    budget = clean_number(budget, currency_code)
    admin_margin = clean_number(admin_margin, currency_code)
    
    total = budget + admin_margin  # Calculate sum
    print(f"Total is {total}")
    
    return format_currency(total, currency_code)

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

def divide_budget(revised_budget, advance_payment, currency, no_of_parts):
    """Divides the remaining budget into equal parts after deducting advance payment."""
    # Convert string inputs to numbers
    revised_budget = clean_number(revised_budget, currency)
    advance_payment = clean_number(advance_payment, currency)

    # Calculate remaining budget
    remaining_budget = revised_budget - advance_payment

    if no_of_parts <= 0:
        raise ValueError("Number of parts must be greater than 0.")

    # Calculate equal parts
    part_amount = remaining_budget / no_of_parts

    # Format and return results
    return [format_currency(part_amount, currency) for _ in range(no_of_parts)]

# Example usage
print(divide_dates("2024-01-01", "2024-02-20"))  # Example: 50 days



# Example usage:
# start_date = "2025-02-19"
# option = "2-4 Months"
# end_date = calculate_end_date(start_date, option)
# print(end_date)  # Output: 2025-04-19

# Create your views here.

currency_symbols = {
    "USD": "$", "EUR": "€", "JPY": "¥", "GBP": "£", "CNY": "¥", 
    "AUD": "A$", "CAD": "C$", "CHF": "CHF", "INR": "₹", "NZD": "NZ$"
}

def get_currency_symbol(currency_code):
    return currency_symbols.get(currency_code, "-")



# Contact form 

def cl_contact(request):

    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        if not user_id:
            return redirect('login')  # Redirect to login if session is missing
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
            user_type='client',
            user_id=user_id,
            name=name,
            phone_number=phone_number,
            email=email,
            reason=reason,
            description=description
        )

        messages.success(request, "Your concern has been submitted successfully!")
        return redirect('cl_index')  # Redirect to home page

    messages.error(request, "Invalid request!")
    return redirect(request.META.get('HTTP_REFERER', 'contact'))

def get_initials(name):
    # Split the name into parts
    name_parts = name.strip().split()
    
    # Extract the first letter from each part and capitalize it
    initials = ''.join(part[0].upper() for part in name_parts)
    
    return initials


def cl_index(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    return render(request, 'client/index.html', {'user': user})


def cl_aboutus(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    context={'user':user}
    return render(request, 'client/aboutus.html', context)

def cl_industries(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    context={'user':user}
    return render(request, 'client/industries.html', context)

def cl_profile(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    print("users details:", user, user_id, user.initials)
    context={'user':user}

    if request.method=="POST":
        title=request.POST.get('title')
        project_type=request.POST.get('project_type')
        budget=request.POST.get('budget')
        duration=request.POST.get('duration')
        currency=request.POST.get('currency')
        description=request.POST.get('description')
        start_date=request.POST.get('start_date')
        requirements=request.POST.get('requirements')
        challenges=request.POST.get('challenges')
        time_zone=request.POST.get('time_zone')
        skills = request.POST.get("skills_list", "")  # Comma-separated string
        print(f"Selected Skills: {skills}") 

        if not all([title, project_type, budget, duration, currency, description, start_date, requirements, challenges, time_zone, skills]):
            messages.error(request, "Please fill out all fields!")
            return redirect('cl_postajob')  # Redirect to home page

        # Create and save the contact object
        ProjectsDisplay.objects.create(
            title=title, 
            project_type=project_type,
            budget= budget, 
            duration=duration, 
            currency=currency, 
            description=description, 
            start_date=start_date, 
            requirements=requirements, 
            challenges=challenges, 
            time_zone=time_zone, 
            skills_required=skills,
            client_id=user_id,
        )

        messages.success(request, "Your job has been submitted successfully!")
        return redirect('cl_profile')  # Redirect to home page

        print(f"title: {title}\nproject_type: {project_type}\nbudget: {budget}\nduration: {duration}\ncurrency: {currency}\ndescription: {description}\nstart_date: {start_date}\nrequirements: {requirements}\ntime_zone: {time_zone}\nchallenges: {challenges}\n")
    print("I am here")
    return render(request, 'client/cl_profile.html', context)

def cl_test(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    context={'user':user}
    return render(request, 'client/test.html', context)

def cl_postajob(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    context={'user':user}

    if request.method=="POST":
        title=request.POST.get('title')
        project_type=request.POST.get('project_type')
        budget=request.POST.get('budget')
        duration=request.POST.get('duration')
        currency=request.POST.get('currency')
        deliverables=request.POST.get('deliverables')
        description=request.POST.get('description')
        start_date=request.POST.get('start_date')
        requirements=request.POST.get('requirements')
        challenges=request.POST.get('challenges')
        time_zone=request.POST.get('time_zone')
        skills = request.POST.get("skills_list", "")  # Comma-separated string
        print(f"Selected Skills: {skills}") 

        if not all([title, project_type, budget, duration, currency, description, start_date, requirements, challenges, time_zone, skills]):
            messages.error(request, "Please fill out all fields!")
            return redirect('cl_postajob')  # Redirect to home page
        print("this is the testing user_id", user_id)
        # Create and save the contact object
        ProjectsDisplay.objects.create(
            title=title, 
            project_type=project_type,
            budget= budget, 
            duration=duration, 
            currency=currency, 
            description=description, 
            start_date=start_date,
            deliverables=deliverables,
            requirements=requirements, 
            challenges=challenges, 
            time_zone=time_zone, 
            skills_required=skills,
            client_id=user_id
        )

        messages.success(request, "Your form has been submitted successfully!")
        return redirect('cl_postajob')  # Redirect to home page

        print(f"title: {title}\nproject_type: {project_type}\nbudget: {budget}\nduration: {duration}\ncurrency: {currency}\ndescription: {description}\nstart_date: {start_date}\nrequirements: {requirements}\ntime_zone: {time_zone}\nchallenges: {challenges}\n")

    return render(request, 'client/cl_postajob.html', context)
    
def cl_logout(request):
    request.session.flush()  # ✅ Clears all session data (logs user out)
    return redirect('login')
    
def edit_profile(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')  # Redirect to login if session is missing
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    client = get_object_or_404(Client, userId=user_id)
    current_img_url = str(client.profilePic)
    print("Current", current_img_url, type(current_img_url))
    # Check if the request method is POST
    if request.method == 'POST':
        # Retrieve the data from the request
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        designation = request.POST.get('designation')
        company = request.POST.get('company')
        social_media = request.POST.get('social_media')

        # Handle file upload for profilePic
        profile_pic = request.FILES.get('profilePic')
        
        response = delete_if_uploaded(current_img_url)
        print("Response", response)
        image_url = upload_to_s3("clients", profile_pic)

        print(name, email, phone, designation, social_media, company, profile_pic)
        # Update the client instance
        client.name = name
        client.phone = phone
        client.email = email
        client.designation = designation
        client.social_media = social_media
        client.company = company
        client.profilePic = image_url

        # Save the updated client object
        client.save()

        # Redirect to a new page or display a success message
        return redirect('cl_profile')

    return render(request, 'client/cl_profile.html', {'user': client})


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


def cl_ongoingProjects(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)

    ongProjects = OngoingProjects.objects.filter(client_id=user_id)
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
    return render(request, 'client/cl_ongoingProjects.html', context)

def cl_singleOgProject(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    ongp_id = request.GET.get('ongpId')
    print("here is the id", ongp_id)
    singleOgp = OngoingProjects.objects.filter(ongProjectId=ongp_id).first()
    opportunity_id = singleOgp.opportunityId
    bid = ProjectQuote.objects.filter(projectQuoteId=singleOgp.bidId).first()

    job = ProjectsDisplay.objects.filter(opportunityId=opportunity_id).first()
    job.deliverables_list = [line.strip() for line in job.deliverables.split("\n")]
    job.cur_symbol = get_currency_symbol(job.currency)

    milestones = Milestones.objects.filter(bid_id=bid.projectQuoteId)
    for milestone in milestones:
        milestone.cur_symbol = get_currency_symbol(milestone.currency)
        milestone.cl_status = milestone.status.lower()

    tasks = Tasks.objects.filter(taskBid_id=bid.projectQuoteId)
    msg_comments = singleOgp.msg_comments
    # Sorting the messages based on the timestamp extracted from the key
    sorted_msg_comments = dict(sorted(
        msg_comments.items(), key=lambda item: int(item[0].split("_")[1])
    ))

    context={'user':user, 'job':job, 'bid':bid, 'singleOgp':singleOgp, 'msg_comments':sorted_msg_comments, 'milestones':milestones, 'tasks':tasks}

    return render(request, 'client/cl_singleOgProject.html', context)
    
def cl_updateProgress(request):
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



def cl_viewBids(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.filter(userId=user_id).first()
    user.initials = get_initials(user.name)
    print(f"here is the user: {user.initials}, {user.name}, {user.email}")
    bids = ProjectQuote.objects.all().order_by('-created_at')

    for bid in bids:
        job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
        fl_user = Freelancer.objects.filter(userId=bid.freelancer_id).first()
        bid.title = job.title if job else "No Title"  # Fixed variable name
        bid.cur_symbol = get_currency_symbol(job.currency if job else "USD")  # Ensure currency is handled properly
        bid.user_experience = fl_user.experience if fl_user else "No Experience"
        
    context={'user':user,'bids': bids}
    return render(request, 'client/cl_viewBids.html', context)

def cl_singleViewBid(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)



    opportunity_id = request.GET.get('opportunityId')
    user_id = request.GET.get('userId')
    bid_id = request.GET.get('bidId')
    print("ID", opportunity_id, user_id, bid_id)

    job = ProjectsDisplay.objects.filter(opportunityId=opportunity_id).first()
    job.deliverables_list = [line.strip() for line in job.deliverables.split("\n")]
    job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]
    job.cur_symbol = get_currency_symbol(job.currency)


    fl_user = Freelancer.objects.filter(userId=user_id).first()
    fl_user.skills_dict = {skill: f"{exp} years" for skill, exp in fl_user.skills.items()}
    fl_user.certificates_list = [cert.strip().title() for cert in fl_user.certifications.split(',')]

    bid = ProjectQuote.objects.filter(projectQuoteId=bid_id).first()
    bid.cur_symbol = get_currency_symbol(bid.currency if bid else "USD")
    print("Job", bid)
    context = {'job':job, 'user':user, 'fl_user':fl_user, 'bid':bid}
    return render(request, 'client/cl_singleViewBid.html', context)

def profileView(request):
    user_id = request.GET.get('userId')
    bid_id = request.GET.get('bidId')
    opportunity_id = request.GET.get('opportunityId')
    print("Coming",user_id, bid_id, opportunity_id)
    user = Freelancer.objects.filter(userId=user_id).first()
    user.initials = get_initials(user.name)
    employment_history = EmploymentHistory.objects.filter(freelancer_id=user_id).order_by('-start_date')
    certificates = Certificate.objects.filter(freelancer_id=user_id).order_by('-issue_date')
    skills = Skill.objects.filter(freelancer_id=user_id).order_by('-updated_at')

    context = {
        'user': user,
        'employment_history': employment_history,  # Corrected the assignment
        'certificates': certificates,
        'skills':skills,
        'bid_id':bid_id,
        'opportunity_id':opportunity_id,
        'user_id':user_id,
    }
    print("User id is", user_id )
    print("skills", skills )
    print("certificates", certificates )
    return render(request, 'client/profileView.html', context)



def cl_bidApproved(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    print(f"here is the user: {user.initials}, {user.name}, {user.email}")
    bids = ProjectQuote.objects.all().order_by('-created_at')
    for bid in bids:
        job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
        og_start_date = job.start_date
        og_end_date = calculate_end_date(str(job.start_date), job.duration)
        user = Freelancer.objects.filter(userId=bid.freelancer_id).first()
        bid.title = job.title if job else "No Title"  # Fixed variable name
        bid.cur_symbol = get_currency_symbol(job.currency if job else "USD")  # Ensure currency is handled properly
        bid.user_experience = user.experience if user else "No Experience"
        context = {'bids': bids, 'user': user}
    if request.method == "POST":
        bid_id = request.POST.get('bidId')
        print("Admin Margin:", bid_id)  # Debugging
        try:
            # Fetch the bid using bid_id
            bid = get_object_or_404(ProjectQuote, projectQuoteId=bid_id)  
            
            # Update the admin margin and bid status
            bid.client_bid_status = "approved"
            bid.save()  # Save changes

            job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
            og_start_date = job.start_date
            og_end_date = calculate_end_date(str(job.start_date), job.duration)
            ms_date1, ms_date2 = divide_dates(str(og_start_date), str(og_end_date))
            ms_amt1, ms_amt2 = divide_budget(bid.revised_budget, bid.advance_payment, job.currency, 2)
            # ONG recored creation:
            OngoingProjects.objects.create(
                opportunityId = bid.opportunityId,
                bidId = bid_id,
                start_date=og_start_date,
                end_date=og_end_date,
                status = 'Bid Ongoing',
                progress = '0',
                admin_id = bid.admin_id,
                client_id = bid.client_id,
                freelancer_id = bid.freelancer_id
            )

            Milestones.objects.create(date=ms_date1, amount=ms_amt1, currency=job.currency, status="Pending", bid_id=bid_id)
            Milestones.objects.create(date=ms_date2, amount=ms_amt2, currency=job.currency, status="Pending", bid_id=bid_id)

            print(f"Updated bid {bid_id}: bid_status=approved")
            messages.success(request, "Bid was sent to freelancer successfully")
            return redirect('cl_viewBids')

        except Exception as e:
            print(f"Error updating bid: {e}")
            messages.error(request, f"Error updating bid {bid_id}: {str(e)}")
    return render(request, 'client/cl_viewBids.html', context)

def cl_bidRejected(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    user = Client.objects.get(userId=user_id)
    user.initials = get_initials(user.name)
    print(f"here is the user: {user.initials}, {user.name}, {user.email}")
    bids = ProjectQuote.objects.all().order_by('-created_at')
    for bid in bids:
        job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
        user = Freelancer.objects.filter(userId=bid.freelancer_id).first()
        bid.title = job.title if job else "No Title"  # Fixed variable name
        bid.cur_symbol = get_currency_symbol(job.currency if job else "USD")  # Ensure currency is handled properly
        bid.user_experience = user.experience if user else "No Experience"
        context = {'bids': bids, 'user': user}
    if request.method == "POST":
        bid_id = request.POST.get('bidId')
        print("Admin Margin:", bid_id)  # Debugging
        try:
            # Fetch the bid using bid_id
            bid = get_object_or_404(ProjectQuote, projectQuoteId=bid_id)  
            
            # Update the admin margin and bid status
            bid.client_bid_status = "rejected"
            bid.save()  # Save changes

            print(f"Updated bid {bid_id}: bid_status=rejected")
            messages.success(request, "Bid was sent to freelancer successfully")
            return redirect('cl_viewBids')

        except Exception as e:
            print(f"Error updating bid: {e}")
            messages.error(request, f"Error updating bid {bid_id}: {str(e)}")
    return render(request, 'client/cl_viewBids.html', context)


@csrf_exempt
def cl_sendMessage(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    
    user = Client.objects.get(userId=user_id)
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
def cl_sendMsgMessage(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')
    
    user = Client.objects.get(userId=user_id)
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

# Sending messages
# def cl_sendMessage(request):
#     if request.method == "POST":
#         user_id = request.session.get("user_id")
#         if not user_id:
#             return JsonResponse({"status": "error", "message": "User not logged in"}, status=401)

#         user = Client.objects.get(userId=user_id)
#         user_message = request.POST.get("user_message")
#         task_id = request.POST.get("taskId")
        
#         # Fetch the task
#         task = Tasks.objects.filter(taskId=task_id).first()
#         if not task:
#             return JsonResponse({"status": "error", "message": "Task not found"}, status=404)

#         # Store the message in the AWS RDS JSON column
#         existing_messages = json.loads(task.messages) if task.messages else []
#         new_message = {
#             "user": user.name,
#             "message": user_message,
#             "timestamp": timezone.now().strftime("%Y-%m-%d %H:%M:%S"),
#         }
#         existing_messages.append(new_message)
#         task.messages = json.dumps(existing_messages)
#         task.save()

#         return JsonResponse({"status": "success", "message": "Message saved"})
    
#     return JsonResponse({"status": "error", "message": "Invalid request"}, status=400)

