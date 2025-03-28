import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    loadUsers();
  }, [page]);

  useEffect(() => {
    if (filterText) {
      const filtered = users.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        return fullName.includes(filterText.toLowerCase());
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [filterText, users]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(page);
      setUsers(data.data); 
      setFilteredUsers(data.data); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const handleUserDeleted = (deletedUserId) => {
    setUsers(users.filter((user) => user.id !== deletedUserId));
  };

  const reloadUsers = () => {
    loadUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Users List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onUserDeleted={handleUserDeleted}
                onUserUpdated={reloadUsers}
              />
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      )}

      <div className="mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
