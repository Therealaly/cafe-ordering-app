import { useState } from "react";
import { Pen, Trash, Plus } from "lucide-react";
import FormMenu from "../admin/form/formMenu";
import LoadingSkeleton from "../common/LoadingSkeleton";
import Pagination from "../common/Pagination";
import ConfirmDialog from "../common/ConfirmDialog";
import { useMenus } from "../../hooks/useMenus";
import { usePagination } from "../../hooks/usePagination";
import { PAGINATION_CONFIG, MESSAGES } from "../../utils/constants";

const EditMenu = () => {
  const {
    loading,
    createMenu,
    updateMenu,
    deleteMenu,
    getMenusByCategory,
  } = useMenus();

  const [editingMenu, setEditingMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Separate pagination for each category
  const makananMenus = getMenusByCategory("Makanan");
  const minumanMenus = getMenusByCategory("Minuman");

  const makananPagination = usePagination(makananMenus, PAGINATION_CONFIG.MENU_ITEMS_PER_PAGE);
  const minumanPagination = usePagination(minumanMenus, PAGINATION_CONFIG.MENU_ITEMS_PER_PAGE);

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setShowForm(true);
  };

  const handleAddMenu = () => {
    setEditingMenu(null);
    setShowForm(true);
  };

  const handleDeleteClick = (menu) => {
    setConfirmDelete(menu);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingMenu && editingMenu._id) {
        await updateMenu(editingMenu._id, data);
      } else {
        await createMenu(data);
      }
      setShowForm(false);
      setEditingMenu(null);
    } catch (error) {
      alert(MESSAGES.ERROR_SAVE_MENU + error.message);
    }
  };

   const renderMenuTable = (title, categoryMenus, pagination) => {
    const { data: paginatedMenus, totalPages, currentPage } = pagination;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-black mb-3">{title}</h3>
        {categoryMenus.length === 0 && !loading ? (
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
                            onClick={() => handleDeleteClick(menu)}
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={pagination.handlePageChange}
            />
          </>
        )}
      </div>
    );
  };

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
            loading={loading} 
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
          {renderMenuTable("Minuman", minumanMenus, minumanPagination)}
          {renderMenuTable("Makanan", makananMenus, makananPagination)}
        </>
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onConfirm={async () => {
          if (confirmDelete) {
            try {
              await deleteMenu(confirmDelete._id);
              setConfirmDelete(null);
            } catch (error) {
              alert(MESSAGES.ERROR_DELETE_MENU + error.message);
            }
          }
        }}
        onCancel={() => setConfirmDelete(null)}
        title="Hapus Menu"
        message={`Apakah Anda yakin ingin menghapus menu "${confirmDelete?.name}"?`}
      />
    </div>
  );
};

export default EditMenu;