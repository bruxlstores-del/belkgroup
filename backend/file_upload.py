import os
import shutil
from pathlib import Path
from fastapi import UploadFile
import uuid

# Directory to store uploaded images
UPLOADS_DIR = Path("/app/backend/uploads")
UPLOADS_DIR.mkdir(exist_ok=True)

# Static files will be served from this directory
STATIC_URL = "/uploads"

def save_upload_file(upload_file: UploadFile) -> str:
    """Save uploaded file and return the file path"""
    # Generate unique filename
    file_extension = upload_file.filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = UPLOADS_DIR / unique_filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    # Return URL path
    return f"{STATIC_URL}/{unique_filename}"

def delete_upload_file(file_url: str):
    """Delete uploaded file"""
    if file_url and file_url.startswith(STATIC_URL):
        filename = file_url.replace(STATIC_URL + "/", "")
        file_path = UPLOADS_DIR / filename
        if file_path.exists():
            file_path.unlink()