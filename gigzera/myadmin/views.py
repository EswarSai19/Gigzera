from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, auth
from django.contrib.auth.hashers import check_password, make_password
from django.http import HttpResponse
from django.contrib import messages
from django.urls import reverse
from django.http import JsonResponse
import json
import os
import locale
from itertools import chain
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from db_schemas.models import Contact, ProjectQuote, Tasks, Client, Milestones, Freelancer, OngoingProjects, EmploymentHistory, Certificate, Skill, ProjectsDisplay, ProjectStatusDetails  # Create a model for storing quotes
from django.core.exceptions import ValidationError
from datetime import datetime

# Create your views here.

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


# Currency formatting rules
currency_symbols = {
    "USD": "$", "EUR": "€", "JPY": "¥", "GBP": "£", "CNY": "¥", 
    "AUD": "A$", "CAD": "C$", "CHF": "CHF", "INR": "₹", "NZD": "NZ$"
}

# Locale settings for number formatting

currency_locales = {
    "USD": "en_US.UTF-8", "EUR": "de_DE.UTF-8", "JPY": "ja_JP.UTF-8",
    "GBP": "en_GB.UTF-8", "CNY": "zh_CN.UTF-8", "AUD": "en_AU.UTF-8",
    "CAD": "en_CA.UTF-8", "CHF": "de_CH.UTF-8", "INR": "en_IN.UTF-8",
    "NZD": "en_NZ.UTF-8"
}


# Test
# print(f"this is outside the print EUR: {format_currency(325.000, 'EUR')}")
# print(f"this is outside the print JPY: {format_currency(325,000, 'JPY')}")
# print(f"this is outside the print CHF: {format_currency("325'000", 'CHF')}")
# print(f"this is outside the print GBP: {format_currency(325000, 'GBP')}")
# print(f"this is outside the print CNY: {format_currency(325000, 'CNY')}")
# print(f"this is outside the print AUD: {format_currency(325000, 'AUD')}")
# print(f"this is outside the print CAD: {format_currency(325000, 'CAD')}")
# print(f"this is outside the print NZD: {format_currency(325000, 'NZD')}")
# print(f"this is outside the print USD: {format_currency(325000, 'USD')}")
# print(f"this is outside the print INR: {format_currency(325000, 'INR')}")

    
import locale

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
# parts = divide_budget("10.000", "2.500", "EUR", 2)
# print(parts)
# Test cases
# print(f"EUR: {add_and_format('1.000', '3.00', 'EUR')}")  # Expected: 1.300 (1,000 + 300)
# print(f"JPY: {add_and_format('325,000', '231,124', 'JPY')}")  # Expected: 556,124



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

# print("Percentage",calculate_percentage("12223123", 30, "USD"))
# Example usage
# print(add_and_format("2,00,000", "5,000", "INR"))  # Output: ₹ 2,05,000
# print(add_and_format("200000", "5000", "USD"))  # Output: $ 205,000
# print(add_and_format("1,220,000", "5,000", "USD"))  # Output: $ 1,225,000

def ad_index(request):
    freelancers = Freelancer.objects.all()
    clients = Client.objects.all()
    ongoingProjects = OngoingProjects.objects.all()
    yourProjects = ProjectQuote.objects.filter(admin_bid_status='approved', client_bid_status='approved')
    bids = ProjectQuote.objects.all().order_by('-created_at')[:3]
    for bid in bids:
        job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
        user = Freelancer.objects.filter(userId=bid.freelancer_id).first()
        bid.title = job.title if job else "No Title"  # Fixed variable name
        bid.username = user.name
        bid.imgUrl = user.profilePic
    context = {
        'no_of_freelancers': format_currency(len(freelancers), "INR"),
        'no_of_clients': format_currency(len(clients), "INR"),
        'no_of_ogp': format_currency(len(ongoingProjects), "INR"),
        'no_of_yp': format_currency(len(yourProjects), "INR"),
        'bids': bids
    }
    print(context)
    return render(request, 'myadmin/ad_index.html', context)

