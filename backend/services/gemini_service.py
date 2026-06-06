import os
from dotenv import load_dotenv
import google.generativeai as genai
import json
from json_repair import repair_json

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def analyze_resume(resume_text):

    prompt = f"""
    Analyze the resume and return ONLY valid JSON.

    {{
        "skills": [],
        "projects": [],
        "strengths": [],
        "weaknesses": []
    }}

    Resume:
    {resume_text}
    """

    response = model.generate_content(prompt)

    fixed_json = repair_json(response.text)

    return json.loads(fixed_json)