from bcrypt import gensalt, hashpw, checkpw
from dotenv import load_dotenv

import jwt
import os


load_dotenv()

salt = gensalt()


def generate_hash(password: str) -> str:
    password_bytes = password.encode("utf-8")

    return hashpw(password_bytes, salt)


def verify_hash(password: str, password_hash: str) -> bool:
    password_bytes = [password.encode("utf-8"), password_hash.encode("utf-8")]
    return checkpw(
        password_bytes[0],
        password_bytes[1],
    )


secret_key = os.getenv("SECRET_KEY")


def generate_token(payload):
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token


def decode_token(token):
    token = jwt.decode(token, secret_key, algorithms=["HS256"])
    return token
