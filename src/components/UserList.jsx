import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(page);
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const handleUserDeleted = (deletedUserId) => {
    setUsers(users.filter(user => user.id !== deletedUserId));
  };
  
  const reloadUsers = () => {
    setPage((prev) => (prev === 1 ? 2 : 1));  
    setTimeout(() => setPage(1), 0);           
  };
  
//   const handleUserUpdated = (updatedUser) => {
    
//     setUsers((prevUsers) => 
//       prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//     );
//   };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Users List</h1>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-3 gap-4">
         {users.map((user) => <UserCard key={user.id} user={user} onUserDeleted={handleUserDeleted} onUserUpdated={reloadUsers} />)}

        </div>
      )}
      <div className="mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-blue-500 text-white rounded">Prev</button>
        <button onClick={() => setPage(page + 1)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
    </div>
  );
};

export default UserList;