from fastapi import (
    APIRouter,
    Depends
)

from services.auth_dependency import (
    get_current_user
)

from database.user_repository import (
    get_user_by_email
)

router = APIRouter()


@router.get("/me")
def get_me(
    current_user: str = Depends(
        get_current_user
    )
):

    user = get_user_by_email(
        current_user
    )

    return {
        "name": user["name"],
        "email": user["email"]
    }