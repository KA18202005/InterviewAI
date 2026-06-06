from services.gemini_service import model
import json
from json_repair import repair_json

def generate_interview_questions(
    resume_text,
    job_description
):

    prompt = f"""
    Based on the resume and job description,
    generate interview questions.

    Return ONLY valid JSON.

    {{
      "technical_questions": [],
      "behavioral_questions": [],
      "project_questions": []
    }}

    Resume:
    {resume_text}

    Job Description:
    {job_description}
    """

    response = model.generate_content(prompt)

    fixed_json = repair_json(response.text)

    return json.loads(fixed_json)