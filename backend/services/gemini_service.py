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
    Analyze the following resume.

    Return ONLY valid JSON.

    Output format:

    {{
        "resume_score": 0,

        "skills": [],

        "projects": [
            {{
                "name": "",
                "description": "",
                "technologies": []
            }}
        ],

        "strengths": [],

        "weaknesses": []
    }}

    Rules:

    1. Extract all technical skills.

    2. For every project include:
       - name
       - description
       - technologies

    3. Strengths must contain at least 5 points.

    4. Weaknesses must contain at least 3 points.
       Never leave weaknesses empty.

    5. Give a resume_score from 0-100.

    6. Return ONLY JSON.

    Resume:

    {resume_text}
    """

    response = model.generate_content(prompt)

    fixed_json = repair_json(
        response.text
    )

    return json.loads(
        fixed_json
    )