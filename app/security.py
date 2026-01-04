from bcrypt import gensalt, hashpw, checkpw

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
