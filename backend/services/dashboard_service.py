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

    for interview in interviews:

        # Old format support

        all_scores.extend(
            interview.get(
                "scores",
                []
            )
        )

        # New format support

        answers = interview.get(
            "answers",
            []
        )

        for answer in answers:

            if isinstance(
                answer,
                dict
            ):

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

    # =====================
    # Recent Activity
    # =====================

    recent_activity = []

    # Resume Activity

    for resume in resumes[-3:]:

        score = (
            resume
            .get(
                "analysis",
                {}
            )
            .get(
                "resume_score",
                0
            )
        )

        recent_activity.append(
            f"📄 Resume analyzed (ATS Score: {score})"
        )

    # Interview Activity

    for interview in interviews[-3:]:

        answers = interview.get(
            "answers",
            []
        )

        scores = []

        for answer in answers:

            if isinstance(
                answer,
                dict
            ):

                scores.append(
                    answer.get(
                        "score",
                        0
                    )
                )

        if scores:

            average = round(
                sum(scores)
                /
                len(scores),
                1
            )

            recent_activity.append(
                f"🎤 Interview completed (Avg Score: {average})"
            )

    recent_activity = recent_activity[-6:]
    recent_activity.reverse()

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
            latest_resume_score,

        "recent_activity":
            recent_activity
    }