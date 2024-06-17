import { Route, Routes } from "react-router-dom";
import GuestLayout from "./components/layouts/GuestLayout";
import AuthenticationLayout from "./components/layouts/AuthenticationLayout";
import AppLayout from "./components/layouts/AppLayout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<GuestLayout />} />
        <Route path="/auth/*" element={<AuthenticationLayout />} />
        <Route path="/app/*" element={<AppLayout />} />
      </Routes>
    </>
  );
}
