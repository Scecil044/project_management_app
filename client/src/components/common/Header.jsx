import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch("/api/v1/auth/logout");
      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        setIsError(data.message);
        return;
      }
      if (res.ok) {
        dispatch(logoutUser());
        setIsLoading(false);
        setIsError(false);
        navigate("/");
      }
    } catch (error) {
      setIsError(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <header className="w-full shadow-lg bg-appRed text-white flex items-center justify-between min-h-14 p-5">
        <div>
          <Link className="text-lg">Logo</Link>
        </div>
        <nav className="hidden md:inline-flex">
          <ul className="flex items-center gap-5">
            {!user && (
              <>
                <li>
                  <Link to="/auth/login">Login</Link>
                </li>
                {/* <li>
                  <Link to="/auth/register">Sign Up</Link>
                </li> */}
              </>
            )}
            {user && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
