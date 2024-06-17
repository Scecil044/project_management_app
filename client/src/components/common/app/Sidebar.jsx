import { Link } from "react-router-dom";
import { sidebarAdminRoutes } from "../../../utils";
import { HiLogout } from "react-icons/hi";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import LogoutModal from "../LogoutModal";

export default function Sidebar() {
  const [toggleLogout, settoggleLogout] = useState(false);
  return (
    <div className="bg-appRed text-white w-[200px] px-1 py-3">
      <div className="flex flex-col gap-3">
        {sidebarAdminRoutes.map((route, index) => (
          <Link
            className="text-white w-full hover:bg-black/50 p-3 border-b border-white"
            key={index}
            to={route.path}
          >
            {route.name}
          </Link>
        ))}

        <div className="w-full flex">
          <button
            onClick={() => settoggleLogout(true)}
            className="w-full flex items-center justify-center text-white p-3 gap-1 hover:bg-black/50 transition-all duration-500 shadow-md hover:shadow-none"
          >
            Logout
            <HiLogout />
          </button>
        </div>
      </div>
      {toggleLogout && (
        <LogoutModal
          settoggleLogout={settoggleLogout}
          toggleLogout={toggleLogout}
        />
      )}
    </div>
  );
}
