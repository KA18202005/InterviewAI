from pydantic import BaseModel


class StartInterviewRequest(BaseModel):
    resume_text: str
    job_description: str
    
    
class SubmitAnswerRequest(BaseModel):
    session_id: str
    question: str
    answer: str