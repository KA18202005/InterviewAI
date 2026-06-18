from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from pydantic import BaseModel

from services.pdf_service import (
    generate_interview_pdf
)

router = APIRouter()


class PDFRequest(
    BaseModel
):

    question: str

    answer: str

    evaluation: dict


@router.post(
    "/download-report"
)
def download_report(
    data: PDFRequest
):

    pdf = generate_interview_pdf(

        data.question,

        data.answer,

        data.evaluation

    )

    return StreamingResponse(

        pdf,

        media_type=
        "application/pdf",

        headers={

            "Content-Disposition":
            "attachment; filename=Interview_Report.pdf"

        }

    )