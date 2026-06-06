def generate_report(interview):

    scores = interview.get(
        "scores",
        []
    )

    if not scores:

        return {
            "average_score": 0,
            "total_questions": 0
        }

    average_score = sum(scores) / len(scores)

    return {
        "average_score": round(
            average_score,
            2
        ),

        "total_questions": len(scores),

        "highest_score": max(scores),

        "lowest_score": min(scores)
    }