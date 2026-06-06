from services.gemini_service import model
import json
from json_repair import repair_json

def evaluate_answer(question, answer):

    prompt = f"""
    Evaluate the answer.

    Return ONLY JSON.

    {{
      "score": 0,
      "strengths": [],
      "weaknesses": [],
      "improved_answer": ""
    }}

    Question:
    {question}

    Answer:
    {answer}
    """

    response = model.generate_content(prompt)

    fixed_json = repair_json(response.text)

    return json.loads(fixed_json)