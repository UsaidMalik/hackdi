import json

def deduplicate_entities():
    """Remove duplicate entities from initial_scores.json based on entity_name"""
    
    # Load the data
    with open('data/initial_scores.json', 'r') as f:
        data = json.load(f)
    
    print(f"Original data has {len(data)} entries")
    
    # Deduplicate based on entity_name
    seen_names = set()
    deduped_data = []
    
    for entity in data:
        entity_name = entity.get('entity_name', '').lower()
        if entity_name not in seen_names:
            seen_names.add(entity_name)
            deduped_data.append(entity)
        else:
            print(f"Removing duplicate: {entity.get('entity_name')}")
    
    print(f"Deduplicated data has {len(deduped_data)} entries")
    
    # Save the deduplicated data
    with open('data/initial_scores.json', 'w') as f:
        json.dump(deduped_data, f, indent=2)
    
    print("Deduplicated data saved to data/initial_scores.json")

if __name__ == "__main__":
    deduplicate_entities()