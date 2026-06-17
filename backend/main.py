from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.resume import router as resume_router
from api.job import router as job_router
from api.interview import router as interview_router
from api.evaluation import router as evaluation_router
from api.roadmap import router as roadmap_router
from api.auth import router as auth_router
from api.interview_session import router as interview_session_router
from api.dashboard import router as dashboard_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(job_router)
app.include_router(interview_router)
app.include_router(evaluation_router)
app.include_router(roadmap_router)
app.include_router(auth_router)
app.include_router(interview_session_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {"message": "InterviewAI Running"}