def dashboard(request):
    freelancers = Freelancer.objects.all()
    clients = Client.objects.all()
    ongoingProjects = OngoingProjects.objects.all()
    yourProjects = ProjectQuote.objects.filter(admin_bid_status='approved', client_bid_status='approved')
    bids = ProjectQuote.objects.all().order_by('-created_at')[:3]
    for bid in bids:
        job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
        user = Freelancer.objects.filter(userId=bid.freelancer_id).first()
        bid.title = job.title if job else "No Title"  # Fixed variable name
        bid.username = user.name
        bid.imgUrl = user.profilePic
    context = {
        'no_of_freelancers': format_currency(len(freelancers), "INR"),
        'no_of_clients': format_currency(len(clients), "INR"),
        'no_of_ogp': format_currency(len(ongoingProjects), "INR"),
        'no_of_yp': format_currency(len(yourProjects), "INR"),
        'bids': bids
    }
    print(context)
    return render(request, 'myadmin/dashboard.html', context)


def freelancers(request, filter_type=None):
    # Get all users by default
    if filter_type == 'active':
        users = Freelancer.objects.filter(is_active=True).order_by('-created_at')
    elif filter_type == 'banned':
        users = Freelancer.objects.filter(is_active=False).order_by('-created_at')
    else:
        users = Freelancer.objects.all().order_by('-created_at')
    
    # Get counts for the stats
    total_users = Freelancer.objects.count()
    active_users = Freelancer.objects.filter(is_active=True).count()
    banned_users = Freelancer.objects.filter(is_active=False).count()
    
    context = {
        'users': users,
        'total_users': total_users,
        'active_users': active_users,
        'baned_users': banned_users,  # keeping your original spelling
        'current_filter': filter_type  # to track active filter
    }
    
    return render(request, 'myadmin/freelancers.html', context)

def freelancerProfileView(request):
    user_id = request.GET.get("userId")
    print("userid", user_id)
    user = Freelancer.objects.filter(userId=user_id).first()
    employment_history = EmploymentHistory.objects.filter(freelancer_id=user_id).order_by('-start_date')
    certificates = Certificate.objects.filter(freelancer_id=user_id).order_by('-issue_date')
    skills = Skill.objects.filter(freelancer_id=user_id).order_by('-updated_at')

    context = {
        'user': user,
        'employment_history': employment_history,  # Corrected the assignment
        'certificates': certificates,
        'skills':skills,
    }
    print(context)
    return render(request, 'myadmin/ad_freelancerProfileView.html', context)

# View to ban a user
def ban_user(request):
    user_id = request.GET.get("userId")
    print(f"I am inside the ban_user", user_id)
    if user_id.startswith('FL'):
        user = get_object_or_404(Freelancer, userId=user_id)
        # Toggle the is_active status
        user.is_active = not user.is_active
        user.save()
        print("Saved")
        return redirect('ad_freelancers')  # Redirect to the freelancers page

    elif user_id.startswith('CL'):
        user = get_object_or_404(Client, userId=user_id)
        # Toggle the is_active status
        user.is_active = not user.is_active
        user.save()
        return redirect('ad_clients')  # Redirect to the clients page
    else:
        return redirect('ad_freelancers')


def verify_user(request):
    user_id = request.GET.get("userId")
    if user_id.startswith('FL'):
        user = get_object_or_404(Freelancer, userId=user_id)
        # Toggle the is_active status
        user.is_verified = not user.is_verified
        user.save()
        return redirect('ad_freelancers')  # Redirect to the freelancers page

    elif user_id.startswith('CL'):
        user = get_object_or_404(Client, userId=user_id)
        # Toggle the is_verified status
        user.is_verified = not user.is_verified
        user.save()
        return redirect('ad_clients')  # Redirect to the clients page

