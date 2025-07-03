import json
import chromadb
import os
from dotenv import load_dotenv
from chromadb.utils import embedding_functions
import re

# Initialize ChromaDB
load_dotenv()
client = chromadb.Client()
gemini_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(api_key=os.getenv("GEMINI_API_KEY"))
collection = client.get_or_create_collection(name="menu_warna_kopi", embedding_function=gemini_ef)

def extract_price_range(price_hot, price_ice):
    # """Categorize price range for filtering"""
    prices = [p for p in [price_hot, price_ice] if p != -1 and p is not None]
    if not prices:
        return "unknown"
    
    max_price = max(prices)
    if max_price <= 15000:
        return "budget"
    elif max_price <= 25000:
        return "moderate"
    else:
        return "premium"

def extract_dietary_tags(dietary_info):
    # """Extract dietary restriction tags"""
    tags = []
    if dietary_info.get("vegetarian", False):
        tags.append("vegetarian")
    if dietary_info.get("vegan", False):
        tags.append("vegan")
    if dietary_info.get("gluten_free", False):
        tags.append("gluten_free")
    if dietary_info.get("dairy_free", False):
        tags.append("dairy_free")
    if dietary_info.get("nuts_free", False):
        tags.append("nuts_free")
    if dietary_info.get("halal", False):
        tags.append("halal")
    return tags

def build_enhanced_document(item, category_name, price_str):
    # """Build comprehensive document text for better semantic search"""
    
    # Basic info
    name = item.get("name", "")
    description = item.get("description", "")
    composition = item.get("composition", "")
    
    # Enhanced fields
    tags = item.get("tags", [])
    dietary_info = item.get("dietary_info", {})
    allergens = item.get("allergens", [])
    caffeine_level = item.get("caffeine_level", "")
    sweetness_level = item.get("sweetness_level", "")
    preparation_time = item.get("preparation_time", "")
    customization = item.get("customization", {})
    pairing_suggestions = item.get("pairing_suggestions", [])
    origin = item.get("origin", "")
    brewing_method = item.get("brewing_method", "")
    
    # Build comprehensive document
    document_parts = [
        f"Menu Item: {name}",
        f"Category: {category_name}",
        f"Pricing: {price_str}",
        f"Description: {description}",
        f"Ingredients: {composition}",
    ]
    
    if tags:
        document_parts.append(f"Tags: {', '.join(tags)}")
    
    if caffeine_level:
        document_parts.append(f"Caffeine Level: {caffeine_level}")
    
    if sweetness_level:
        document_parts.append(f"Sweetness: {sweetness_level}")
    
    if preparation_time:
        document_parts.append(f"Preparation Time: {preparation_time}")
    
    # Dietary information
    dietary_tags = extract_dietary_tags(dietary_info)
    if dietary_tags:
        document_parts.append(f"Dietary Options: {', '.join(dietary_tags)}")
    
    if allergens:
        document_parts.append(f"Allergens: {', '.join(allergens)}")
    
    # Customization options
    if customization.get("available", False):
        options = customization.get("options", [])
        if options:
            document_parts.append(f"Customization Available: {', '.join(options)}")
    
    # Pairing suggestions
    if pairing_suggestions:
        document_parts.append(f"Goes well with: {', '.join(pairing_suggestions)}")
    
    # Origin and brewing method
    if origin:
        document_parts.append(f"Origin: {origin}")
    
    if brewing_method:
        document_parts.append(f"Brewing Method: {brewing_method}")
    
    return "\n".join(document_parts)

def build_enhanced_metadata(item, category_name, price_hot, price_ice):
    # """Build comprehensive metadata for filtering and analysis"""
    
    base_metadata = {
        "nama": item.get("name", ""),
        "kategori": category_name,
        "deskripsi": item.get("description", ""),
        "komposisi": item.get("composition", ""),
        "harga_hot": price_hot,
        "harga_ice": price_ice,
    }
    
    # Enhanced metadata
    enhanced_metadata = {
        # Price categorization
        "price_range": extract_price_range(price_hot, price_ice),
        
        # Tags and categories
        "tags": ", ".join(item.get("tags", [])),
        "dietary_tags": ", ".join(extract_dietary_tags(item.get("dietary_info", {}))),
        "allergens": ", ".join(item.get("allergens", [])),
        
        # Drink characteristics
        "caffeine_level": item.get("caffeine_level", ""),
        "sweetness_level": item.get("sweetness_level", ""),
        "temperature_options": ", ".join(item.get("temperature_options", [])),
        
        # Service info
        "preparation_time": item.get("preparation_time", ""),
        "serving_size": item.get("serving_size", ""),
        "customization_available": item.get("customization", {}).get("available", False),
        
        # Popularity and recommendations
        "seasonal": item.get("seasonal", False),
        
        # Pairing and origin
        "pairing_suggestions": ", ".join(item.get("pairing_suggestions", [])),
        "origin": item.get("origin", ""),
        "brewing_method": item.get("brewing_method", ""),
        "bean_origin": item.get("bean_origin", ""),
        "roast_level": item.get("roast_level", ""),
        
        # Categorization helpers
        "is_beverage": category_name.lower() not in ["nyamikan + maeman"],
        "is_food": category_name.lower() == "nyamikan + maeman",
        "is_coffee": any(coffee_word in item.get("name", "").lower() or 
                        coffee_word in item.get("composition", "").lower() 
                        for coffee_word in ["espresso", "kopi", "coffee", "americano", "latte", "cappuccino"]),
        "has_milk": any(milk_word in item.get("composition", "").lower() 
                       for milk_word in ["susu", "milk", "creamer", "foam"]),
        "has_ice_option": price_ice != -1 and price_ice is not None,
        "has_hot_option": price_hot != -1 and price_hot is not None,
    }
    
    return {**base_metadata, **enhanced_metadata}

def index_menu():
    """Enhanced menu indexing with comprehensive metadata"""
    global collection
    
    # Recreate collection
    try:
        client.delete_collection(name="menu_warna_kopi")
        print("Previous collection data cleared.")
    except:
        pass
    
    collection = client.create_collection(name="menu_warna_kopi", embedding_function=gemini_ef)
    print("Collection recreated.")

    # Load menu data
    with open('menu.json', 'r', encoding='utf-8') as f:
        menu_data = json.load(f)

    documents_to_add = []
    metadatas_to_add = []
    ids_to_add = []

    for category_data in menu_data:
        category_name = category_data.get("category", "Tanpa Kategori")

        for item in category_data.get("items", []): #item ditambahkan
            name = item.get("name", "")
            if not name:
                continue
            
            # Process pricing
            price_hot = None
            price_ice = None
            price_value = item.get("price")

            if isinstance(price_value, dict):
                price_hot = price_value.get("hot")
                price_ice = price_value.get("ice")
            elif isinstance(price_value, (int, float)):
                price_hot = price_value
                price_ice = None

            # Handle None values
            if price_hot is None:
                price_hot = -1
            if price_ice is None:
                price_ice = -1

            # Build price string
            if price_hot != -1 and price_ice != -1:
                price_str = f"Hot: Rp{price_hot:,}, Ice: Rp{price_ice:,}"
            elif price_hot != -1:
                price_str = f"Hot: Rp{price_hot:,}"
            elif price_ice != -1:
                price_str = f"Ice: Rp{price_ice:,}"
            else:
                price_str = "Price not available"

            # Build enhanced document and metadata
            document_text = build_enhanced_document(item, category_name, price_str)
            metadata = build_enhanced_metadata(item, category_name, price_hot, price_ice)
            item_id = f"item_{name.replace(' ', '_').replace('/', '_').lower()}"

            documents_to_add.append(document_text)
            metadatas_to_add.append(metadata)
            ids_to_add.append(item_id)
    
    if documents_to_add:
        collection.add(
            documents=documents_to_add,
            metadatas=metadatas_to_add,
            ids=ids_to_add
        )
        print(f"Successfully indexed {len(documents_to_add)} menu items with enhanced metadata.")
    else:
        print("No items found to index.")

def preprocess_query(question):
    # Bidirectional synonyms - both directions work
    synonyms = {
        # Coffee terms (Indonesian -> English & English -> Indonesian)
        "kopi": ["coffee", "espresso", "americano", "cappuccino", "latte", "mocha", "arabica", "robusta"],
        "coffee": ["kopi", "espresso", "americano", "cappuccino", "latte", "mocha"],
        "espresso": ["kopi", "coffee", "shot", "arabica"],
        "americano": ["kopi", "coffee", "hitam", "black"],
        "cappuccino": ["kopi", "coffee", "susu", "foam", "creamy"],
        "latte": ["kopi", "coffee", "susu", "milk", "creamy"],
        "mocha": ["kopi", "coffee", "cokelat", "chocolate"],
        
        # Temperature (Indonesian -> English & English -> Indonesian)
        "dingin": ["cold", "ice", "es", "iced", "sejuk", "segar"],
        "cold": ["dingin", "ice", "es", "iced", "sejuk"],
        "es": ["ice", "cold", "dingin", "iced", "sejuk"],
        "ice": ["es", "cold", "dingin", "iced"],
        "panas": ["hot", "hangat", "warm"],
        "hot": ["panas", "hangat", "warm"],
        "hangat": ["warm", "hot", "panas"],
        
        # Price (Indonesian -> English & English -> Indonesian)
        "murah": ["cheap", "budget", "affordable", "ekonomis", "terjangkau"],
        "cheap": ["murah", "budget", "affordable", "ekonomis"],
        "budget": ["murah", "cheap", "affordable", "ekonomis"],
        "mahal": ["expensive", "premium", "eksklusif"],
        "expensive": ["mahal", "premium", "eksklusif"],
        "premium": ["mahal", "expensive", "eksklusif", "mewah"],
        
        # Taste (Indonesian -> English & English -> Indonesian)
        "manis": ["sweet", "gula", "sugar", "legi"],
        "sweet": ["manis", "gula", "sugar", "legi"],
        "pahit": ["bitter", "kuat", "strong", "pekat"],
        "bitter": ["pahit", "kuat", "strong"],
        "kuat": ["strong", "pahit", "bitter", "pekat"],
        "strong": ["kuat", "pahit", "bitter"],
        
        # Texture/Type (Indonesian -> English & English -> Indonesian)
        "susu": ["milk", "creamy", "lembut", "foam"],
        "milk": ["susu", "creamy", "lembut"],
        "creamy": ["susu", "milk", "lembut", "halus"],
        "lembut": ["smooth", "creamy", "soft", "halus"],
        
        # Food/Drink (Indonesian -> English & English -> Indonesian)
        "makanan": ["food", "makan", "snack", "cemilan"],
        "food": ["makanan", "makan", "snack", "cemilan"],
        "makan": ["eat", "food", "makanan", "meal"],
        "minuman": ["drink", "minum", "beverage"],
        "drink": ["minuman", "minum", "beverage"],
        "minum": ["drink", "minuman", "beverage"],
        
        # Dietary (Indonesian -> English & English -> Indonesian)
        "vegetarian": ["nabati", "sayur", "sayuran"],
        "nabati": ["vegetarian", "plant-based", "sayur"],
        "halal": ["islami", "syariah"],
        "vegan": ["nabati", "tanpa-hewani"],
        
        # Spicy (Indonesian -> English & English -> Indonesian)
        "pedas": ["spicy", "hot", "panas"],
        "spicy": ["pedas", "hot", "panas"],
        
        # Recommendations (Indonesian -> English & English -> Indonesian)
        "rekomen": ["recommend", "suggest", "bagus", "enak", "favorit", "populer"],
        "recommend": ["rekomen", "suggest", "bagus", "enak", "saran"],
        "enak": ["tasty", "delicious", "bagus", "lezat", "nikmat"],
        "bagus": ["good", "nice", "enak", "recommend"],
        "favorit": ["favorite", "popular", "populer", "pilihan"],
        "populer": ["popular", "favorite", "favorit", "terkenal"],
        
        # Additional Indonesian specific terms
        "segar": ["fresh", "refreshing", "dingin", "sejuk"],
        "gurih": ["savory", "salty", "asin"],
        "kenyang": ["filling", "full", "satisfying"],
        "ringan": ["light", "simple", "mudah"],
        "berat": ["heavy", "filling", "kenyang"],
        "tradisional": ["traditional", "klasik", "asli"],
        "modern": ["contemporary", "new", "baru"],
        "unik": ["unique", "special", "istimewa"],
        
        # Occasions (Indonesian terms)
        "sarapan": ["breakfast", "pagi", "morning"],
        "siang": ["lunch", "afternoon", "tengah-hari"],
        "sore": ["afternoon", "evening", "petang"],
        "malam": ["night", "evening", "dinner"],
    }

    enhanced_query = question.lower()
    words_in_question = enhanced_query.split()

    for word in words_in_question:
        clean_word = word.strip('.,!?()[]{};:"\'\"') 
    
        if clean_word in synonyms:
            related_terms = synonyms[clean_word]
            enhanced_query += " " + " ".join(related_terms)

    return enhanced_query

def build_filter_criteria(question):
    question_lower = question.lower()
    filters={}

    # price filter
    if any(word in question_lower for word in ["murah", "budget", "ekonomis", "cheap", "affordable", "ekonomis"]):
        filters["price_range"] = "budget"
    elif any(word in question_lower for word in ["mahal", "premium", "eksklusif", "expensive", "high-end"]):
        filters["price_range"] = "premium"

    # Dietary filters
    if any(word in question_lower for word in ["vegetarian", "nabati"]):
        filters["dietary_tags"] = {"$contains": "vegetarian"}
    if any(word in question_lower for word in ["vegan"]):
        filters["dietary_tags"] = {"$contains": "vegan"}
    if any(word in question_lower for word in ["halal"]):
        filters["dietary_tags"] = {"$contains": "halal"}
    
    # Temperature filters
    if any(word in question_lower for word in ["dingin", "cold", "ice", "es", "iced"]):
        filters["has_ice_option"] = True
    if any(word in question_lower for word in ["panas", "hot", "hangat", "warm"]):
        filters["has_hot_option"] = True
    
    # Category filters
    if any(word in question_lower for word in ["makanan", "food", "makan", "snack", "cemilan"]):
        filters["is_food"] = True
    if any(word in question_lower for word in ["minuman", "drink", "minum", "beverage"]):
        filters["is_beverage"] = True
    if any(word in question_lower for word in ["kopi", "coffee", "espresso", "americano", "cappuccino", "latte", "mocha"]):
        filters["is_coffee"] = True

    return filters if filters else None

def query_menu(question, top_k=5):
    """Enhanced query function with preprocessing and filtering"""
    
    # Preprocess query
    processed_question = preprocess_query(question)
    
    # Build filter criteria
    filter_criteria = build_filter_criteria(question)
    
    # Query with filters
    try:
        results = collection.query(
            query_texts=[processed_question],
            n_results=top_k,
            where=filter_criteria,
            include=["documents", "metadatas"]
        )
        
        # If no results with filters, try without filters
        if not results["documents"][0] and filter_criteria:
            results = collection.query(
                query_texts=[processed_question],
                n_results=top_k,
                include=["documents", "metadatas"]
            )
    except Exception as e:
        print(f"Error querying with filters: {e}")
        # Fallback to basic query
        results = collection.query(
            query_texts=[processed_question],
            n_results=top_k,
            include=["documents", "metadatas"]
        )
    
    return {
        "context": results["documents"][0],
        "metadata": results["metadatas"][0],
        "query_analysis": {
            "original_query": question,
            "processed_query": processed_question,
            "filters_applied": filter_criteria,
            "results_count": len(results["documents"][0])
        }
    }
