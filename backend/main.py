from fastapi import FastAPI
from api.resume import router as resume_router
from api.job import router as job_router

app = FastAPI()

app.include_router(job_router)
app.include_router(resume_router)

@app.get("/")
def home():
    return {"message": "InterviewAI Running"}