def clients(request, filter_type=None):
    # Get all users by default
    if filter_type == 'active':
        users = Client.objects.filter(is_active=True).order_by('-created_at')
    elif filter_type == 'banned':
        users = Client.objects.filter(is_active=False).order_by('-created_at')
    else:
        users = Client.objects.all().order_by('-created_at')
    
    # Get counts for the stats
    total_users = Client.objects.count()
    active_users = Client.objects.filter(is_active=True).count()
    banned_users = Client.objects.filter(is_active=False).count()
    context = {
        'users': users,
        'total_users': total_users,
        'active_users': active_users,
        'baned_users': banned_users,  # keeping your original spelling
        'current_filter': filter_type
    }
    print(context)
    return render(request, 'myadmin/clients.html', context)

def clientProfileView(request):
    user_id = request.GET.get("userId")
    print("userid", user_id)
    projects = OngoingProjects.objects.filter(client_id=user_id)
    for proj in projects:
        job = ProjectsDisplay.objects.filter(opportunityId=proj.opportunityId).first()
        proj.title = job.title
        proj.description = job.description
        proj.start_date = job.start_date
        print(f"this is prj id {proj.title}")
    user = Client.objects.filter(userId=user_id).first()
    user.company = user.company.title()
    context = {
        'user': user,
        'projects': projects
    }
    print(context)
    return render(request, 'myadmin/ad_clientProfileView.html', context)
    
def ongoingProjects(request):
    ongProjects = OngoingProjects.objects.all()
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

    context={'ongProjects':ongProjects}
    return render(request, 'myadmin/ongoingProjects.html', context)

def singleOngoingProject(request):
    ongp_id = request.GET.get('ongpId')
    print("here is the id", ongp_id)
    singleOgp = OngoingProjects.objects.filter(ongProjectId=ongp_id).first()
    opportunity_id = singleOgp.opportunityId
    bid = ProjectQuote.objects.filter(projectQuoteId=singleOgp.bidId).first()


    ad_payment = bid.revised_budget.replace(",", "").strip()
    amount = float(ad_payment)
    adv_payment = amount * (30 / 100)  # Calculate percentage
    bid.advance_payment = format_currency(adv_payment, bid.currency)

    job = ProjectsDisplay.objects.filter(opportunityId=opportunity_id).first()
    job.deliverables_list = [line.strip() for line in job.deliverables.split("\n")]
    job.cur_symbol = get_currency_symbol(job.currency)
     # ✅ **Fix Date Formatting**
    formatted_start_date = singleOgp.start_date.strftime("%Y-%m-%d") if singleOgp.start_date else ""
    formatted_end_date = singleOgp.end_date.strftime("%Y-%m-%d") if singleOgp.end_date else ""

    context = {
        'job': job, 
        'bid': bid, 
        'singleOgp': singleOgp,
        'formatted_start_date': formatted_start_date,  # ✅ Correct Format
        'formatted_end_date': formatted_end_date       # ✅ Correct Format
    }
    

    return render(request, 'myadmin/singleOngoingProject.html', context)
    


def yourProjects(request):
    ongProjects = OngoingProjects.objects.filter(admin_id="AD001").all()
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

    context={'ongProjects':ongProjects}
    return render(request, 'myadmin/yourProjects.html', context)
    # my_projects = ProjectQuote.objects.filter(admin_bid_status='approved', client_bid_status='approved')
    # print("Projects",len(my_projects))
    # return render(request, 'myadmin/yourProjects.html', {'my_projects': my_projects})


