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
def save_answer(
    session_id,
    question,
    answer,
    score
):

    db.interviews.update_one(
        {
            "_id": ObjectId(
                session_id
            )
        },
        {
            "$push": {
                "answers": {
                    "question": question,
                    "answer": answer,
                    "score": score
                },
                "scores": score
            }
        }
    )

def get_interviews_by_user(
    email
):

    interviews = list(
        db.interviews.find(
            {
                "user_email": email
            }
        )
    )

    for interview in interviews:

        interview["_id"] = str(
            interview["_id"]
        )

    return interviews