from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index_mb'),
    path('jobs/', views.jobs, name='jobs_mb'),
    path('aboutus/', views.aboutus, name='aboutus_mb'),
    path('industries/', views.industries, name='industries_mb'),
    path('findajob/', views.findajob, name='findajob_mb'),
    path('postajob/', views.postajob, name='postajob_mb'),
    path('signup/', views.signup, name='signup_mb'),
    path('login/', views.login, name='login_mb'),
    path('forgot/', views.forgot, name='forgot_mb'),
    path('test/', views.test, name='test_mb'),
    # path('test_forgotpass/', views.test_forgotpass, name='test_forgotpass'),
    path('resetpassword/', views.test_resetpass, name='test_resetpass_mb'),
    path('submit_contact/', views.submit_contact, name='submit_contact_mb'),
    path('submit_freelancer/', views.submit_freelancer, name='submit_freelancer_mb'),
    path('submit_client/', views.submit_client, name='submit_client_mb'),
    # path("logout/", views.logout_view, name="logout"),
]
