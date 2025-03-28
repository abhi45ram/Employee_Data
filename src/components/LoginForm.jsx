import { useState, useContext } from "react";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { token } = await loginUser(email, password);
      login(token);
      setSuccessMessage("Logged in successfully!");
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        
        {error && <p className="text-red-500">{error}</p>}
        
        <input
          className="w-full p-2 mb-2 border"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        
        <input
          className="w-full p-2 mb-2 border"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        
        <button className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Login
        </button>
      </form>

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
