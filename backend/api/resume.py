from fastapi import APIRouter, UploadFile, File
import os
from services.resume_service import extract_text_from_pdf
from services.gemini_service import analyze_resume

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
async def analyze_resume_api(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_text_from_pdf(file_path)

    analysis = analyze_resume(text)

    return {
        "analysis": analysis
    }