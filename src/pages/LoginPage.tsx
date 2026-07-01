import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaBug } from "react-icons/fa";

import { loginUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);

      login(data.token, data.user);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">

        <div className="flex flex-col items-center mb-8">

          <div className="bg-blue-600 text-white p-4 rounded-full mb-4">
            <FaBug size={28} />
          </div>

          <h1 className="text-3xl font-bold">
            Issue Tracker
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome Back
          </p>

        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>

            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text":"password"}
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full rounded-lg border p-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                className="absolute right-4 top-4 text-gray-500"
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash/>
                ) : (
                  <FaEye/>
                )}
              </button>

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white p-3 font-semibold"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
};

export default LoginPage;