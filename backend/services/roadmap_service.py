from services.gemini_service import model
import json
from json_repair import repair_json


def generate_learning_roadmap(
    resume_text,
    target_role
):

    prompt = f"""
    Create a personalized learning roadmap.

    Resume:
    {resume_text}

    Target Role:
    {target_role}

    Return ONLY valid JSON.

    {{
      "week_1": [],
      "week_2": [],
      "week_3": [],
      "week_4": []
    }}

    Each week should contain:
    - skills to learn
    - projects to build
    - resources/topics to study
    """

    response = model.generate_content(
        prompt
    )

    fixed_json = repair_json(
        response.text
    )

    return json.loads(
        fixed_json
    )