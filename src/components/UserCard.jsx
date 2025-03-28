import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../services/api";

const UserCard = ({ user, onUserDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(user.id);
      onUserDeleted(user.id);
      setSuccessMessage("User deleted successfully!");
      setShowModal(false);  
    } catch (error) {
      console.error("Error deleting user:", error);
      setSuccessMessage("Failed to delete user.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <img src={user?.avatar || "/default-avatar.png"} alt={user?.first_name || "User"} className="w-20 h-20 rounded-full" />
      <h3 className="text-xl">{user?.first_name} {user?.last_name}</h3>
      <p>{user?.email}</p>
      <div className="mt-2 flex gap-2">
        <Link to={`/edit/${user.id}`} className="bg-yellow-500 px-3 py-1 text-white rounded">
          Edit
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 px-3 py-1 text-white rounded"
        >
          Delete
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {loading ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default UserCard;
