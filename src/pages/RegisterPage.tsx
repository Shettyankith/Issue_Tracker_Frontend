import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBug, FaEye, FaEyeSlash } from "react-icons/fa";

import { registerUser } from "../api/auth.api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  const [loading,setLoading]=useState(false);

  const [showPassword,setShowPassword]=useState(false);

  const [error,setError]=useState("");

  const handleSubmit=async(
    e:React.FormEvent<HTMLFormElement>
  )=>{

    e.preventDefault();

    if(password!==confirmPassword){
      setError("Passwords do not match.");
      return;
    }

    try{

      setLoading(true);
      setError("");

      await registerUser(
        name,
        email,
        password
      );

      navigate("/login");

    }catch(err:any){

      setError(
        err.response?.data?.message ||
        "Registration failed."
      );

    }finally{
      setLoading(false);
    }

  }

  return(
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

        <div className="text-center mb-8">

          <div className="inline-flex bg-blue-600 text-white p-4 rounded-full mb-4">
            <FaBug size={26}/>
          </div>

          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Start managing issues
          </p>

        </div>

        {error&&(
          <div className="bg-red-100 text-red-600 rounded p-3 mb-5">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2">
              Name
            </label>

            <input
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full border rounded-lg p-3 pr-12"
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={()=>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? <FaEyeSlash/>
                  : <FaEye/>
                }
              </button>

            </div>

          </div>

          <div>

            <label className="block mb-2">
              Confirm Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              value={confirmPassword}
              onChange={(e)=>
                setConfirmPassword(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg p-3 font-semibold"
          >
            {loading
              ? "Creating Account..."
              : "Register"
            }
          </button>

        </form>

        <p className="mt-6 text-center text-sm">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default RegisterPage;