import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def analyze_resume(resume_text):

    prompt = f"""
    Analyze this resume.

    Return:

    1. Skills
    2. Projects
    3. Strengths
    4. Weaknesses

    Resume:

    {resume_text}
    """

    response = model.generate_content(prompt)

    return response.text