from fastapi import APIRouter, Depends
from pydantic import BaseModel

from services.interview_service import (
    generate_interview_questions
)

from models.interview_model import (
    SubmitAnswerRequest
)

from services.interview_service import (
    evaluate_answer
)

from services.auth_dependency import (
    get_current_user
)

from database.interview_repository import (
    get_interviews_by_user
)

router = APIRouter()

class InterviewRequest(BaseModel):
    resume_text: str
    job_description: str


@router.post("/generate-interview")
def generate_interview(data: InterviewRequest):

    return generate_interview_questions(
        data.resume_text,
        data.job_description
    )
    
@router.post("/evaluate-answer")
def evaluate_answer_api(
    data: SubmitAnswerRequest
):

    result = evaluate_answer(
        data.question,
        data.answer
    )

    from database.interview_repository import (
        save_answer
    )

    save_answer(
        data.session_id,
        data.question,
        data.answer,
        result["score"]
    )

    return result

@router.get("/my-interviews")
def my_interviews(
    current_user: str = Depends(
        get_current_user
    )
):

    return get_interviews_by_user(
        current_user
    )