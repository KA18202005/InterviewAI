from fastapi import APIRouter
from pydantic import BaseModel

from services.roadmap_service import generate_roadmap

router = APIRouter()

class RoadmapRequest(BaseModel):
    weaknesses: list[str]

@router.post("/generate-roadmap")
def roadmap(data: RoadmapRequest):

    return generate_roadmap(
        data.weaknesses
    )