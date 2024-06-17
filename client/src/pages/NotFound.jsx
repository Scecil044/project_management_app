import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center inset-0 w-full h-full z-50 min-h-screen">
      <div className="flex flex-col md:flex-row gap-3 mdgap-5">
        <div>
          <h1 className="text-4xl md:text-6xl text-appRed font-semibold">
            4O4
          </h1>
        </div>
        <div className="flex flex-col gap-1">
          <h1>Page not found</h1>
          <h3>Check your url and refresh this page</h3>
          <div className="my-3">
            <Link
              to="/app/dashboard"
              className="py-3 px-8 bg-appRed text-white hover:opacity-85 transition-all duration-300 shadow-lg"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
