import requests

def send_sms(phone_number, otp):
    base_url = "http://smsfortius.in/api/mt/SendSMS"

    params = {
        "user": "gigzerait",
        "password": "gigzerait@769",
        "senderid": "GIGZRA",
        "channel": "Trans",
        "DCS": 0,
        "flashsms": 0,
        "number": phone_number,
        "text": f"Your OTP to validate your mobile number on Gigzera is {otp}. For assistance please reach out at www.gigzera.com",
        "route": 14,
        "peid": "1301162075948418347",
        "DLTTemplateId": "1307174142990644245",
    }

    response = requests.get(base_url, params=params)
    return response.text
