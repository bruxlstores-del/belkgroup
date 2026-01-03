import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Services with working image URLs
services_data = [
    {
        "id": str(uuid.uuid4()),
        "title": "Débarras d'encombrants",
        "description": "Nous enlevons rapidement tous vos objets encombrants : meubles, électroménagers, matelas, cartons. Service complet avec tri et évacuation professionnelle.",
        "image": "https://images.pexels.com/photos/4246196/pexels-photo-4246196.jpeg?auto=compress&cs=tinysrgb&w=800",
        "order": 1,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Vide maison complet",
        "description": "Succession, déménagement ou rénovation ? Nous vidons entièrement votre maison ou appartement avec soin et efficacité. Prise en charge totale de A à Z.",
        "image": "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=800",
        "order": 2,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Vide cave et grenier",
        "description": "Libérez vos caves, greniers et garages encombrés. Notre équipe accède aux espaces difficiles et évacue tous vos encombrants en toute sécurité.",
        "image": "https://images.pexels.com/photos/5025636/pexels-photo-5025636.jpeg?auto=compress&cs=tinysrgb&w=800",
        "order": 3,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Débarras de bureau",
        "description": "Fermeture, déménagement ou réorganisation de bureaux ? Nous nous occupons du débarras professionnel de vos locaux commerciaux et administratifs.",
        "image": "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=800",
        "order": 4,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

# Gallery items with the user's provided images
gallery_data = [
    {
        "id": str(uuid.uuid4()),
        "title": "Débarras hangar complet",
        "description": "Avant/Après - Hangar vidé entièrement",
        "category": "before-after",
        "image": "https://customer-assets.emergentagent.com/job_debarras-maison-1/artifacts/f6qezot8_AA3.webp",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Débarras garage",
        "description": "Avant/Après - Garage débarrassé",
        "category": "before-after",
        "image": "https://customer-assets.emergentagent.com/job_debarras-maison-1/artifacts/w82wr8bb_13.jpg",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Débarras atelier",
        "description": "Avant/Après - Atelier entièrement vidé",
        "category": "before-after",
        "image": "https://customer-assets.emergentagent.com/job_debarras-maison-1/artifacts/ki46kgfw_debarras-garage-pessac.webp",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Vide appartement",
        "description": "Avant/Après - Appartement vidé et nettoyé",
        "category": "before-after",
        "image": "https://customer-assets.emergentagent.com/job_debarras-maison-1/artifacts/amfvggpz_debarras-pessac.webp",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Vide maison",
        "description": "Avant/Après - Maison complètement vidée",
        "category": "before-after",
        "image": "https://customer-assets.emergentagent.com/job_debarras-maison-1/artifacts/2bahhtus_avant-apres-1024x801.jpg",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

async def init_data():
    print("Initializing data in database...")
    
    # Clear existing services
    await db.services.delete_many({})
    print("Cleared existing services")
    
    # Insert new services
    result = await db.services.insert_many(services_data)
    print(f"Inserted {len(result.inserted_ids)} services")
    
    # Clear existing gallery items
    await db.gallery.delete_many({})
    print("Cleared existing gallery items")
    
    # Insert new gallery items
    result = await db.gallery.insert_many(gallery_data)
    print(f"Inserted {len(result.inserted_ids)} gallery items")
    
    # Verify services
    services = await db.services.find().to_list(100)
    print(f"\nServices in database:")
    for service in services:
        print(f"  - {service['title']} ({service['image'][:50]}...)")
    
    # Verify gallery
    gallery = await db.gallery.find().to_list(100)
    print(f"\nGallery items in database:")
    for item in gallery:
        print(f"  - {item['title']} ({item['category']})")
    
    print("\nData initialization complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(init_data())
