from fastapi import APIRouter

from models.cover_letter_model import (
    CoverLetterRequest
)

from services.cover_letter_service import (
    generate_cover_letter
)

router = APIRouter()


@router.post(
    "/generate-cover-letter"
)
def cover_letter(
    data: CoverLetterRequest
):

    return generate_cover_letter(
        data.resume_text,
        data.job_description
    )