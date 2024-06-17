import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes } from "../../routes";
import { useSelector } from "react-redux";

export default function AuthenticationLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <Navigate to="/" />
  ) : (
    <>
      <Routes>
        {authRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </>
  );
}
