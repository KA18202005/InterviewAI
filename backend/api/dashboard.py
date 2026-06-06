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

router = APIRouter()

@router.get("/dashboard")
def dashboard(
    current_user: str = Depends(
        get_current_user
    )
):

    interviews = get_user_interviews(
        current_user
    )

    return generate_dashboard(
        interviews
    )