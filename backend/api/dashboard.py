from fastapi import (
    APIRouter,
    Depends
)

from services.auth_dependency import (
    get_current_user
)

from database.interview_repository import (
    get_user_interviews
)

from services.dashboard_service import (
    generate_dashboard
)

from database.resume_repository import (
    get_resumes_by_user
)

router = APIRouter()

@router.get("/dashboard")
def dashboard(
    current_user: str = Depends(
        get_current_user
    )
):

    try:

        interviews = get_user_interviews(
            current_user
        )

        print("INTERVIEWS:", interviews)

        resumes = get_resumes_by_user(
            current_user
        )

        print("RESUMES:", resumes)

        result = generate_dashboard(
            interviews,
            resumes
        )

        print("DASHBOARD:", result)

        return result

    except Exception as e:

        print("ERROR:", str(e))

        raise e