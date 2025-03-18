import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from django.contrib.auth.hashers import make_password, check_password
from django.utils.timezone import now
from django.db.models import JSONField
import datetime
import json

# Create your models here.
def generate_client_id():
    return f"CL{str(uuid.uuid4().int)[:8]}"

def generate_task_id():
    return f"TS{str(uuid.uuid4().int)[:3]}"

def generate_projectquote_id():
    return f"PQ{str(uuid.uuid4().int)[:5]}"

def generate_admin_id():
    return f"AD{str(uuid.uuid4().int)[:3]}"

def generate_ongProject_id():
    return f"ONG{str(uuid.uuid4().int)[:4]}"

def generate_contact_id():
    return "CN" + str(uuid.uuid4().hex[:4]).upper()

def generate_opportunity_id():
    return f"OP{str(uuid.uuid4().int)[:5]}"


def generate_freelancer_id():
    return f"FL{str(uuid.uuid4().int)[:8]}"

# Client signup details model
class Client(models.Model):
    userId = models.CharField(
        primary_key=True, max_length=12, default=generate_client_id, editable=False
    )
    name = models.CharField(max_length=255)
    profilePic = models.ImageField(upload_to="client/profile_pics/", blank=True, null=True, default="https://gigzera-s3-bkt.s3.ap-south-1.amazonaws.com/clients/profile_sample.jpeg")
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    user_role = models.CharField(max_length=50, default='client')
    country = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    company = models.CharField(max_length=50)
    designation = models.CharField(max_length=50)
    social_media = models.URLField(blank=True, null=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """Hash the password before saving the freelancer."""
        if not self.password.startswith("pbkdf2_sha256$"):  # Avoid re-hashing
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        """Verify the password."""
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.name


# Freelancer related models
class Freelancer(models.Model):
    userId = models.CharField(
        primary_key=True, max_length=12, default=generate_freelancer_id, editable=False
    )
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    user_role = models.CharField(max_length=50, default='freelancer')
    profile_summary = models.TextField(max_length=512, blank=True, null=True)
    designation = models.CharField(max_length=50)
    social_media = models.URLField(blank=True, null=True)
    country = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    education = models.CharField(max_length=255)
    certifications = models.CharField(max_length=255, blank=True, null=True)
    experience = models.FloatField()
    skills = models.JSONField(default=dict, blank=True)  # Example: {"Python": 3.5, "Django": 2.0}
    projects_assigned = models.JSONField(default=dict, blank=True)
    # project_status = models.JSONField(default=dict, blank=True)
    profilePic = models.ImageField(upload_to="freelancer/profile_pics/", blank=True, null=True, default="https://gigzera-s3-bkt.s3.ap-south-1.amazonaws.com/freelancers/profile_sample.jpeg")
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """Hash the password before saving the freelancer."""
        if not self.password.startswith("pbkdf2_sha256$"):  # Avoid re-hashing
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        """Verify the password."""
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.name

class MyAdmin(models.Model):
    adminId = models.CharField(
        primary_key=True, max_length=12, default=generate_admin_id, editable=False
    )
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True)
    user_role = models.CharField(max_length=50, default='admin')  # Can be 'admin' or 'super'
    password = models.CharField(max_length=128, blank=True)  # No default here
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """Set default password based on user role before saving."""
        if not self.password:  # Only set default if password is not provided
            role_suffix = "admin" if self.user_role.lower() == "admin" else "super"
            self.password = f"{self.adminId}_{role_suffix}"  # Default password format
        
        if not self.password.startswith("pbkdf2_sha256$"):  # Avoid re-hashing
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        """Verify the password."""
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.name

class PartnerLogos(models.Model):
    admin_id = models.CharField(max_length=12)
    logo_name = models.CharField(max_length=255, null=True, blank=True)
    logo_url = models.URLField()
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.admin_id} had added {self.logo_url}"


class Skill(models.Model):
    freelancer = models.ForeignKey(
        Freelancer, 
        on_delete=models.CASCADE, 
        related_name='skill_set'  # Changed related_name to avoid conflict
    )
    skill_name = models.CharField(max_length=100)
    experience_years = models.FloatField()
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.skill_name} ({self.experience_years} years)"


class Certificate(models.Model):
    freelancer = models.ForeignKey(
        Freelancer, on_delete=models.CASCADE, related_name="certificates"
    )
    certificate_name = models.CharField(max_length=255)  # Name of the certification
    issue_date = models.DateField(blank=True, null=True)  # Date when the certificate was issued
    expiry_date = models.DateField(blank=True, null=True)  # Expiry date (can be null)
    certification_id = models.CharField(max_length=512, unique=True, null=True, blank=True)  # Unique cert ID
    certificate_img = models.ImageField(blank=True, null=True)
    certification_url = models.URLField(blank=True, null=True)  # URL to verify the cert
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.certificate_name} (ID: {self.certification_id})"


class EmploymentHistory(models.Model):
    freelancer = models.ForeignKey(
        Freelancer, on_delete=models.CASCADE, related_name="employment_history"
    )
    company = models.CharField(max_length=255)
    job_title = models.CharField(max_length=100)
    description = models.TextField()
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    currently_working = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.company} - {self.job_title}"


