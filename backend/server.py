from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import ContactFormCreate, ContactForm
import uuid
from datetime import datetime

# Import admin routes
from admin_routes import router as admin_router

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

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact")
async def create_contact(contact: ContactFormCreate):
    """Create contact form submission"""
    contact_dict = contact.dict()
    contact_obj = ContactForm(**contact_dict)
    await db.contacts.insert_one(contact_obj.dict())
    return {"message": "Contact form submitted successfully", "id": contact_obj.id}

@api_router.get("/services")
async def get_services():
    """Get all services for public"""
    services = await db.services.find().sort("order", 1).to_list(100)
    return services

@api_router.get("/gallery")
async def get_gallery():
    """Get all gallery items for public"""
    items = await db.gallery.find().to_list(100)
    return items

# Include the routers in the main app
app.include_router(api_router)
app.include_router(admin_router)

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