import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  authFulfilledState,
  authPendingState,
  authRejectedState,
} from "../../redux/authSlice";
import Register from "./Register";

export default function Login() {
  const [openRegister, setOpenRegister] = useState(false);
  const [formData, setFormData] = useState({});
  const { isLoading, isError, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setEmailError("The email field is required");
    } else {
      setEmailError(false);
    }
    if (!formData.password) {
      setPasswordError("The Password field is required");
      return;
    } else {
      setPasswordError(false);
    }
    dispatch(authPendingState());
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(authRejectedState(data.message));
      return;
    }
    dispatch(authFulfilledState(data));
    navigate("/app/dashboard");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[480px] shadow-md p-5 md:p-7 bg-white rounded-md"
      >
        <h1 className="text-xl text-neutral-400">Login to your account</h1>
        <h2 className="text-lg text-neutral-400 mb-2">Welcome back!</h2>
        <div className="mb-4 flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="px-2 py-2 border-gray-400  border w-full"
          />
          {emailError && !formData.email && (
            <span className="text-red-600 text-xs">{emailError}</span>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="px-2 py-2 border-gray-400  border w-full"
          />
          {passwordError && !formData.password && (
            <span className="text-red-600 text-xs">{passwordError}</span>
          )}
        </div>
        <button
          disabled={isLoading}
          className="bg-appRed disabled:cursor-not-allowed text-white p-2 flex items-center justify-center gap-2 mb-3 shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-85"
        >
          {isLoading && (
            <div className="border-r-2 border-b-2 border-white rounded-full h-5 w-5 animate-spin"></div>
          )}
          Submit
        </button>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <p>Dont have an account?</p>
            <button
              onClick={() => setOpenRegister(true)}
              className="text-blue-600"
            >
              Sign Up
            </button>
          </span>
          <Link className="text-blue-700">Forgot Password?</Link>
        </div>
        <div className="text-center text-sm mt-4 text-neutral-500">
          <div>Continuing means you agree to this applications</div>
          <Link>Terms of service and usage</Link>
        </div>
      </form>
      {openRegister && <Register setOpenRegister={setOpenRegister} />}
    </div>
  );
}
