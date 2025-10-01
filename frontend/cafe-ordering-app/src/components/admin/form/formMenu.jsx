import { useState, useEffect } from "react";

const FormMenu = ({ initialData = {}, onSubmit, onCancel, loading }) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [image, setImage] = useState(initialData.image || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [options, setOptions] = useState(
    initialData.options && Array.isArray(initialData.options) 
      ? initialData.options 
      : initialData.options 
        ? [initialData.options] 
        : ["ice"]  // Default fallback
  );
  const [tags, setTags] = useState(initialData.tags ? (Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags) : "");

  const availableOptions = [
    { value: "ice", label: "Ice/Dingin" },
    { value: "hot", label: "Hot/Panas" },
    { value: "food", label: "Food/Makanan" }
  ];

  useEffect(() => {
    setName(initialData.name || "");
    setDescription(initialData.description || "");
    setPrice(initialData.price || "");
    setImage(initialData.image || "");
    setCategory(initialData.category || "Minuman");
    setOptions(
      initialData.options && Array.isArray(initialData.options)
        ? initialData.options
        : initialData.options
          ? [initialData.options]
          : ["ice"]
    );
    setTags(initialData.tags ? (Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags) : "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !image || !category) return;
    // Convert tags string back to array if your backend expects an array
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
    onSubmit({ name, description, price: Number(price), image, category, options, tags: tagsArray.join(", ") }); // Join back to string if backend expects string
  };

  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-6/12 mb-4">
      <h2 className="text-lg font-bold mb-4 text-black">
        {initialData._id ? "Edit Menu" : "Tambah Menu"}
      </h2>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Menu</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          value={image}
          onChange={e => setImage(e.target.value)}
          required
        />
        {image && (
          <img src={image} alt="Preview" className="mt-2 w-6/12 h-32 object-cover rounded" />
        )}
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="Minuman">Minuman</option>
          <option value="Makanan">Makanan</option>
          {/* Add other categories as needed */}
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">Opsi Suhu/Makanan</label>
        <div className="space-y-2 p-3 border border-gray-200 rounded-lg">
          {availableOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                checked={options.includes(option.value)}
                onChange={() => {
                  const value = option.value;
                  setOptions(prev => 
                    prev.includes(value) 
                      ? prev.filter(opt => opt !== value)  // Remove if exists
                      : [...prev, value]                   // Add if doesn't exist
                  );
                }}
              />
              <span className="text-sm text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (pisahkan dengan koma)</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="e.g., kopi, susu, dingin"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : (initialData._id ? "Update Menu" : "Tambah Menu")}
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={onCancel}
          disabled={loading || (initialData._id && !name && !description && !price && !image && !category && !tags)}
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default FormMenu;