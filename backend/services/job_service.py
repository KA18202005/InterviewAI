from services.gemini_service import model


def match_resume_with_jd(
    resume_text,
    job_description
):

    prompt = f"""
    Compare the resume with the job description.

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    Return:

    1. Match Score (0-100)
    2. Matching Skills
    3. Missing Skills
    4. Suggestions
    """

    response = model.generate_content(
        prompt
    )

    return {
        "analysis": response.text
    }