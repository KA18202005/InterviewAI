def generate_dashboard(
    interviews,
    resumes
):

    total_interviews = len(
        interviews
    )

    total_resumes = len(
        resumes
    )

    all_scores = []

    all_scores = []

    for interview in interviews:

        # Old format
        all_scores.extend(
            interview.get(
                "scores",
                []
            )
        )

        # New format
        answers = interview.get(
            "answers",
            []
        )

        for answer in answers:

            if isinstance(answer, dict):

                score = answer.get(
                    "score",
                    0
                )

                all_scores.append(
                    score
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

    latest_resume_score = 0

    if resumes:

        latest_resume = resumes[-1]

        latest_resume_score = (
            latest_resume
            .get(
                "analysis",
                {}
            )
            .get(
                "resume_score",
                0
            )
        )

    return {

        "total_interviews":
            total_interviews,

        "total_resumes":
            total_resumes,

        "average_score":
            round(
                avg_score,
                2
            ),

        "highest_score":
            highest_score,

        "lowest_score":
            lowest_score,

        "latest_resume_score":
            latest_resume_score
    }