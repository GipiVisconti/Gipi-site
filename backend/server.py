from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class Subscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    birthday: str
    language: str = "IT"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SubscriberCreate(BaseModel):
    name: str
    email: EmailStr
    birthday: str
    language: str = "IT"

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    language: str = "IT"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    read: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    language: str = "IT"

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title_it: str
    title_en: str
    title_es: str
    excerpt_it: str
    excerpt_en: str
    excerpt_es: str
    content_it: str
    content_en: str
    content_es: str
    image_url: Optional[str] = None
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    title_it: str
    title_en: str
    title_es: str
    excerpt_it: str
    excerpt_en: str
    excerpt_es: str
    content_it: str
    content_en: str
    content_es: str
    image_url: Optional[str] = None
    published: bool = True

# Routes
@api_router.get("/")
async def root():
    return {"message": "Gipi Visconti API"}

# Subscribe Endpoints
@api_router.post("/subscribe", response_model=Subscriber)
async def create_subscriber(input: SubscriberCreate):
    subscriber_dict = input.model_dump()
    subscriber_obj = Subscriber(**subscriber_dict)
    
    doc = subscriber_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.subscribers.insert_one(doc)
    return subscriber_obj

@api_router.get("/subscribe", response_model=List[Subscriber])
async def get_subscribers():
    subscribers = await db.subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for sub in subscribers:
        if isinstance(sub['created_at'], str):
            sub['created_at'] = datetime.fromisoformat(sub['created_at'])
    return subscribers

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_messages.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for msg in messages:
        if isinstance(msg['created_at'], str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    return messages

# Blog Endpoints
@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    blog_dict = input.model_dump()
    blog_obj = BlogPost(**blog_dict)
    
    doc = blog_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.blog_posts.insert_one(doc)
    return blog_obj

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.blog_posts.find({"published": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for post in posts:
        if isinstance(post['created_at'], str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
    return posts

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if isinstance(post['created_at'], str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    return post

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
