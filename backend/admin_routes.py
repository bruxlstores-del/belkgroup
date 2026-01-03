from fastapi import APIRouter, HTTPException, Header, UploadFile, File
from typing import List, Optional
from models import (
    Service, ServiceCreate, ServiceUpdate,
    GalleryItem, GalleryItemCreate, GalleryItemUpdate,
    LoginRequest, LoginResponse, ContactForm
)
from auth import verify_token, create_access_token, verify_password, hash_password
from datetime import datetime
import base64
import uuid
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

router = APIRouter(prefix="/api/admin", tags=["admin"])

# These will be set by server.py
db = None

def set_db(database):
    global db
    db = database

# Admin credentials from environment
ADMIN_EMAIL = os.environ['ADMIN_EMAIL']
ADMIN_PASSWORD_HASH = hash_password(os.environ['ADMIN_PASSWORD'])

async def verify_admin_token(authorization: Optional[str] = Header(None)):
    """Verify admin token from Authorization header"""
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace('Bearer ', '')
    payload = verify_token(token)
    
    if not payload or payload.get('email') != ADMIN_EMAIL:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return payload

# ==================== AUTH ROUTES ====================

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """Admin login endpoint"""
    if request.email != ADMIN_EMAIL:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not verify_password(request.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"email": request.email, "role": "admin"})
    
    return LoginResponse(token=token, email=request.email)

@router.get("/verify")
async def verify_admin(authorization: Optional[str] = Header(None)):
    """Verify if token is valid"""
    await verify_admin_token(authorization)
    return {"valid": True, "email": ADMIN_EMAIL}

# ==================== SERVICE ROUTES ====================

@router.get("/services", response_model=List[Service])
async def get_services(authorization: Optional[str] = Header(None)):
    """Get all services"""
    await verify_admin_token(authorization)
    services = await db.services.find({}, {'_id': 0}).sort("order", 1).to_list(100)
    return [Service(**service) for service in services]

@router.post("/services", response_model=Service)
async def create_service(service: ServiceCreate, authorization: Optional[str] = Header(None)):
    """Create new service"""
    await verify_admin_token(authorization)
    
    service_dict = service.dict()
    service_obj = Service(**service_dict)
    
    await db.services.insert_one(service_obj.dict())
    return service_obj

@router.put("/services/{service_id}", response_model=Service)
async def update_service(service_id: str, service: ServiceUpdate, authorization: Optional[str] = Header(None)):
    """Update service"""
    await verify_admin_token(authorization)
    
    existing = await db.services.find_one({"id": service_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = {k: v for k, v in service.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.services.update_one({"id": service_id}, {"$set": update_data})
    
    updated = await db.services.find_one({"id": service_id})
    return Service(**updated)

@router.delete("/services/{service_id}")
async def delete_service(service_id: str, authorization: Optional[str] = Header(None)):
    """Delete service"""
    await verify_admin_token(authorization)
    
    result = await db.services.delete_one({"id": service_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    
    return {"message": "Service deleted successfully"}

# ==================== GALLERY ROUTES ====================

@router.get("/gallery", response_model=List[GalleryItem])
async def get_gallery(authorization: Optional[str] = Header(None)):
    """Get all gallery items"""
    await verify_admin_token(authorization)
    items = await db.gallery.find({}, {'_id': 0}).sort("created_at", -1).to_list(100)
    return [GalleryItem(**item) for item in items]

@router.post("/gallery", response_model=GalleryItem)
async def create_gallery_item(item: GalleryItemCreate, authorization: Optional[str] = Header(None)):
    """Create new gallery item"""
    await verify_admin_token(authorization)
    
    item_dict = item.dict()
    gallery_obj = GalleryItem(**item_dict)
    
    await db.gallery.insert_one(gallery_obj.dict())
    return gallery_obj

@router.put("/gallery/{item_id}", response_model=GalleryItem)
async def update_gallery_item(item_id: str, item: GalleryItemUpdate, authorization: Optional[str] = Header(None)):
    """Update gallery item"""
    await verify_admin_token(authorization)
    
    existing = await db.gallery.find_one({"id": item_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    
    update_data = {k: v for k, v in item.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.gallery.update_one({"id": item_id}, {"$set": update_data})
    
    updated = await db.gallery.find_one({"id": item_id})
    return GalleryItem(**updated)

@router.delete("/gallery/{item_id}")
async def delete_gallery_item(item_id: str, authorization: Optional[str] = Header(None)):
    """Delete gallery item"""
    await verify_admin_token(authorization)
    
    result = await db.gallery.delete_one({"id": item_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    
    return {"message": "Gallery item deleted successfully"}

# ==================== CONTACT FORMS ====================

@router.get("/contacts", response_model=List[ContactForm])
async def get_contacts(authorization: Optional[str] = Header(None)):
    """Get all contact form submissions"""
    await verify_admin_token(authorization)
    contacts = await db.contacts.find({}, {'_id': 0}).sort("created_at", -1).to_list(100)
    return [ContactForm(**contact) for contact in contacts]

@router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str, authorization: Optional[str] = Header(None)):
    """Delete contact form submission"""
    await verify_admin_token(authorization)
    
    result = await db.contacts.delete_one({"id": contact_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return {"message": "Contact deleted successfully"}

# ==================== IMAGE UPLOAD ====================

@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...), authorization: Optional[str] = Header(None)):
    """Upload image and return URL"""
    await verify_admin_token(authorization)
    
    from file_upload import save_upload_file
    
    try:
        # Save file and get URL
        file_url = save_upload_file(file)
        return {"url": file_url, "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")