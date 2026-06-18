import json

from services.gemini_service import model

from services.job_match_ml import (
    calculate_match_score
)


def match_resume_with_jd(
    resume_text,
    job_description
):

    ml_score = calculate_match_score(
        resume_text,
        job_description
    )

    prompt = f"""
    Compare the resume with the job description.

    IMPORTANT:

    Return ONLY valid JSON.

    Do not return markdown.
    Do not return explanation.
    Do not return text outside JSON.

    Format:

    {{
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
            "response_mime_type":
            "application/json"
        }
    )

    try:

        gemini_result = json.loads(
            response.text
        )

        return {

            "match_score":
                ml_score,

            "matching_skills":
                gemini_result.get(
                    "matching_skills",
                    []
                ),

            "missing_skills":
                gemini_result.get(
                    "missing_skills",
                    []
                ),

            "suggestions":
                gemini_result.get(
                    "suggestions",
                    []
                )

        }

    except Exception:

        return {

            "match_score":
                ml_score,

            "matching_skills":
                [],

            "missing_skills":
                [],

            "suggestions":
                [],

            "raw_response":
                response.text

        }