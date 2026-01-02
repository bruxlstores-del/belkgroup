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

services_data = [
    {
        "id": str(uuid.uuid4()),
        "title": "Débarras d'encombrants",
        "description": "Nous enlevons rapidement tous vos objets encombrants : meubles, électroménagers, matelas, cartons. Service complet avec tri et évacuation professionnelle.",
        "image": "https://images.unsplash.com/photo-1681731059898-72407df8431a",
        "order": 1,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Vide maison complet",
        "description": "Succession, déménagement ou rénovation ? Nous vidons entièrement votre maison ou appartement avec soin et efficacité. Prise en charge totale de A à Z.",
        "image": "https://images.unsplash.com/photo-1671351967814-834d376fcd1d",
        "order": 2,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Vide cave et grenier",
        "description": "Libérez vos caves, greniers et garages encombrés. Notre équipe accède aux espaces difficiles et évacue tous vos encombrants en toute sécurité.",
        "image": "https://images.unsplash.com/photo-1709831917664-804b57448953",
        "order": 3,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Débarras de bureau",
        "description": "Fermeture, déménagement ou réorganisation de bureaux ? Nous nous occupons du débarras professionnel de vos locaux commerciaux et administratifs.",
        "image": "https://images.unsplash.com/photo-1581573833610-487d80de9aab",
        "order": 4,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

async def init_services():
    print("Initializing services in database...")
    
    # Clear existing services
    await db.services.delete_many({})
    print("Cleared existing services")
    
    # Insert new services
    result = await db.services.insert_many(services_data)
    print(f"Inserted {len(result.inserted_ids)} services")
    
    # Verify
    services = await db.services.find().to_list(100)
    print(f"\nServices in database:")
    for service in services:
        print(f"  - {service['title']}")
    
    print("\nServices initialization complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(init_services())