from fastapi import APIRouter, UploadFile, File, Depends
import os
from services.resume_service import extract_text_from_pdf
from services.gemini_service import analyze_resume
from database.resume_repository import get_resumes
from services.auth_dependency import get_current_user
from database.resume_repository import (
    get_resumes_by_user
)


router = APIRouter()

UPLOAD_DIR = "uploads"

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_text_from_pdf(file_path)

    return {
        "filename": file.filename,
        "characters": len(text),
        "preview": text[:1000]
    }
    
    
@router.post("/analyze-resume")
async def analyze_resume_api(
    file: UploadFile = File(...),
    current_user: str = Depends(get_current_user)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_text_from_pdf(file_path)

    analysis = analyze_resume(text)
    from database.resume_repository import save_resume
    resume_id = save_resume({
        "user_email": current_user,
        "filename": file.filename,
        "resume_text": text,
        "analysis": analysis
    })

    return {
        "resume_id": resume_id,
        "analysis": analysis
    }
 
    
@router.get("/resumes")
def get_all_resumes():

    return get_resumes()


@router.get("/my-resumes")
def my_resumes(
    current_user: str = Depends(
        get_current_user
    )
):

    return get_resumes_by_user(
        current_user
    )