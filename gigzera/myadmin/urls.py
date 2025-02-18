from django.urls import path
from . import views

urlpatterns = [
    path('', views.ad_index, name='ad_index'),
    path('dashboard/', views.dashboard, name='ad_dashboard'),
    path('freelancers/', views.freelancers, name='ad_freelancers'),
    path('freelancerProfileView/', views.freelancerProfileView, name='ad_freelancerProfileView'),
    path('clients/', views.clients, name='ad_clients'),
    path('clientProfileView/', views.clientProfileView, name='ad_clientProfileView'),
    path('ongoingProjects/', views.ongoingProjects, name='ad_ongoingProjects'),
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
    path('logout/', views.logout, name='ad_logout'),
]