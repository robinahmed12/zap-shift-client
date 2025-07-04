import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: "🚚",
      title: "Express & Standard Delivery",
      description:
        "Choose between fast express or cost-effective standard delivery options tailored to your needs.",
      link: "/services/express-delivery",
    },
    {
      id: 2,
      icon: "🌐",
      title: "Nationwide Delivery",
      description:
        "Reliable delivery services covering every corner of the country with guaranteed timeframes.",
      link: "/services/nationwide-delivery",
    },
    {
      id: 3,
      icon: "📦",
      title: "Fulfillment Solution",
      description:
        "End-to-end logistics solutions including storage, packing, and shipping for your business.",
      link: "/services/fulfillment",
    },
    {
      id: 4,
      icon: "💵",
      title: "Cash on Home Delivery",
      description:
        "Secure cash collection service with proof of delivery for your peace of mind.",
      link: "/services/cash-delivery",
    },
    {
      id: 5,
      icon: "🏢",
      title: "Corporate Logistics",
      description:
        "Custom contract logistics solutions designed for businesses with regular shipping needs.",
      link: "/services/corporate",
    },
    {
      id: 6,
      icon: "↩️",
      title: "Smart Parcel Return",
      description:
        "Hassle-free return services with automated pickup scheduling and tracking.",
      link: "/services/returns",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl text-center font-bold mb-2 text-[#E30613]">
          Our Delivery Services
        </h2>
        <h3 className="text-xl text-center mb-8 text-black">
          Reliable solutions for all your shipping needs
        </h3>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link to={service.link} key={service.id} className="group block">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200 hover:border-[#E30613]">
                <div className="text-4xl mb-4 group-hover:text-[#FFD700] transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-black group-hover:text-[#E30613] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <button className="bg-[#E30613] hover:bg-[#FFD700] text-white hover:text-black px-4 py-2 rounded-md transition-all duration-300 font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/get-quote"
            className="bg-[#E30613] hover:bg-[#c80511] text-white px-6 py-3 rounded-md text-center font-bold transition-colors duration-300"
          >
            Get Instant Quote
          </Link>
          <Link
            to="/contact"
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md text-center font-bold transition-colors duration-300"
          >
            Contact Our Team
          </Link>
          <Link
            to="/premium"
            className="bg-[#FFD700] hover:bg-[#e6c200] text-black px-6 py-3 rounded-md text-center font-bold transition-colors duration-300"
          >
            Premium Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
