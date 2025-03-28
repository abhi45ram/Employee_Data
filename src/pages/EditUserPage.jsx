import UserEditForm from "../components/UserEditForm";
import { useNavigate } from "react-router-dom";

const EditUserPage = ({ onUserUpdated, reloadUsers }) => {
  const navigate = useNavigate();

  const handleUserUpdated = (updatedUser) => {
    console.log("User updated successfully:", updatedUser);

    if (onUserUpdated) {
      onUserUpdated();
    }
    
   
    reloadUsers(); 

    navigate("/users"); 
  };

  return <UserEditForm onUserUpdated={handleUserUpdated} />;
};

export default EditUserPage;
