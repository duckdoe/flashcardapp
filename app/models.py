import psycopg2 as pg
import os
from dotenv import load_dotenv

load_dotenv()


def conn():
    db_url = os.getenv("DATABASE_URL")
    return pg.connect(db_url)


def create_tables():
    with conn() as c:
        cur = c.cursor()
        cur.execute("""
            create table if not exists users(
                id uuid primary key default gen_random_uuid(),
                email varcahr(255) not null,
                password text not null,
                created_at timestamp default now()
            );
                    
            create table if not exists card_group(
                id uuid primary key default gen_random_uuid(),
                user_id uuid references users(id) on delete cascade,
                title VARCHAR(50) not null,
                color varcahr(15) not null,
                created_at timestamp default now()
            );
                    
            create table if not exists cards(
                id uuid primary key default gen_random_uuid(),
                card_group_id uuid references card_group(id) on delete cascade,
                question text not null,
                answer text not null,
                created_at timestamp default now()
            );                    
""")
        c.commit()


def select_user(id):
    with conn() as c:
        cur = c.cursor()
        cur.execute("""select * from users where id=%s""", id)
        user = cur.fetchone()

    if not user:
        return user

    id, email, password, created_at = user
    return {
        "id": id,
        "email": email,
        "password": password,
        "created_at": created_at,
    }


def select_user_by_email(email):
    with conn() as c:
        cur = c.cursor()
        cur.execute("""select * from users where email=%s""", email)
        user = cur.fetchone()

    if not user:
        return user

    id, email, password, created_at = user
    return {
        "id": id,
        "email": email,
        "password": password,
        "created_at": created_at,
    }


def select_card_groups_by_user_id(id):
    with conn() as c:
        cur = c.cursor()
        cur.execute("select * from card_group where user_id=%s", id)
        cards = cur.fetchone()

    if not cards:
        return cards

    card_list = []

    for card in cards:
        id, user_id, title, color, created_at = card
        card_list.append(
            {
                "id": id,
                "user_id": user_id,
                "title": title,
                "color": color,
                "created_at": created_at,
            }
        )

    return card_list


def select_card_by_card_group_id(id):
    with conn() as c:
        cur = c.cursor()
        cur.execute("select from cards where card_group_id=%s", id)
        cards = cur.fetchone()

    if not cards:
        return cards

    card_list = []
    for card in cards:
        id, card_group_id, question, answer, created_at = card
        card_list.append(
            {
                "id": id,
                "card_group_id": card_group_id,
                "question": question,
                "answer": answer,
                "created_at": created_at,
            }
        )

    return card_list


def insert_into_users(username, email, password):
    with conn() as c:
        cur = c.cursor()
        cur.execute(
            "insert into users(username, email, password) values(%s, %s, %s)",
            username,
            email,
            password,
        )
        c.commit()


def insert_into_card_group(user_id, title, color):
    with conn() as c:
        cur = c.cursor()
        cur.execute(
            "insert into card_group(user_id, title, color) values(%s, %s, %s)",
            user_id,
            title,
            color,
        )
        c.commit()

    return select_card_groups_by_user_id(user_id)


def insert_into_cards(card_group_id, question, answer):
    with conn() as c:
        cur = c.cursor()
        cur.execute(
            "insert into card_group(user_id, title, color) values(%s, %s, %s)",
            card_group_id,
            question,
            answer,
        )
        c.commit()

    return select_card_by_card_group_id(card_group_id)
