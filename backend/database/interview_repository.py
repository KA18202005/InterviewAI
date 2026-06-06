from database.mongodb import db
from bson import ObjectId


def create_interview_session(data):

    result = db.interviews.insert_one(data)

    return str(result.inserted_id)


def get_interview_session(session_id):

    return db.interviews.find_one({
        "_id": ObjectId(session_id)
    })


def update_interview_session(
    session_id,
    answer_data
):

    db.interviews.update_one(
        {
            "_id": ObjectId(session_id)
        },
        {
            "$push": {
                "answers": answer_data["answer"],
                "scores": answer_data["score"]
            }
        }
    )
    
def get_interview_report(session_id):

    return db.interviews.find_one({
        "_id": ObjectId(session_id)
    })
    
def get_user_interviews(email):

    return list(
        db.interviews.find(
            {
                "user_email": email
            }
        )
    )