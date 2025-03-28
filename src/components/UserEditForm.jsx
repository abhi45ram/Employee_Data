import { useState, useEffect } from "react";
import { updateUser, fetchUserById } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const UserEditForm = ({ onUserUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUserById(id);
        if (response.data) {
          setFormData({
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
          });
        } else {
          setError("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
     
      const updatedUser = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      await updateUser(id, updatedUser);  

      if (onUserUpdated) {
        onUserUpdated({ id, ...updatedUser });
      }

      setSuccessMessage("User updated successfully!");

      
      setTimeout(() => {
        navigate("/users");
      }, 1000);

    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading user data...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        <input
          className="w-full p-2 mb-2 border rounded"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="First Name"
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Last Name"
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className={`bg-green-500 text-white px-4 py-2 rounded transition ${
              saving ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
            }`}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;
