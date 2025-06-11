import { useState, useEffect } from "react";
import axios from "axios";
import { Pen, Trash, Eye, EyeOff, Plus } from "lucide-react";
import FormBanner from "../admin/form/formBanner"; 

const EditBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingBanner, setEditingBanner] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBanners = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/promo");
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setShowForm(true);
  };

  const handleAddBanner = () => {
    setEditingBanner(null);
    setShowForm(true);
  };

  const deleteBanner = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/promo/${id}`, 
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBanners(banners.filter(banner => banner._id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  }

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingBanner && editingBanner._id) {
        // Edit
        await axios.put(`http://localhost:5000/api/promo/${editingBanner._id}`, 
          data,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
      } else {
        // New
        await axios.post("http://localhost:5000/api/promo", 
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
      }
      // Refresh banners
      fetchBanners();
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false);
  };

  const toggleBannerStatus = async (id, isActive) => {
    try {
      await axios.patch(`http://localhost:5000/api/promo/${id}`, { isActive: !isActive },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setBanners(banners.map(banner => 
        banner._id === id ? { ...banner, isActive: !isActive } : banner
      ));
    } catch (error) {
      console.error("Error toggling banner status:", error);
    }
  }

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
          onCancel={() => setShowForm(false)}
          loading={loading}
        />
      )}
      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5 mb-2"></div>
        </div>
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
                      <button  className="rounded-sm bg-red-800 text-white p-1" onClick={() => {
                        if(window.confirm("Apakah yakin ingin menghapus banner ini?"))
                          { deleteBanner(banner._id)}
                      }}>
                        <Trash />
                      </button>
                      <button className="rounded-sm bg-blue-600 text-white p-1" onClick={() => toggleBannerStatus(banner._id, banner.isActive)}>
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
    </div>
  );
}

export default EditBanner;