def singleYourProject(request):

    ongp_id = request.GET.get('ongpId') or request.POST.get('ongpId')
    print("Here is the ID:", ongp_id)

    singleOgp = OngoingProjects.objects.filter(ongProjectId=ongp_id).first()

    if not singleOgp:
        messages.error(request, "No project found with the given ID.")
        return redirect('ad_yourProjects')  # Redirect safely

    opportunity_id = singleOgp.opportunityId
    bid = ProjectQuote.objects.filter(projectQuoteId=singleOgp.bidId).first()

    if not bid:
        messages.error(request, "No bid found for this project.")
        return redirect('ad_yourProjects')  # Redirect safely

    # Fix budget calculations
    # ad_payment = bid.revised_budget.replace(",", "").strip()
    # amount = float(ad_payment)
    # bid.advance_payment = amount * (30 / 100)

    job = ProjectsDisplay.objects.filter(opportunityId=opportunity_id).first()

    if job:
        job.deliverables_list = [line.strip() for line in job.deliverables.split("\n")]
        job.cur_symbol = get_currency_symbol(job.currency)
    milestones = Milestones.objects.filter(bid_id=bid.projectQuoteId).all()
    tasks = Tasks.objects.filter(taskBid_id=bid.projectQuoteId).all()
    # print("Milestones", milestones)
    context = {
        'job': job,
        'bid': bid,
        'singleOgp': singleOgp,
        'milestones': milestones,
        'tasks': tasks
    }
    # print("Context", context)
    # print(f"Date: {singleOgp.start_date}, {singleOgp.end_date}")

    
    return render(request, 'myadmin/singleYourProject.html', context)


