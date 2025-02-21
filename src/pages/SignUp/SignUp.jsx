import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

import Logo from "../../assets/images/logo.png";
import GoogleImg from "../../assets/images/google.svg";

// Component
import Loading from "../../components/Loading/Loading";

// API
import { login } from "../../services/AuthServices";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(email, password);

      if (response?.data?.statusCode === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <>
        <Loading></Loading>
      </>
    );

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center h-screen px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-sm md:max-w-md p-8">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="w-20 md:w-28 mb-4">
            <img src={Logo} alt="Logo" />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-secondary font-semibold text-blue-600 mb-2">
            Grade Portal Of HCMUT
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Please enter email and password
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
            <input
              className="p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                className="p-3 w-full border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>

            <div className="relative">
              <input
                className="p-3 w-full border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </div>
            </div>

            <button className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium flex items-center justify-center transition-all shadow-md">
              <span>Sign in</span>
              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-2" />
            </button>
          </form>

          {/* OR LOGIN WITH */}
          <div className="my-4 text-gray-500 text-sm">- OR LOGIN WITH -</div>

          {/* Google Login */}
          <button className="bg-white border border-gray-300 p-2 rounded-full flex justify-center items-center text-sm hover:shadow-md transition-transform duration-300">
            <img src={GoogleImg} alt="Google" className="h-6" />
          </button>

          {/* Sign Up Link */}
          <div className="mt-5 text-xs flex justify-center items-center">
            <span className="text-gray-600 mr-1">
              {"Already have an account?"}
            </span>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
