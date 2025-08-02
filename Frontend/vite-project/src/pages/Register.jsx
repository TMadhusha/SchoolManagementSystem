import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher"); // default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert("User registered successfully!");
      navigate("/"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-96"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border p-2 w-full rounded"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="admin">Admin</option>
          <option value="principal">Principal</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register; 
