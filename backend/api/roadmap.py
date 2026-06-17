from fastapi import APIRouter

from models.roadmap_model import (
    RoadmapRequest
)

from services.roadmap_service import (
    generate_learning_roadmap
)

router = APIRouter()


@router.post("/generate-roadmap")
def roadmap(
    data: RoadmapRequest
):

    return generate_learning_roadmap(
        data.resume_text,
        data.target_role
    )