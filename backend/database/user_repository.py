from database.mongodb import db

def create_user(user_data):
    result = db.users.insert_one(user_data)
    return str(result.inserted_id)

def get_user_by_email(email):
    return db.users.find_one({"email": email})