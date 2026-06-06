from fastapi import APIRouter, Depends

from models.interview_model import (
    StartInterviewRequest
)

from services.auth_dependency import (
    get_current_user
)

from services.interview_service import (
    generate_interview_questions
)

from database.interview_repository import (
    create_interview_session
)

from models.interview_model import (
    SubmitAnswerRequest
)

from services.evaluation_service import (
    evaluate_answer
)

from database.interview_repository import (
    update_interview_session
)

from database.interview_repository import (
    get_interview_report
)

from services.report_service import (
    generate_report
)

router = APIRouter()

@router.post("/start-interview")
def start_interview(
    data: StartInterviewRequest,
    current_user: str = Depends(
        get_current_user
    )
):

    questions = generate_interview_questions(
        data.resume_text,
        data.job_description
    )

    session_id = create_interview_session({
        "user_email": current_user,
        "questions": questions,
        "answers": [],
        "scores": [],
        "status": "active"
    })

    return {
        "session_id": session_id,
        "questions": questions
    }

@router.post("/submit-answer")
def submit_answer(
    data: SubmitAnswerRequest,
    current_user: str = Depends(
        get_current_user
    )
):

    evaluation = evaluate_answer(
        data.question,
        data.answer
    )

    update_interview_session(
        data.session_id,
        {
            "answer": data.answer,
            "score": evaluation["score"]
        }
    )

    return evaluation

@router.get(
    "/interview-report/{session_id}"
)
def interview_report(
    session_id: str,
    current_user: str = Depends(
        get_current_user
    )
):

    interview = get_interview_report(
        session_id
    )

    return generate_report(
        interview
    )