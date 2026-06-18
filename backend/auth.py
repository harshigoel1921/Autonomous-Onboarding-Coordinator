import bcrypt

from jose import jwt

from datetime import datetime, timedelta

SECRET_KEY = "AUTONOMOUS_ONBOARDING_SECRET"

ALGORITHM = "HS256"


def hash_password(password):

    salt = bcrypt.gensalt()

    hashed = bcrypt.hashpw(
        password.encode("utf-8"),
        salt
    )

    return hashed.decode("utf-8")


def verify_password(
    plain_password,
    hashed_password
):

    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )


def create_access_token(data: dict):

    expire = datetime.utcnow() + timedelta(hours=24)

    payload = data.copy()

    payload.update(
        {
            "exp": expire
        }
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )