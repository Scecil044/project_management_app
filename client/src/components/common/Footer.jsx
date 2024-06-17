import { Link } from "react-router-dom";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="text-xs text-white bg-appBlack p-2 md:p-4"></div>
      <div className="bg-appRed p-5 md:p-10 text-white text-sm">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="bg-white h-0.5"></div>
          <div className="py-5 flex flex-col md:flex-row gap-5 items-center">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-5">
              <div>
                <h1 className="font-semibold text-lg">Important Links</h1>
                <ul className="mt-2 flex flex-col gap-2">
                  <li>
                    <Link>About</Link>
                  </li>
                  <li>
                    <Link>Featured brands</Link>
                  </li>
                  <li>
                    <Link>Return policy</Link>
                  </li>
                  <li>
                    <Link>Contact_us</Link>
                  </li>

                  <li>
                    <Link>Support</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h1 className="font-semibold text-lg">Important Links</h1>
                <ul className="mt-2 flex flex-col gap-2">
                  <li>
                    <Link>About</Link>
                  </li>
                  <li>
                    <Link>Featured brands</Link>
                  </li>
                  <li>
                    <Link>Return policy</Link>
                  </li>
                  <li>
                    <Link>Contact_us</Link>
                  </li>

                  <li>
                    <Link>Support</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h1 className="font-semibold text-lg">Important Links</h1>
                <ul className="mt-2 flex flex-col gap-2">
                  <li>
                    <Link>About</Link>
                  </li>
                  <li>
                    <Link>Featured brands</Link>
                  </li>
                  <li>
                    <Link>Return policy</Link>
                  </li>
                  <li>
                    <Link>Contact_us</Link>
                  </li>

                  <li>
                    <Link>Support</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h1 className="font-semibold text-lg">Important Links</h1>
                <ul className="mt-2 flex flex-col gap-2">
                  <li>
                    <Link>About</Link>
                  </li>
                  <li>
                    <Link>Featured brands</Link>
                  </li>
                  <li>
                    <Link>Return policy</Link>
                  </li>
                  <li>
                    <Link>Contact_us</Link>
                  </li>

                  <li>
                    <Link>Support</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-[20%]"></div>
          </div>
          <div className="bg-white h-0.5"></div>
          <div className="flex items-center py-5">
            <div className="flex-1">
              <Link to="/" className="flex text-4xl items-center">
                <p className="text-4xl">T</p>
                <p>A</p>
                <p className="text-[#EDB518] font-semibold">SK</p>
                <p>PRO</p>
              </Link>
              <div className="my-5 flex flex-col">
                <span>&copy;SHOPITKE {new Date().getFullYear()}</span>
                <span>P.O.BOX 435-001, Nairobi-Kenya</span>
                <span>Online apparel shop</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="float-end md:mr-10">
                <h1 className="font-semibold text-lg my-2">Follow us on:</h1>
                <div className="flex items-center gap-5 ">
                  <Link>
                    <FaWhatsapp className="h-6 w-6" />
                  </Link>
                  <Link>
                    <FaTwitter className="h-6 w-6" />
                  </Link>
                  <Link>
                    <FaFacebook className="h-6 w-6" />
                  </Link>
                  <Link>
                    <FaSquareInstagram className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
