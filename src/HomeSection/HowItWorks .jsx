import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-center sm:text-4xl font-bold mb-2 text-[#E30613]">
          How Our Service Works
        </h2>
        <div className="text-center">
          <p className="text-lg text-[#000000] mb-12">
            Simple steps to get your parcels delivered quickly and securely
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <Link
            to="/booking"
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="p-6">
              <div className="w-16 h-16 bg-[#E30613] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700] group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#000000] mb-2 group-hover:text-[#E30613] transition-colors duration-300">
                Seamless Booking
              </h3>
              <p className="text-gray-600">
                Schedule pickups and deliveries with our easy-to-use interface.
                Choose time slots that work for you.
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            to="/cash-delivery"
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="p-6">
              <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700] group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#000000] mb-2 group-hover:text-[#E30613] transition-colors duration-300">
                Flexible Payments
              </h3>
              <p className="text-gray-600">
                Pay when your package arrives with our secure cash on delivery
                option or prepay online.
              </p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            to="/delivery-hub"
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="p-6">
              <div className="w-16 h-16 bg-[#E30613] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700] group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#000000] mb-2 group-hover:text-[#E30613] transition-colors duration-300">
                Smart Hub Network
              </h3>
              <p className="text-gray-600">
                Our strategically located hubs ensure your package takes the
                fastest route to its destination.
              </p>
            </div>
          </Link>

          {/* Card 4 */}
          <Link
            to="/corporate"
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="p-6">
              <div className="w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFD700] group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#000000] mb-2 group-hover:text-[#E30613] transition-colors duration-300">
                Business Solutions
              </h3>
              <p className="text-gray-600">
                Specialized services for SMEs and corporations with bulk
                discounts and dedicated account managers.
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/get-started"
            className="inline-block px-8 py-3 bg-[#E30613] text-white font-bold rounded-lg hover:bg-[#FFD700] hover:text-[#000000] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
