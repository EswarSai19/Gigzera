from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('jobs/', views.jobs, name='jobs'),
    path('aboutus/', views.aboutus, name='aboutus'),
    path('industries/', views.industries, name='industries'),
    path('findajob/', views.findajob, name='findajob'),
    path('postajob/', views.postajob, name='postajob'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('forgot/', views.forgot, name='forgot'),
    path('test/', views.test, name='test'),
    # path('test_forgotpass/', views.test_forgotpass, name='test_forgotpass'),
    path('resetpassword/', views.test_resetpass, name='test_resetpass'),
    path('submit_contact/', views.submit_contact, name='submit_contact'),

    # OTP
    path("send-otp-fl/", views.send_otp_fl, name="send_otp_fl"),
    path("verify-otp-fl/", views.verify_otp_fl, name="verify_otp_fl"),

    path("send-otp-cl/", views.send_otp_cl, name="send_otp_cl"),
    path("verify-otp-cl/", views.verify_otp_cl, name="verify_otp_cl"),

    path('submit_freelancer/', views.submit_freelancer, name='submit_freelancer'),
    path('submit_client/', views.submit_client, name='submit_client'),
    # path("logout/", views.logout_view, name="logout"),
]
