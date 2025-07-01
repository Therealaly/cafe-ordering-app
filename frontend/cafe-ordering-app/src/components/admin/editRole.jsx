import { useState } from "react";
import { Pen, Trash } from "lucide-react";
import FormUser from "../admin/form/formUser";
import LoadingSkeleton from "../common/LoadingSkeleton";
import SearchBar from "../common/SearchBar";
import Pagination from "../common/Pagination";
import ConfirmDialog from "../common/ConfirmDialog";
import { useUsers } from "../../hooks/useUsers";
import { usePagination } from "../../hooks/usePagination";
import { PAGINATION_CONFIG, MESSAGES } from "../../utils/constants";

const EditRole = () => {
  const {
    loading,
    loggedInUserRole,
    updateUser,
    deleteUser,
    filterUsers,
    sortUsersByRole,
  } = useUsers();

  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter and sort users
  const filteredUsers = filterUsers(searchTerm);
  const sortedAndFilteredUsers = sortUsersByRole(filteredUsers);

  const usersPagination = usePagination(sortedAndFilteredUsers, PAGINATION_CONFIG.ITEMS_PER_PAGE);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteClick = (user) => {
    setConfirmDelete(user);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      try {
        await deleteUser(confirmDelete._id);
        setConfirmDelete(null);
      } catch (error) {
        alert(MESSAGES.ERROR_DELETE_USER + error.message);
      }
    }
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await updateUser(editingUser._id, data);
      setShowForm(false);
      setEditingUser(null);
    } catch (error) {
      alert(MESSAGES.ERROR_SAVE_USER + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    usersPagination.resetPage();
  };

   const renderUserTable = (allUsersToDisplay, pagination) => {
    const { data: paginatedUsers, totalPages, currentPage } = pagination;

    return (
      <div className="mb-8">
        {allUsersToDisplay.length === 0 && !loading && !showForm ? (
          <p className="text-gray-500 text-center py-4">Tidak ada user yang cocok dengan pencarian Anda.</p>
        ) : (
          <>
            <div className="overflow-x-auto min-h-[550px]">
              <table className="h-full min-w-full bg-white border border-gray-200 rounded-lg text-black">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Nama</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Email</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Role</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2 border-b font-medium w-2/12">{user.name}</td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700 max-w-sm truncate">{user.email}</td>
                      <td className="px-4 py-2 border-b text-right w-1/12">{user.role}</td>
                      <td className="px-4 py-2 border-b">
                        <div className="flex items-center space-x-2">
                          <button
                            className="rounded-md bg-yellow-400 text-white p-2 hover:bg-yellow-500 transition"
                            onClick={() => handleEditUser(user)}
                            aria-label="Edit user role"
                          >
                            <Pen size={16} />
                          </button>
                          <button
                            className="rounded-md bg-red-600 text-white p-2 hover:bg-red-700 transition"
                            onClick={() => handleDeleteClick(user)}
                            aria-label="Delete user"
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
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h2>
      </div>

      {/* Search Bar - Placed outside the form and table rendering logic */}
      {!showForm && (
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Cari pengguna berdasarkan nama..."
          className="mb-4"
        />
      )}

      {showForm && (
        <div className="mb-6">
          <FormUser
            initialData={editingUser || {}}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingUser(null);
            }}
            loading={isSubmitting}
            loggedInUserRole={loggedInUserRole}
          />
        </div>
      )}

      {loading && !showForm ? (
        <LoadingSkeleton rows={3} />
      ) : !showForm && (
        renderUserTable(sortedAndFilteredUsers, usersPagination)
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
        title="Hapus User"
        message={confirmDelete ? MESSAGES.CONFIRM_DELETE_USER(confirmDelete.name) : ""}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default EditRole;