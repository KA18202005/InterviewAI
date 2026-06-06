from fastapi import APIRouter
from pydantic import BaseModel

from services.evaluation_service import evaluate_answer

router = APIRouter()


class EvaluationRequest(BaseModel):
    question: str
    answer: str


@router.post("/evaluate-answer")
def evaluate(data: EvaluationRequest):

    result = evaluate_answer(
        data.question,
        data.answer
    )

    return result