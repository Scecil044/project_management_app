import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { appRoutes } from "../../routes";
import AppHeader from "../common/app/AppHeader";
import AppFooter from "../common/app/AppFooter";
import Sidebar from "../common/app/Sidebar";
export default function AppLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <>
      <AppHeader />
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="bg-linen flex-1 p-10">
          <Routes>
            {appRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </main>
      </div>
      <AppFooter />
    </>
  ) : (
    <Navigate to="/auth/login" />
  );
}
