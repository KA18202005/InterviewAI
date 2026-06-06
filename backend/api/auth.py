from fastapi import APIRouter, HTTPException

from models.user_model import UserSignup

from services.auth_service import (
    hash_password
)

from database.user_repository import (
    create_user,
    get_user_by_email
)

from models.user_model import (
    UserSignup,
    UserLogin
)

from services.auth_service import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


@router.post("/signup")
def signup(user: UserSignup):

    existing_user = get_user_by_email(
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = hash_password(
        user.password
    )

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }

    user_id = create_user(user_data)

    return {
        "message": "User created successfully",
        "user_id": user_id
    }
    
@router.post("/login")
def login(user: UserLogin):

    existing_user = get_user_by_email(
        user.email
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    valid_password = verify_password(
        user.password,
        existing_user["password"]
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    token = create_access_token({
        "sub": existing_user["email"]
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }