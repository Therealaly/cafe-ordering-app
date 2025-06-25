import json
import chromadb
import os
from dotenv import load_dotenv
from chromadb.utils import embedding_functions


# --- (Keep your ChromaDB client and embedding function initialization here) ---
load_dotenv()
client = chromadb.Client()
gemini_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(api_key=os.getenv("GEMINI_API_KEY"))
collection = client.get_or_create_collection(name="menu_warna_kopi", embedding_function=gemini_ef)

def index_menu():
    global collection
    
    client.delete_collection(name="menu_warna_kopi")
    print("Previous collection data cleared.")  

    collection = client.create_collection(name="menu_warna_kopi", embedding_function=gemini_ef)
    print("collection recreated.")

    with open('menu.json', 'r', encoding='utf-8') as f:
        menu_data = json.load(f)

    documents_to_add = []
    metadatas_to_add = []
    ids_to_add = []

    for category_data in menu_data:
        category_name = category_data.get("category", "Tanpa Kategori")

        for item in category_data.get("items", []):
            name = item.get("name", "")
            description = item.get("description", "")
            composition = item.get("composition", "")
            
            # Initialize prices as None
            price_hot = None
            price_ice = None

            # Get the price value from the item
            price_value = item.get("price")

            # Case 1: Price is a dictionary (e.g., {"hot": 18000, "ice": 20000})
            if isinstance(price_value, dict):
                price_hot = price_value.get("hot")
                price_ice = price_value.get("ice")
            
            # Case 2: Price is a single number (e.g., 18000)
            elif isinstance(price_value, (int, float)):
                # We'll assign the single price to 'hot' and leave 'ice' as None.
                # You can change this convention if needed.
                price_hot = price_value
                price_ice = None

            if price_hot is None:
                price_hot = -1
            if price_ice is None:
                price_ice = -1
            
            # Case 3 (price is null, missing, or another type) is handled by the initial None values.
            # Create a FLAT metadata object for ChromaDB
            metadata_for_chroma = {
                "nama": name,
                "kategori": category_name,
                "deskripsi": description,
                "komposisi": composition,
                "harga_hot": price_hot,
                "harga_ice": price_ice
            }

            if price_hot != -1 and price_ice != -1:
                price_str = f"Harga: Hot Rp{price_hot}, Ice Rp{price_ice}"
            elif price_hot != -1:
                price_str = f"Harga: Hot Rp{price_hot}"
            elif price_ice != -1:
                price_str = f"Harga: Ice Rp{price_ice}"
            else:
                price_str = "Harga: Tidak tersedia"

            document_text = (
                f"Nama: {name}. Kategori: {category_name}. {price_str}. "
                f"Deskripsi: {description}. Komposisi: {composition}."
            )
            item_id = f"item_{name.replace(' ', '_').lower()}"

            documents_to_add.append(document_text)
            metadatas_to_add.append(metadata_for_chroma)
            ids_to_add.append(item_id)

    if documents_to_add:
        collection.add(
            documents=documents_to_add,
            metadatas=metadatas_to_add,
            ids=ids_to_add
        )
        print(f"Successfully indexed {len(documents_to_add)} menu items.")
    else:
        print("No items found to index.")

def query_menu(question, top_k=3):

    results = collection.query(
        query_texts=[question],
        n_results=top_k
    )

    return {
        "context": results["documents"][0],
        "metadata": results["metadatas"][0]
    }

