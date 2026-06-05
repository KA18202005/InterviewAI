from fastapi import APIRouter
from pydantic import BaseModel
from services.job_service import match_resume_with_jd

router = APIRouter()


class JobMatchRequest(BaseModel):
    resume_text: str
    job_description: str


@router.post("/match-job")
def match_job(data: JobMatchRequest):

    result = match_resume_with_jd(
        data.resume_text,
        data.job_description
    )

    return result