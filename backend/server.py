from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
import json
import urllib.request
import urllib.error

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()
api_router = APIRouter(prefix="/api")


class SubscriberCreate(BaseModel):
    name: str
    email: EmailStr
    birthday: str
    language: str = "IT"


@api_router.get("/")
async def root():
    return {"message": "Gipi Visconti API"}


def get_brevo_config(language: str):
    lang = (language or "IT").upper()

    config = {
        "IT": {
            "list_id": os.environ.get("BREVO_LIST_IT"),
            "template_id": os.environ.get("BREVO_TEMPLATE_IT"),
        },
        "EN": {
            "list_id": os.environ.get("BREVO_LIST_EN"),
            "template_id": os.environ.get("BREVO_TEMPLATE_EN"),
        },
        "ES": {
            "list_id": os.environ.get("BREVO_LIST_ES"),
            "template_id": os.environ.get("BREVO_TEMPLATE_ES"),
        },
    }

    return config.get(lang, config["IT"])


def brevo_request(endpoint: str, payload: dict):
    api_key = os.environ.get("BREVO_API_KEY")

    if not api_key:
        raise HTTPException(status_code=500, detail="BREVO_API_KEY missing")

    data = json.dumps(payload).encode("utf-8")

    request = urllib.request.Request(
        f"https://api.brevo.com/v3{endpoint}",
        data=data,
        headers={
            "accept": "application/json",
            "api-key": api_key,
            "content-type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            response_body = response.read().decode("utf-8")
            return json.loads(response_body) if response_body else {}

    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        logger.error(f"Brevo error: {error_body}")
        raise HTTPException(status_code=500, detail="Brevo API error")

    except Exception as e:
        logger.error(f"Brevo connection error: {str(e)}")
        raise HTTPException(status_code=500, detail="Brevo connection error")


def save_contact_to_brevo(input: SubscriberCreate):
    brevo_config = get_brevo_config(input.language)

    if not brevo_config["list_id"]:
        raise HTTPException(status_code=500, detail="Brevo list ID missing")

    payload = {
        "email": input.email,
        "attributes": {
            "FNAME": input.name,
            "BIRTHDAY": input.birthday,
            "LANGUAGE": input.language,
        },
        "listIds": [int(brevo_config["list_id"])],
        "updateEnabled": True,
    }

    return brevo_request("/contacts", payload)


def send_brevo_email(input: SubscriberCreate):
    brevo_config = get_brevo_config(input.language)

    if not brevo_config["template_id"]:
        raise HTTPException(status_code=500, detail="Brevo template ID missing")

    payload = {
        "templateId": int(brevo_config["template_id"]),
        "to": [
            {
                "email": input.email,
                "name": input.name,
            }
        ],
        "params": {
            "name": input.name,
            "birthday": input.birthday,
            "language": input.language,
        },
    }

    return brevo_request("/smtp/email", payload)


@api_router.post("/subscribe")
async def create_subscriber(input: SubscriberCreate):
    save_contact_to_brevo(input)
    send_brevo_email(input)

    return {
        "success": True,
        "message": "Subscriber registered and email sent"
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)