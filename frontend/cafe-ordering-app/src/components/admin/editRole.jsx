import { useState, useEffect } from "react";
import axios from "axios";
import { Pen, Trash, ChevronLeft, ChevronRight, Search } from "lucide-react"; // Added Search icon
import FormUser from "../admin/form/formUser"; 
import { jwtDecode } from "jwt-decode";

const ITEMS_PER_PAGE = 10;

const EditRole = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/auth", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setLoggedInUserRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refetch or filter users locally
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus user: " + (error.response?.data?.message || error.message));
    }
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/auth/${editingUser._id}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUser();
      setShowForm(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error submitting user form:", error);
      alert("Gagal menyimpan user: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); 
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

   const renderUserTable = (allUsersToDisplay, currentPage, onPageChange) => { // Renamed allUsers to allUsersToDisplay
    const totalItems = allUsersToDisplay.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Ensure paginatedUsers is used, not paginatedMenus if that was a typo from before
    const paginatedUsers = allUsersToDisplay.slice(startIndex, endIndex); 

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
        {totalItems === 0 && !loading && !showForm ? ( // Added !showForm condition
          <p className="text-gray-500 text-center py-4">Tidak ada user yang cocok dengan pencarian Anda.</p>
        ) : (
          <>
            <div className="overflow-x-auto min-h-[550px]">
              <table className="h-full min-w-full bg-white border border-gray-200 rounded-lg text-black">
                {/* ... Table Head ... */}
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
                        {/* ... Action Buttons ... */}
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
                            onClick={() => {
                              if (window.confirm(`Apakah Anda yakin ingin menghapus user "${user.name}"?`)) {
                                deleteUser(user._id);
                              }
                            }}
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

            {totalPages > 1 && (
              // ... Pagination Controls ...
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

  const roleOrder = { admin: 1, kasir: 2, superadmin: 0, user: 3 };

  // Filter users based on search term first
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Then sort the filtered users
  const sortedAndFilteredUsers = [...filteredUsers].sort((a, b) => {
    const orderA = roleOrder[a.role] !== undefined ? roleOrder[a.role] : Infinity;
    const orderB = roleOrder[b.role] !== undefined ? roleOrder[b.role] : Infinity;
    
    if (orderA === orderB) {
      return a.name.localeCompare(b.name);
    }
    return orderA - orderB;
  });

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h2>
      </div>

      {/* Search Bar - Placed outside the form and table rendering logic */}
      {!showForm && (
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari pengguna berdasarkan nama..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
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
            loading={loading} // Or a more specific loading state for the form
            loggedInUserRole={loggedInUserRole}
          />
        </div>
      )}

      {loading && !showForm ? (
        // ... Loading Skeleton ...
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
          {/* Render table only if not showing form */}
          {!showForm && renderUserTable(sortedAndFilteredUsers, currentPage, setCurrentPage)}
        </>
      )}
    </div>
  );
};

export default EditRole;