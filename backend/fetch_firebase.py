# fetch_firebase.py
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore
from send_whatsapp import send_whatsapp  # same folder import

if not firebase_admin._apps:
    cred = credentials.Certificate("service-account.json")
    firebase_admin.initialize_app(cred)
db = firestore.client()

def send_due_reminders():
    today = datetime.utcnow().date()
    customers_ref = db.collection("customers")
    docs = customers_ref.stream()

    for doc in docs:
        data = doc.to_dict()
        due_date = data.get("dueDate")
        if not due_date:
            continue

        # Convert Firestore Timestamp to datetime.date
        due_date = due_date.date()
        if due_date <= today and data.get("status") == "pending":
            phone = data["phone"]
            name = data["name"]
            product = data["product"]
            amount = data["amount"]
            msg = f"Hi {name}, reminder: you owe ₦{amount} for {product}. Due: {due_date}. Kindly pay."

            send_whatsapp(phone, msg)

if __name__ == "__main__":
    send_due_reminders()
