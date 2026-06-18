from io import BytesIO

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def generate_interview_pdf(
    question,
    answer,
    evaluation
):

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer
    )

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "InterviewAI Report",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(
            1,
            20
        )
    )

    elements.append(
        Paragraph(
            f"<b>Question:</b><br/>{question}",
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(
            1,
            10
        )
    )

    elements.append(
        Paragraph(
            f"<b>Answer:</b><br/>{answer}",
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(
            1,
            10
        )
    )

    elements.append(
        Paragraph(
            f"<b>Score:</b> {evaluation['score']}/100",
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(
            1,
            10
        )
    )

    elements.append(
        Paragraph(
            "<b>Strengths</b>",
            styles["Heading2"]
        )
    )

    for item in evaluation.get(
        "strengths",
        []
    ):

        elements.append(
            Paragraph(
                f"• {item}",
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(
            1,
            10
        )
    )

    elements.append(
        Paragraph(
            "<b>Improvements</b>",
            styles["Heading2"]
        )
    )

    for item in evaluation.get(
        "improvements",
        []
    ):

        elements.append(
            Paragraph(
                f"• {item}",
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(
            1,
            10
        )
    )

    elements.append(
        Paragraph(
            "<b>Feedback</b>",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            evaluation.get(
                "feedback",
                ""
            ),
            styles["BodyText"]
        )
    )

    doc.build(
        elements
    )

    buffer.seek(
        0
    )

    return buffer