from django.urls import path
from . import views

urlpatterns = [
    # path('', views.ad_index, name='ad_index'),
    path('', views.ad_login, name='ad_login'),
    path('logout/', views.ad_logout, name='ad_logout'),
    path('forgot/', views.ad_forgot, name='ad_forgot'),
    path('dashboard/', views.dashboard, name='ad_dashboard'),
    path('sadashboard/', views.superAdminDashboard, name='sup_ad_dashboard'),
    path('freelancers/', views.freelancers, name='ad_freelancers'),
    path('freelancers/<str:filter_type>/', views.freelancers, name='filtered_freelancers'),
    path('freelancerProfileView/', views.freelancerProfileView, name='ad_freelancerProfileView'),
    path('ban-user/', views.ban_user, name='ban_user'),
    path('verify-user/', views.verify_user, name='verify_user'),
    path('clients/', views.clients, name='ad_clients'),
    path('clients/<str:filter_type>/', views.clients, name='filtered_clients'),
    path('clientProfileView/', views.clientProfileView, name='ad_clientProfileView'),

    # Ongoing projects
    path('ongoingProjects/', views.ongoingProjects, name='ad_ongoingProjects'),
    path('singleOngoingProject/', views.singleOngoingProject, name='ad_singleOngoingProject'),
    path('saSingleOGProject/', views.saSingleOGProject, name='sup_ad_singleOGProject'),

    # updates on projects
    path('updateProgressStatus/', views.updateProgressStatus, name='ad_updateProgressStatus'),
    path('updateTimelines/', views.updateTimelines, name='ad_updateTimelines'),
    path('updateFinanceMilestones/', views.updateFinanceMilestones, name='ad_updateFinanceMilestones'),
    path("delete-milestone/", views.delete_milestone, name="delete-milestone"),
    path("add-milestone/", views.add_milestone, name="add_milestone"),


    path('yourProjects/', views.yourProjects, name='ad_yourProjects'),
    path('singleYourProject/', views.singleYourProject, name='ad_singleYourProject'),
    path('userManagement/', views.userManagement, name='ad_userManagement'),
    path('latestProjectQuotes/', views.latestProjectQuotes, name='ad_latestProjectQuotes'),
    path('latestSinglePQ/', views.latestSinglePQ, name='ad_latestSinglePQ'),
    path('bidApproved/', views.bidApproved, name='ad_bidApproved'),
    path('bidRejected/', views.bidRejected, name='ad_bidRejected'),
    path('profileView/', views.profileView, name='ad_profileView'),

    # Jobs page images
    path('jobsPageImages/', views.jobsPageImages, name='ad_jobsPageImages'),
    path('addJobsPageImages/', views.addJobsPageImages, name='ad_addJobsPageImages'),
    path('removeJobsPageImages/', views.removeJobsPageImages, name='ad_removeJobsPageImages'),
    # Logos
    path('partnerLogos/', views.partnerLogos, name='ad_partnerLogos'),
    path('addPartnerLogo/', views.addPartnerLogo, name='ad_addPartnerLogo'),
    path('editPartnerLogo/', views.editPartnerLogo, name='ad_editPartnerLogo'),
    path('removePartnerLogo/', views.removePartnerLogo, name='ad_removePartnerLogo'),
    # Admin management
    path('adminManagement/', views.adminManagement, name='ad_adminManagement'),
    path('add_admin/', views.add_admin, name='ad_addAdmin'),
    path('edit_admin/', views.edit_admin, name='ad_editAdmin'),
    path('delete_admin/', views.delete_admin, name='ad_deleteAdmin'),
    path('logout/', views.logout, name='ad_logout'),

    # Jobs page adv
    path('jobsPageAdv/', views.jobsPageAdv, name='ad_jobsPageAdv'),
    path('addJobsPageAdv/', views.addJobsPageAdv, name='ad_addJobsPageAdv'),
    path('editJobsPageAdv/', views.editJobsPageAdv, name='ad_editJobsPageAdv'),
    path('removeJobsPageAdv/', views.removeJobsPageAdv, name='ad_removeJobsPageAdv'),

    # web announcement
    path('webAnnounce/', views.webAnnounce, name='ad_webAnnounce'),

     # Messages
    path('sendMessage/', views.ad_sendMessage, name='ad_sendMessage'),
    path('get-comments/', views.get_task_comments, name='get_task_comments'),

    path('sendMsgMessage/', views.ad_sendMsgMessage, name='ad_sendMsgMessage'),


]