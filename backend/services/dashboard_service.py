def generate_dashboard(interviews):

    total_interviews = len(interviews)

    all_scores = []

    for interview in interviews:

        all_scores.extend(
            interview.get(
                "scores",
                []
            )
        )

    avg_score = 0
    highest_score = 0
    lowest_score = 0

    if all_scores:

        avg_score = (
            sum(all_scores)
            /
            len(all_scores)
        )

        highest_score = max(
            all_scores
        )

        lowest_score = min(
            all_scores
        )

    return {

        "total_interviews":
            total_interviews,

        "average_score":
            round(avg_score, 2),

        "highest_score":
            highest_score,

        "lowest_score":
            lowest_score
    }