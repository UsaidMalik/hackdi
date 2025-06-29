import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def seed_database():
    """
    Seeds the MongoDB database with initial scores from the generated JSON file.
    """
    mongodb_uri = os.getenv('MONGODB_URI')
    if not mongodb_uri:
        print("Error: MONGODB_URI environment variable not set.")
        return

    client = MongoClient(mongodb_uri)
    db = client['mqt3']  # As seen in db.ts
    collection = db['entities']

    # Load the generated scores
    try:
        with open('data/initial_scores.json', 'r') as f:
            scores_data = json.load(f)
    except FileNotFoundError:
        print("Error: data/initial_scores.json not found. Please run generate_initial_scores.py first.")
        return
    except json.JSONDecodeError:
        print("Error: Could not decode JSON from data/initial_scores.json.")
        return

    # Drop the collection to ensure a clean slate
    print(f"Dropping the '{collection.name}' collection...")
    db.drop_collection(collection.name)
    print("Collection dropped.")
    collection = db['entities'] # Recreate the collection

    # Insert new data
    if scores_data:
        print(f"Inserting {len(scores_data)} new documents...")
        collection.insert_many(scores_data)
        print("Database seeding completed successfully.")
    else:
        print("No data to insert.")

    client.close()

if __name__ == "__main__":
    seed_database()
