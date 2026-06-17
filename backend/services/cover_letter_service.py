from services.gemini_service import model


def generate_cover_letter(
    resume_text,
    job_description
):

    prompt = f"""
    Generate a professional cover letter.

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    Requirements:
    - Professional tone
    - 300-500 words
    - Highlight relevant skills
    - Explain why the candidate is suitable
    """

    response = model.generate_content(
        prompt
    )

    return {
        "cover_letter":
            response.text
    }