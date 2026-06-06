import json
from services.gemini_service import model

def match_resume_with_jd(
    resume_text,
    job_description
):

    prompt = f"""
    Compare the resume with the job description.

    IMPORTANT:
    Return ONLY valid JSON.
    Do not return markdown.
    Do not return explanation.
    Do not return text outside JSON.

    Format:

    {{
        "match_score": 0,
        "matching_skills": [],
        "missing_skills": [],
        "suggestions": []
    }}

    Resume:
    {resume_text}

    Job Description:
    {job_description}
    """

    response = model.generate_content(
        prompt,
        generation_config={
            "response_mime_type": "application/json"
        }
    )

    try:
        return json.loads(response.text)

    except Exception:

        return {
            "raw_response": response.text
        }