# Common modelss for all apps
class Contact(models.Model):
    contact_id = models.CharField(max_length=10, default=generate_contact_id, primary_key=True)
    user_type = models.CharField(max_length=50, default="Non_register")
    user_id = models.CharField(max_length=20, default="NR00001")
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    reason = models.CharField(max_length=50)
    description = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)  # Automatically records submission time

    def __str__(self):
        return f"{self.name} ({self.reason})"


class ProjectsDisplay(models.Model):

    opportunityId = models.CharField(
        primary_key=True, max_length=12, default=generate_opportunity_id, editable=False
    )
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    budget = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    time_zone = models.CharField(max_length=50)
    start_date = models.DateField()
    project_type = models.CharField(max_length=50)
    currency = models.CharField(max_length=10, default="INR")
    description = models.TextField()
    deliverables = models.TextField()
    requirements = models.TextField()
    challenges = models.TextField()
    skills_required = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return f"Title: {self.title} with ID {self.opportunityId}"


# class ProjectStatusDetails(models.Model):
#     freelancer = models.ForeignKey(Freelancer, on_delete=models.CASCADE, related_name='project_status_set')
#     client = models.ForeignKey(Client, on_delete=models.CASCADE)
#     admin = models.CharField(max_length=20, default='AD001')
#     opportunity_id = models.CharField(max_length=15)
#     status = models.CharField(max_length=20, default='Not Started')
#     progress = models.CharField(default='0')
#     created_at = models.DateTimeField(default=now)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.status} ({self.progress} are the project details)"


class JobsPageAdv(models.Model):
    admin_id = models.CharField(blank=True, null=True)
    section_name = models.CharField(blank=True, null=True)
    media_type = models.CharField(blank=True, null=True)
    media_name = models.CharField(blank=True, null=True)
    media_url = models.URLField(blank=True, null=True)
    redirect_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Adv by {self.section_name} for {self.media_type}"

class WebAnnouncement(models.Model):
    admin_id = models.CharField(blank=True, null=True)
    media_type = models.CharField(blank=True, null=True)
    media_name = models.CharField(blank=True, null=True)
    media_url = models.URLField(blank=True, null=True)
    anc_text = models.CharField(max_length=225, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Adv by {self.admin_id} for {self.media_type}"


class JobsPageImages(models.Model):
    admin_id = models.CharField(blank=True, null=True)
    media_type = models.CharField(blank=True, null=True)
    media_name = models.CharField(blank=True, null=True)
    media_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Adv by {self.admin_id} for {self.media_type}"


class ProjectQuote(models.Model):
    projectQuoteId = models.CharField(
        primary_key=True, max_length=12, default=generate_projectquote_id, editable=False
    )
    freelancer = models.ForeignKey(Freelancer, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    admin_id = models.CharField(max_length=10, null=True, blank=True)
    opportunityId = models.CharField(max_length=20)
    budget = models.CharField(max_length=20)
    time_estimation = models.CharField(max_length=20)  # Days
    comments = models.CharField(max_length=512)
    admin_bid_status = models.CharField(max_length=20, default="Not confirmed yet")
    client_bid_status = models.CharField(max_length=20, default="Not confirmed yet")
    admin_margin = models.CharField(max_length=20, default="0")
    currency = models.CharField(max_length=10, default="INR")
    revised_budget = models.CharField(max_length=50, default="0")
    advance_payment = models.CharField(max_length=50, default="0")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Quote by {self.freelancer.name} for {self.opportunityId}"


class OngoingProjects(models.Model):
    ongProjectId = models.CharField(
        primary_key=True, max_length=12, default=generate_ongProject_id, editable=False
    )
    admin = models.ForeignKey(MyAdmin, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(Freelancer, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    opportunityId = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()
    bidId = models.CharField(max_length=20)
    status = models.CharField(max_length=30)
    progress = models.CharField(max_length=5, default='0')
    msg_comments = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class Milestones(models.Model):
    bid = models.ForeignKey(
        ProjectQuote, 
        on_delete=models.CASCADE, 
        related_name='milestones_model'  # Changed related_name to avoid conflict
    )
    date = models.DateField()
    amount = models.CharField(max_length=20, default="0")
    currency = models.CharField(max_length=10, default="INR")
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.date}, {self.status} ({self.amount} are the project details)"


class Tasks(models.Model):
    taskId = models.CharField(
        primary_key=True, max_length=8, default=generate_task_id, editable=False
    )
    taskBid = models.ForeignKey(
        ProjectQuote, 
        on_delete=models.CASCADE, 
        related_name='tasks_model'  # Changed related_name to avoid conflict
    )
    title = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default="Requirement Gathering")
    isChecked = models.BooleanField(default=False)
    comments = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}, {self.status} ({self.isChecked} are the task details)"

# OTP model
class OTP(models.Model):
    phone_number = models.CharField(max_length=15, unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return now() > self.created_at + datetime.timedelta(minutes=5)  # Expire in 5 minutes