def updateProgressStatus(request):
    ongp_id = request.POST.get('ongpId') or request.GET.get('ongpId')
    print("ID", ongp_id)

    if request.method == "POST":
        project_progress = request.POST.get('project_progress')
        project_status = request.POST.get('project_status')

        print("Progress:", project_progress, "Status:", project_status)

        try:
            ongp = get_object_or_404(OngoingProjects, ongProjectId=ongp_id)
            ongp.progress = project_progress  
            ongp.status = project_status  
            ongp.save()

            print("Updated")
            return JsonResponse({"success": True, "message": "Progress updated successfully"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request"})


def updateTimelines(request):
    ongp_id = request.POST.get('ongpId') or request.GET.get('ongpId')
    if request.method == "POST":
        start_date = request.POST.get("start_date")
        end_date = request.POST.get("end_date")

        try:
            project = get_object_or_404(OngoingProjects, ongProjectId=ongp_id)
            project.start_date = start_date
            project.end_date = end_date
            project.save()

            return JsonResponse({"success": True, "message": "Timeline updated successfully"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request"})

def updateFinanceMilestones(request):
    bid_id = request.POST.get('bidId') or request.GET.get('bidId')

    if request.method == "POST":
        consulting_charges = request.POST.get("consulting_charges")
        advance_payment = request.POST.get("advance_payment")
        print("I am getting details in updateFinanceMilestones", bid_id, consulting_charges, advance_payment)

        try:
            project = get_object_or_404(ProjectQuote, projectQuoteId=bid_id)
            project.admin_margin = format_currency(consulting_charges, project.currency)
            project.revised_budget = add_and_format(project.budget, project.admin_margin, project.currency)
            project.advance_payment = format_currency(advance_payment, project.currency)
            project.save()

            milestones = Milestones.objects.filter(bid_id=bid_id)
            for milestone in milestones:
                delete_flag = request.POST.get(f"{milestone.id}_delete")
                if delete_flag == "1":
                    milestone.delete()
                    continue  # Skip updating this milestone
                milestone_date = request.POST.get(f"{milestone.id}_date")
                milestone_amount = request.POST.get(f"{milestone.id}_amount")
                milestone_status = request.POST.get(f"{milestone.id}_status")

                if milestone_date:
                    milestone.date = milestone_date
                if milestone_amount:
                    milestone.amount = milestone_amount
                if milestone_status:
                    milestone.status = milestone_status
                
                milestone.save()

            return JsonResponse({"success": True, "message": "Timeline updated successfully"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request"})

def delete_milestone(request):
    if request.method == "POST":
        milestone_id = request.POST.get("milestone_id")
        if not milestone_id:
            return JsonResponse({"success": False, "error": "Milestone ID is required"})

        try:
            milestone = get_object_or_404(Milestones, id=milestone_id)
            milestone.delete()
            return JsonResponse({"success": True, "message": "Milestone deleted successfully"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request"})


def add_milestone(request):

    if request.method == "POST":
        try:
            bid_id = request.POST.get("bidId")
            date = request.POST.get("ad_ms_date")
            amount = request.POST.get("ad_ms_amount")
            status = request.POST.get("ad_ms_status")

            if date and amount and status:
                Milestones.objects.create(
                    bid_id=bid_id,
                    date=str(date),
                    amount=amount,
                    status=status,
                )
                return redirect(request.META.get("HTTP_REFERER", "/"))
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request"})


# def updateFinanceMilestones(request):
#     ongp_id = request.POST.get("bidId") or request.GET.get("bidId")

#     if request.method == "POST":
#         consulting_charges = request.POST.get("consulting_charges", "0").strip()
#         advance_payment = request.POST.get("advance_payment", "0").strip()

#         print("Received details:", ongp_id, consulting_charges, advance_payment)

#         try:
#             project = get_object_or_404(ProjectQuote, projectQuoteId=ongp_id)

#             # Update values
#             project.admin_margin = format_currency(consulting_charges, project.currency)
#             project.revised_budget = add_and_format(project.budget, consulting_charges, project.currency)
#             project.advance_payment = format_currency(advance_payment, project.currency)
            
#             project.save()

#             return JsonResponse({"success": True, "message": "Finance milestones updated successfully"})
#             # return render(request, 'myadmin/singleYourProject.html', context)
#         except ValueError:
#             return JsonResponse({"success": False, "error": "Invalid numerical values"})
#         except Exception as e:
#             return JsonResponse({"success": False, "error": str(e)})

#     return JsonResponse({"success": False, "error": "Invalid request method"})



def userManagement(request):
    users = Freelancer.objects.all().order_by('-created_at')
    cl_users = Client.objects.all().order_by('-created_at')
    total_users = list(chain(users, cl_users)) 
    for user in total_users:
        user.user_role_ = user.user_role.title()
    context = {
        'users': total_users,
    }
    return render(request, 'myadmin/userManagement.html', context)

def latestProjectQuotes(request):
    bids = ProjectQuote.objects.all().order_by('-created_at')
    for bid in bids:
        job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
        user = Freelancer.objects.filter(userId=bid.freelancer_id).first()
        bid.title = job.title if job else "No Title"  # Fixed variable name
        bid.cur_symbol = get_currency_symbol(job.currency if job else "USD")  # Ensure currency is handled properly
        bid.user_experience = user.experience if user else "No Experience"
    
    context = {'bids': bids}
    return render(request, 'myadmin/latestProjectQuotes.html', context)

def latestSinglePQ(request):
    opportunity_id = request.GET.get('opportunityId')
    user_id = request.GET.get('userId')
    bid_id = request.GET.get('bidId')
    print("ID", opportunity_id, user_id, bid_id)

    job = ProjectsDisplay.objects.filter(opportunityId=opportunity_id).first()
    job.deliverables_list = [line.strip() for line in job.deliverables.split("\n")]
    job.skills_list = [skill.strip().title() for skill in job.skills_required.split(',')]
    job.cur_symbol = get_currency_symbol(job.currency)


    user = Freelancer.objects.filter(userId=user_id).first()
    user.skills_dict = {skill: f"{exp} years" for skill, exp in user.skills.items()}
    user.certificates_list = [cert.strip().title() for cert in user.certifications.split(',')]

    bid = ProjectQuote.objects.filter(projectQuoteId=bid_id).first()
    bid.cur_symbol = get_currency_symbol(job.currency if job else "USD")

    # basic_revised_budget = bid.budget.replace(",", "").strip()
    # amount = float(basic_revised_budget)
    bid.basic_revised_budget = calculate_percentage(bid.budget, 30, job.currency)  # Calculate percentage
    print("Job", bid)
    context = {'job':job, 'user':user, 'bid':bid}
    return render(request, 'myadmin/latestSinglePQ.html', context)

def bidApproved(request):
    bids = ProjectQuote.objects.all().order_by('-created_at')
    for bid in bids:
        job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
        user = Freelancer.objects.filter(userId=bid.freelancer_id).first()
        bid.title = job.title if job else "No Title"  # Fixed variable name
        bid.cur_symbol = get_currency_symbol(job.currency if job else "USD")  # Ensure currency is handled properly
        bid.user_experience = user.experience if user else "No Experience"
        context = {'bids': bids}
    if request.method == "POST":
        admin_margin = request.POST.get("adminMargin", "0").strip()
        bid_id = request.POST.get('bidId')
        print("Admin Margin:", admin_margin, bid_id)  # Debugging
        try:
            # Fetch the bid using bid_id
            bid = get_object_or_404(ProjectQuote, projectQuoteId=bid_id)  
            admin_margin = format_currency(admin_margin, bid.currency)
            # Update the admin margin and bid status
            bid.admin_margin = admin_margin
            bid.admin_bid_status = "approved"
            bid.revised_budget = add_and_format(bid.budget, bid.admin_margin, bid.currency)
            bid.advance_payment = calculate_percentage(bid.revised_budget, 30, bid.currency)
            bid.save()  # Save changes

            print(f"Updated bid {bid_id}: admin_margin={admin_margin}, bid_status=approved")
            messages.success(request, "Bid was sent to client successfully")
            return redirect('ad_latestProjectQuotes')

        except Exception as e:
            print(f"Error updating bid: {e}")
            messages.error(request, f"Error updating bid {bid_id}: {str(e)}")
    return render(request, 'myadmin/latestProjectQuotes.html', context)

def bidRejected(request):
    bids = ProjectQuote.objects.all().order_by('-created_at')
    for bid in bids:
        job = ProjectsDisplay.objects.filter(opportunityId=bid.opportunityId).first()
        user = Freelancer.objects.filter(userId=bid.freelancer_id).first()
        bid.title = job.title if job else "No Title"  # Fixed variable name
        bid.cur_symbol = get_currency_symbol(job.currency if job else "USD")  # Ensure currency is handled properly
        bid.user_experience = user.experience if user else "No Experience"
        context = {'bids': bids}
    if request.method == "POST":
        admin_margin = request.POST.get("adminMargin", "0").strip()
        bid_id = request.POST.get('bidId')
        print("Admin Margin:", admin_margin, bid_id)  # Debugging
        try:
            # Fetch the bid using bid_id
            bid = get_object_or_404(ProjectQuote, projectQuoteId=bid_id)  
            admin_margin = format_currency(admin_margin, bid.currency)
            # Update the admin margin and bid status
            bid.admin_margin = admin_margin
            bid.admin_bid_status = "rejected"
            bid.revised_budget = add_and_format(bid.budget, bid.admin_margin, job.currency)
            bid.advance_payment = calculate_percentage(bid.revised_budget, 30, bid.currency)
            bid.save()  # Save changes

            print(f"Updated bid {bid_id}: admin_margin={admin_margin}, bid_status=approved")
            messages.success(request, "Bid was rejected successfully")
            return redirect('ad_latestProjectQuotes')

        except Exception as e:
            print(f"Error updating bid: {e}")
            messages.error(request, f"Error updating bid {bid_id}: {str(e)}")
    return render(request, 'myadmin/latestProjectQuotes.html', context)

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
    return render(request, 'myadmin/profileView.html', context)

def jobPageAdv(request):
    return render(request, 'myadmin/jobPageAdv.html')

def jobPageImages(request):
    return render(request, 'myadmin/jobPageImages.html')

def partnerLogos(request):
    return render(request, 'myadmin/partnerLogos.html')

def logout(request):
    return render(request, 'myadmin/ad_logout.html')
