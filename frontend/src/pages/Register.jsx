import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/register", {
      mobile,
      password,
    });

    if (res.data.status === "success") {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">

      <form
        onSubmit={handleRegister}
        className="bg-white w-96 p-8 rounded-xl shadow-lg"
      >

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Mobile */}
        <input
          className="border w-full p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* Password */}
        <input
          className="border w-full p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded transition"
        >
          Register
        </button>

        {/* Link */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}