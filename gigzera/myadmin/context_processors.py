from db_schemas.models import MyAdmin  # Import your MyAdmin model

def user_role_processor(request):
    user_role = None  # Default value

    # Check if the user is logged in (session contains 'user_id')
    user_id = request.session.get("user_id")  

    if user_id:
        admin = MyAdmin.objects.filter(adminId=user_id).first()
        if admin:
            user_role = admin.user_role  # Fetch user_role from MyAdmin model

    return {"user_role": user_role}
