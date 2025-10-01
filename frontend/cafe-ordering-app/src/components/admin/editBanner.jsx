import { useState } from "react";
import { Pen, Trash, Eye, EyeOff, Plus } from "lucide-react";
import FormBanner from "../admin/form/formBanner";
import LoadingSkeleton from "../common/LoadingSkeleton";
import ConfirmDialog from "../common/ConfirmDialog";
import { useBanners } from "../../hooks/useBanners";
import { MESSAGES } from "../../utils/constants";

const EditBanner = () => {
  const {
    banners,
    loading,
    createBanner,
    updateBanner,
    deleteBanner,
    toggleBannerStatus,
  } = useBanners();

  const [editingBanner, setEditingBanner] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setShowForm(true);
  };

  const handleAddBanner = () => {
    setEditingBanner(null);
    setShowForm(true);
  };

  const handleDeleteClick = (banner) => {
    setConfirmDelete(banner);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      try {
        await deleteBanner(confirmDelete._id);
        setConfirmDelete(null);
      } catch (error) {
        alert('Gagal menghapus banner: ' + error.message);
      }
    }
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingBanner && editingBanner._id) {
        await updateBanner(editingBanner._id, data);
      } else {
        await createBanner(data);
      }
      setShowForm(false);
      setEditingBanner(null);
    } catch (error) {
      alert('Gagal menyimpan banner: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id, isActive) => {
    try {
      await toggleBannerStatus(id, isActive);
    } catch (error) {
      alert('Gagal mengubah status banner: ' + error.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-black font-bold mb-4 text-2xl">Manajemen Promosi</h2>
        <button className=" flex mb-4 bg-green-700 text-white px-4 py-2 rounded justify-center hover:bg-green-800 transition" onClick={handleAddBanner}>
          <Plus className="inline mr-1" />
          Tambah Banner
        </button>
      </div>
      {showForm && (
        <FormBanner
          initialData={editingBanner || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingBanner(null);
          }}
          loading={isSubmitting}
        />
      )}
      {loading && !showForm ? (
        <LoadingSkeleton rows={3} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg text-black">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Img</th>
                <th className="px-4 py-2 border-b text-left">Source</th>
                <th className="px-4 py-2 border-b text-left">Description</th>
                <th className="px-4 py-2 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-24 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border-b w-10">{banner.image}</td>
                  <td className="px-4 py-2 border-b">{banner.description}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex items-center space-x-2" >
                      <button className="rounded-sm bg-yellow-400 text-white p-1" onClick={() => handleEditBanner(banner)}>
                      <Pen/>
                      </button>
                      <button  className="rounded-sm bg-red-800 text-white p-1" onClick={() => handleDeleteClick(banner)}>
                        <Trash />
                      </button>
                      <button className="rounded-sm bg-blue-600 text-white p-1" onClick={() => handleToggleStatus(banner._id, banner.isActive)}>
                        {banner.isActive ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
        title="Hapus Banner"
        message={MESSAGES.CONFIRM_DELETE_BANNER}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
}

export default EditBanner;