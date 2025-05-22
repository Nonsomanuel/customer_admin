import firebase_admin
from firebase_admin import credentials, firestore
from twilio.rest import Client
import os
from dotenv import load_dotenv

# Load Twilio environment variables from .env in your backend folder
load_dotenv()

# Firebase Admin setup
cred = credentials.Certificate('service-account.json')  # relative path if running inside backend folder
firebase_admin.initialize_app(cred)
db = firestore.client()

# Twilio setup
account_sid = os.getenv("TWILIO_SID")
auth_token = os.getenv("TWILIO_AUTH")
twilio_whatsapp = os.getenv("TWILIO_WHATSAPP")
client = Client(account_sid, auth_token)

def send_whatsapp(to, message):
    message = client.messages.create(
        from_=twilio_whatsapp,
        body=message,
        to=f'whatsapp:{to}'
    )
    print(f"✅ Message sent to {to}: {message.sid}")

def fetch_customers_and_send_reminders():
    customers_ref = db.collection('customers')
    docs = customers_ref.stream()

    for doc in docs:
        customer = doc.to_dict()
        phone = customer.get('phone')
        product = customer.get('product')
        amount = customer.get('amount')
        due_date = customer.get('dueDate')
        # Add your reminder logic here (check due_date etc)

        # Example message
        msg = f"Reminder: Your payment of ₦{amount} for {product} is due soon."
        send_whatsapp(phone, msg)

if __name__ == "__main__":
    fetch_customers_and_send_reminders()
