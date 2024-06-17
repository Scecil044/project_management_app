import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AppHeader() {
  const { user } = useSelector((state) => state.auth);
  return (
    <header className="w-full flex items-center justify-between min-h-12 p-5 shadow-lg bg-appRed text-white shadow-gray-400">
      <Link to="/app/dashboard" className="flex text-4xl items-center">
        <p className="text-4xl">T</p>
        <p>A</p>
        <p className="text-[#EDB518] font-semibold">SK</p>
        <p>PRO</p>
      </Link>
      <div>
        <img
          src={
            user?.profilePicture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s"
          }
          alt="avatar"
          className="rounded-full h-8 w-8"
        />
      </div>
      <button className="flex md:hidden">
        <GiHamburgerMenu className="h-5 w-5" />
      </button>
    </header>
  );
}
