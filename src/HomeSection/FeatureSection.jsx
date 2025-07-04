import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Live Parcel Tracking",
      description:
        "Real-time updates on your package location from pickup to delivery",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
    },
    {
      title: "100% Safe Delivery",
      description:
        "Guaranteed secure handling with insurance options available",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "24/7 Call Center Support",
      description: "Round-the-clock assistance for all your delivery queries",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#E30613" }}
          >
            Swift Deliveries, Seamless Experience
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#000000" }}>
            Trusted by thousands for reliable, fast, and secure parcel delivery
            services nationwide
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              {/* Vertical dotted divider - only shown between items on desktop */}
              {index !== 0 && (
                <div className="hidden md:block absolute top-0 left-0 bottom-0 w-px">
                  <div className="h-full mx-auto border-l-2 border-dotted border-gray-300"></div>
                </div>
              )}

              <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-50 h-full">
                <div
                  className="mb-4 p-3 rounded-full"
                  style={{ color: "#E30613" }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#000000" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
                <div className="mt-4 w-12 h-1 bg-yellow-500 transform group-hover:scale-x-125 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
