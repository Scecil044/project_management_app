import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-scroll";

export default function Home() {
  const founders = [
    {
      name: "Jude Belligha,",
      position: "CEO",
      joined: "12th May 2012",
      avatar: "/member.png",
    },
    {
      name: "Saline Jayne,",
      position: "Treasurer",
      joined: "12th May 2012",
      avatar: "/member.png",
    },
    {
      name: "William Sliba,",
      position: "Marketer",
      joined: "12th May 2012",
      avatar: "/member.png",
    },
    {
      name: "Stevens,",
      position: "Coordinator",
      joined: "12th June 2012",
      avatar: "/member.png",
    },
  ];

  return (
    <>
      <div className="h-full">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 overflow-hidden relative">
          <img
            src="/office.webp"
            alt="pic"
            className="w-full object-cover object-top"
          />
          <div className="absolute bg-gradient-to-tr from-appBlue to-pink-600/50 w-full h-full inset-0">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-white text-lg sm:text-xl font-semibold uppercase md:text-3xl lg:w-[45%] py-14 px-5">
                Streamline your projects with ProjectPro
              </h1>
              <h1 className="text-white text-lg">
                Welcome to ProjectPro, the ultimate solution for managing your
                projects efficiently and effectively. Our platform is designed
                to help teams collaborate seamlessly, track progress, and
                achieve goals faster.
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-4 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-[20%] px-5">
              <ul className="flex flex-col gap-2">
                <li className="border-l-4 border-appBlue pl-2">
                  <Link
                    to="history"
                    duration={500}
                    smooth={true}
                    className="text-lg mb-2 cursor-pointer"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="vision"
                    duration={500}
                    smooth={true}
                    className="text-lg mb-2 cursor-pointer"
                  >
                    Our Vision
                  </Link>
                </li>
                <li>
                  <Link
                    to="mission"
                    duration={500}
                    smooth={true}
                    className="text-lg mb-2 cursor-pointer"
                  >
                    Our Mission
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="mb-5 px-5">
                <h1 className="font-semibold text-2xl mb-2" name="history">
                  Our History
                </h1>
                <p>
                  Our firm was established by a team of seasoned professionals
                  who previously led the executive team at a top asset
                  management company in the region. During our tenure, we
                  achieved remarkable success, growing profitability by over 10
                  times, tripling our assets under management, and propelling
                  the firm from the 6th to the 1st position in the East-African
                  region based on revenue. After this outstanding performance,
                  we decided to create an independent firm with a singular
                  focus: serving the interests of our clients and investors. We
                  are driven by a firm belief that prioritizing our clients'
                  needs, putting their interests above our own, and favoring
                  long-term benefits over short-term gains will lead to mutual
                  success. When our clients thrive, so do we. Join us as we
                  continue to build on our legacy of success, dedicated to
                  helping you achieve your financial goals with integrity and
                  commitment.
                </p>
              </div>

              <div className="mb-5 w-full relative h-[300px] overflow-hidden">
                <img
                  src="/pic2.jpg"
                  alt="office"
                  className="object-cover h-[300px] w-full"
                />
                <div className="absolute bg-gradient-to-tl from-appBlue to-pink-500/50 w-full inset-0"></div>
                <div className="group absolute bottom-0 right-0">
                  <Link
                    to="team"
                    duration={600}
                    smooth={true}
                    className="text-white py-4 px-4 flex items-center gap-1 cursor-pointer"
                  >
                    Meet the team
                    <FaArrowRightLong className="h-5 w-6 group-hover:rotate-90 transition-all duration-200 hover:tracking-tight tracking-wider" />
                  </Link>
                </div>
              </div>
              <div className="mb-5 pb-5 px-5">
                <h1 className="font-semibold text-2xl mb-2">Who we are</h1>
                <p className="">
                  Our team of professionals, formerly the executive leadership
                  of a leading asset management company in our region, achieved
                  significant milestones during our tenure. We increased
                  profitability by over tenfold, grew assets more than
                  threefold, and elevated the firm to the top position in the
                  East African region by revenue. With a strong commitment to
                  professionalism, we have transitioned to establish an
                  independent firm solely focused on prioritizing the interests
                  of our clients and investors. This dedication compels us to
                  wake up every day with a steadfast commitment to putting our
                  clients' needs first, emphasizing long-term gains over
                  short-term benefits. We measure our success by the success of
                  our clients, ensuring that when they thrive, we thrive
                  alongside them.
                </p>
              </div>

              <div className="mb-5 pb-5 px-5">
                <h1 className="font-semibold text-2xl mb-2" name="vision">
                  Our Vision
                </h1>
                <p className="">
                  Our firm was established by a team of professionals who
                  previously worked together as the executive team at a leading
                  asset management company in the region. During their tenure,
                  they achieved remarkable success, increasing profitability by
                  over 10 times, growing assets by more than 3 times, and
                  elevating the firm from the 6th to the 1st position in the
                  East-African region by revenues. With this success, the team
                  set out to create an independent firm focused solely on
                  serving the interests of clients and investors. We firmly
                  believe that by waking up every day and prioritizing our
                  clients' interests, putting their needs ahead of our own, and
                  favoring long-term gains over short-term benefits, our clients
                  will thrive. And when our clients do well, we do well too.
                </p>
              </div>

              <div className="mb-5 pb-5 px-5">
                <h1 className="font-semibold text-2xl mb-2" name="mission">
                  Our Mission
                </h1>
                <p className="">
                  Our project management application aims to empower street
                  children by offering essential support and opportunities. We
                  are committed to breaking the cycle of poverty and
                  exploitation they face. Through outreach initiatives,
                  educational programs, and active community engagement, our
                  goal is to foster an environment where every child can
                  experience safety and growth. We believe in providing a
                  platform that enables these children to thrive, ensuring they
                  receive the necessary resources and guidance to achieve their
                  potential. Together, we strive to create lasting positive
                  impact and change for the future generation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          name="team"
          className="w-full bg-gradient-to-br from-appBlue to-pink-500 p-3 text-white flex flex-col gap-2"
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 px-5">
            {founders?.map((founder, index) => (
              <div key={index} className="flex gap-2 items-center">
                <img
                  src={founder.avatar}
                  alt="pic"
                  className="object-cover rounded-full w-24 h-24 md:h-28 md:w-28"
                />
                <div className="text-sm">
                  <h1>{founder.name}</h1>
                  <p>{founder.position}</p>
                  <p>Since {founder.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
