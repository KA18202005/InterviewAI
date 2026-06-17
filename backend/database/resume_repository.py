from database.mongodb import db

def save_resume(data):

    result = db.resumes.insert_one(data)

    print("Inserted ID:", result.inserted_id)

    return str(result.inserted_id)

def get_resumes():

    resumes = list(
        db.resumes.find({}, {"resume_text":0})
    )

    for resume in resumes:
        resume["_id"] = str(resume["_id"])

    return resumes

from database.mongodb import db

def save_resume(data):

    result = db.resumes.insert_one(data)

    print("Inserted ID:", result.inserted_id)

    return str(result.inserted_id)

def get_resumes():

    resumes = list(
        db.resumes.find({}, {"resume_text":0})
    )

    for resume in resumes:
        resume["_id"] = str(resume["_id"])

    return resumes

def get_resumes_by_user(email):

    resumes = list(
        db.resumes.find(
            {"user_email": email},
            {"resume_text": 0}
        )
    )

    for resume in resumes:
        resume["_id"] = str(resume["_id"])

    return resumes

def get_resumes_by_user(email):

    resumes = list(
        db.resumes.find(
            {
                "user_email": email
            }
        )
    )

    for resume in resumes:
        resume["_id"] = str(
            resume["_id"]
        )

    return resumes