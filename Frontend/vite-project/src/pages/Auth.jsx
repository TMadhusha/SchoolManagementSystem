import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login & register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher"); // default for register

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // Redirect based on role
        if (res.data.role === "admin") navigate("/admin");
        else if (res.data.role === "principal") navigate("/principal");
        else navigate("/teacher");
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    } else {
      // Register
      try {
        await axios.post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
          role,
        });
        alert("User registered successfully!");
        setIsLogin(true); // Switch to login tab
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        {/* Tabs */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2 px-4 font-bold ${
              isLogin ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`py-2 px-4 font-bold ${
              !isLogin ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-400"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              className="border p-2 w-full rounded"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          )}

          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            className="border p-2 w-full rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {!isLogin && (
            <select
              className="border p-2 w-full rounded"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="admin">Admin</option>
              <option value="principal">Principal</option>
              <option value="teacher">Teacher</option>
            </select>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
