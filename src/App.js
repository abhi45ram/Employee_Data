import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import { AuthProvider } from "./context/AuthContext";
import UserEditForm from "./components/UserEditForm";
import { ToastContainer } from "react-toastify";

const App = () => (
  <AuthProvider>
     <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/edit/:id" element={<UserEditForm/>} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
   
  </AuthProvider>
);

export default App;
