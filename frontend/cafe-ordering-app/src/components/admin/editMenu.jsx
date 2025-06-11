import { useState, useEffect } from "react";
import axios from "axios";
import { Pen, Trash, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import FormMenu from "../admin/form/formMenu"; // Assuming you have FormMenu.jsx

const ITEMS_PER_PAGE = 6;

const EditMenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMenu, setEditingMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [minumanCurrentPage, setMinumanCurrentPage] = useState(1);
  const [makananCurrentPage, setMakananCurrentPage] = useState(1);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/menu"); // Adjust API endpoint if needed
      setMenus(response.data);
    } catch (error) {
      console.error("Error fetching menus:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setShowForm(true);
  };

  const handleAddMenu = () => {
    setEditingMenu(null);
    setShowForm(true);
  };

  const deleteMenu = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMenus(menus.filter(menu => menu._id !== id));
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("Gagal menghapus menu: " + (error.response?.data?.message || error.message));
    }
  };

  const handleFormSubmit = async (data) => {
    setLoading(true); // Consider a different loading state for form submission if needed
    try {
      if (editingMenu && editingMenu._id) {
        await axios.put(`http://localhost:5000/api/menu/${editingMenu._id}`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post("http://localhost:5000/api/menu", data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      fetchMenus(); // Refresh menus list
      setShowForm(false);
      setEditingMenu(null);
    } catch (error) {
      console.error("Error submitting menu form:", error);
      alert("Gagal menyimpan menu: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); // Reset general loading or form-specific loading
    }
  };

   const renderMenuTable = (title, fullFilteredMenus, currentPage, onPageChange) => {
    const totalItems = fullFilteredMenus.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedMenus = fullFilteredMenus.slice(startIndex, endIndex);

    const handlePageClick = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      }
    };
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-black mb-3">{title}</h3>
        {totalItems === 0 && !loading ? (
          <p className="text-gray-500">Tidak ada menu dalam kategori ini.</p>
        ) : (
          <>
            <div className="overflow-x-auto min-h-[550px]">
              <table className="h-full min-w-full bg-white border border-gray-200 rounded-lg text-black">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Img</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Desc</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Price (Rp)</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMenus.map((menu) => (
                    <tr key={menu._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 py-2 border-b w-1/12">
                        <img
                          src={menu.image}
                          alt={menu.name}
                          className="w-16 h-16 object-cover rounded"
                          loading="lazy"
                        />
                      </td>
                      <td className="px-4 py-2 border-b font-medium w-2/12">{menu.name}</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700 max-w-sm truncate">{menu.description}</td>
                      <td className="px-4 py-2 border-b text-right w-1/12">{menu.price.toLocaleString("id-ID")}</td>
                      <td className="px-4 py-2 border-b">
                        <div className="flex items-center space-x-2">
                          <button
                            className="rounded-md bg-yellow-400 text-white p-2 hover:bg-yellow-500 transition"
                            onClick={() => handleEditMenu(menu)}
                            aria-label="Edit Menu"
                          >
                            <Pen size={16} />
                          </button>
                          <button
                            className="rounded-md bg-red-600 text-white p-2 hover:bg-red-700 transition"
                            onClick={() => {
                              if (window.confirm(`Apakah Anda yakin ingin menghapus menu "${menu.name}"?`)) {
                                deleteMenu(menu._id);
                              }
                            }}
                            aria-label="Delete Menu"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex justify-center items-center space-x-2 text-black">
                <button
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={20} />
                </button>
                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`px-3 py-1 rounded-md border ${currentPage === number ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next Page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const makananMenus = menus.filter(menu => menu.category === "Makanan");
  const minumanMenus = menus.filter(menu => menu.category === "Minuman");
  // const cemilanMenus = menus.filter(menu => menu.category === "Cemilan");


  return (
    <div className="w-full h-full flex flex-col p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Menu</h2>
        <button
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          onClick={handleAddMenu}
        >
          <Plus size={20} className="inline mr-2" />
          Tambah Menu
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <FormMenu
            initialData={editingMenu || {}}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingMenu(null);
            }}
            loading={loading} // You might want a specific formLoading state
          />
        </div>
      )}

      {loading && !showForm ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-4 rounded-lg shadow">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {renderMenuTable("Minuman", minumanMenus, minumanCurrentPage, setMinumanCurrentPage)}
          {renderMenuTable("Makanan", makananMenus, makananCurrentPage, setMakananCurrentPage)}
        </>
      )}
    </div>
  );
};

export default EditMenu;