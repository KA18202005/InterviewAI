from pydantic import BaseModel


class RoadmapRequest(BaseModel):

    resume_text: str

    target_role: str