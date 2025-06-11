import { useState, useEffect } from "react";

const FormUser = ({ initialData = {}, onSubmit, onCancel, loading, loggedInUserRole }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // Default role


  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      const validRoles = ["user", "kasir", "admin", "superadmin"];
      setRole(validRoles.includes(initialData.role) ? initialData.role : "user");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ role });
  };

  // Admin can only change to 'user' or 'kasir'
  // If the current user is 'admin', they can be demoted to 'user' or 'kasir'
  // If the current user is 'user' or 'kasir', they can be switched between 'user' and 'kasir'
  let availableTargetRoles = ["user", "kasir"];
  if (loggedInUserRole === 'superadmin') {
    availableTargetRoles = ["user", "kasir", "admin"]; // Superadmin can set to admin
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-4">
      <h2 className="text-lg font-bold mb-6 text-black">
        Edit Role Pengguna
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pengguna</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-100 cursor-not-allowed"
          value={name}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-100 cursor-not-allowed"
          value={email}
          readOnly
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          value={role}
          onChange={e => setRole(e.target.value)}
          required
        >
          {/* If initial role is admin, show it as selected but admin can only demote to user/kasir */}
            {initialData.role && !availableTargetRoles.includes(initialData.role) && (
              <option value={initialData.role} disabled>
                {initialData.role.charAt(0).toUpperCase() + initialData.role.slice(1)} (Tidak dapat diubah oleh Anda)
              </option>
            )}

            {availableTargetRoles.map(r => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
          {loggedInUserRole === 'superadmin' && (
              <p className="text-xs text-green-600 mt-1">Anda adalah Superadmin dan dapat mengubah role ke User, Kasir, atau Admin.</p>
          )}
          {loggedInUserRole === 'admin' && (
              <p className="text-xs text-orange-600 mt-1">Anda adalah Admin dan hanya dapat mengubah role antara User dan Kasir.</p>
          )}
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition flex-grow"
          disabled={loading || ( role === initialData.role)} // Disable if trying to keep admin as admin
        >
          {loading ? "Menyimpan..." : "Update Role"}
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition flex-grow"
          onClick={onCancel}
          disabled={loading}
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default FormUser;