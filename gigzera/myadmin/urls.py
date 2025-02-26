from django.urls import path
from . import views

urlpatterns = [
    path('', views.ad_index, name='ad_index'),
    path('dashboard/', views.dashboard, name='ad_dashboard'),
    path('freelancers/', views.freelancers, name='ad_freelancers'),
    path('freelancers/<str:filter_type>/', views.freelancers, name='filtered_freelancers'),
    path('freelancerProfileView/', views.freelancerProfileView, name='ad_freelancerProfileView'),
    path('ban-user/', views.ban_user, name='ban_user'),
    path('verify-user/', views.verify_user, name='verify_user'),
    path('clients/', views.clients, name='ad_clients'),
    path('clients/<str:filter_type>/', views.clients, name='filtered_clients'),
    path('clientProfileView/', views.clientProfileView, name='ad_clientProfileView'),
    path('ongoingProjects/', views.ongoingProjects, name='ad_ongoingProjects'),
<<<<<<< HEAD
=======
    path('singleOngoingProject/', views.singleOngoingProject, name='ad_singleOngoingProject'),
    path('updateProgressStatus/', views.updateProgressStatus, name='ad_updateProgressStatus'),
    path('updateTimelines/', views.updateTimelines, name='ad_updateTimelines'),
    path('updateFinanceMilestones/', views.updateFinanceMilestones, name='ad_updateFinanceMilestones'),
    path("delete-milestone/", views.delete_milestone, name="delete-milestone"),
    path("add-milestone/", views.add_milestone, name="add_milestone"),
>>>>>>> 440389d889c488fe5f45c8f11cb30a4c54262362
    path('yourProjects/', views.yourProjects, name='ad_yourProjects'),
    path('singleYourProject/', views.singleYourProject, name='ad_singleYourProject'),
    path('userManagement/', views.userManagement, name='ad_userManagement'),
    path('latestProjectQuotes/', views.latestProjectQuotes, name='ad_latestProjectQuotes'),
    path('latestSinglePQ/', views.latestSinglePQ, name='ad_latestSinglePQ'),
    path('bidApproved/', views.bidApproved, name='ad_bidApproved'),
    path('bidRejected/', views.bidRejected, name='ad_bidRejected'),
    path('profileView/', views.profileView, name='ad_profileView'),
    path('jobPageAdv/', views.jobPageAdv, name='ad_jobPageAdv'),
    path('jobPageImages/', views.jobPageImages, name='ad_jobPageImages'),
    path('partnerLogos/', views.partnerLogos, name='ad_partnerLogos'),
<<<<<<< HEAD
=======
    path('adminManagement/', views.adminManagement, name='ad_adminManagement'),
    path('add_admin/', views.add_admin, name='ad_addAdmin'),
    path('edit_admin/', views.edit_admin, name='ad_editAdmin'),
    path('delete_admin/', views.delete_admin, name='ad_deleteAdmin'),
>>>>>>> 440389d889c488fe5f45c8f11cb30a4c54262362
    path('logout/', views.logout, name='ad_logout'),
]