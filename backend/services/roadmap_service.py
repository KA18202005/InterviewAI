from services.gemini_service import model
import json
from json_repair import repair_json


def generate_roadmap(weaknesses):

    prompt = f"""
    Create a 4-week learning roadmap.

    Weak Areas:
    {weaknesses}

    Return ONLY valid JSON.

    {{
      "roadmap":[
        {{
          "week":1,
          "topic":"",
          "resources":[]
        }}
      ]
    }}
    """

    response = model.generate_content(prompt)

    fixed_json = repair_json(response.text)

    return json.loads(fixed_json)