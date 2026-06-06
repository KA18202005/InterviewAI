from fastapi import APIRouter
from pydantic import BaseModel

from services.interview_service import (
    generate_interview_questions
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