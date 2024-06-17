import { Navigate, Route, Routes } from "react-router-dom";
import { guestRoutes } from "../../routes";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { useSelector } from "react-redux";
export default function GuestLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <Navigate to="/app/dashboard" />
  ) : (
    <>
      <Header />
      <div className="min-h-screen">
        <Routes>
          {guestRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </div>
      <Footer />
    </>
  );
}
