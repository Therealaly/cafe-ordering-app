import { useState, useEffect } from "react";

const FormBanner = ({ initialData = {}, onSubmit, onCancel, loading }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [image, setImage] = useState(initialData.image || "");

  useEffect(() => {
    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setImage(initialData.image || "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) return;
    onSubmit({ title, description, image });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-6/12 mb-4">
      <h2 className="text-lg font-bold mb-4 text-black">
        {initialData._id ? "Edit Banner" : "Tambah Banner"}
      </h2>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          value={title}
          onChange={e => setTitle(e.target.value)}
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
      <div className="mb-4">
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
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          disabled={loading || !title || !description || !image}
        >
          {loading ? "Menyimpan..." : (initialData._id ? "Update" : "Tambah")}
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={onCancel}
          disabled={loading}
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default FormBanner;