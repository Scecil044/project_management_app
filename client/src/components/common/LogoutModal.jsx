import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../../redux/authSlice";

export default function LogoutModal({ settoggleLogout, toggleLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setisError] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setisLoading(true);
      setisError(false);
      const res = await fetch("/api/v1/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        setisError(data.message);
        setisLoading(false);
        return;
      }
      if (res.ok) {
        dispatch(logoutUser());
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
      setisError(error.message);
      setisLoading(false);
    }
  };
  return (
    <div className="fixed flex inset-0 items-center h-full w-full justify-center bg-black/50 text-sm">
      <div className="p-3 bg-white w-[80%] md:w-[25%] ml-8 md:ml-0 text-black text-center">
        <h1>You are about to logout from the portal</h1>
        <h2>Proceed anyway?</h2>
        <div className="my-3 flex items-center gap-5 justify-center">
          <button
            disabled={isLoading}
            onClick={() => settoggleLogout(false)}
            type="button"
            className="py-2 px-6 hover:bg-appRed hover:text-white shadow-md disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className="py-2 px-6 hover:bg-appRed hover:text-white shadow-md disabled:cursor-not-allowed"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
