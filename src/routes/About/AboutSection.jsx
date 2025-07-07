import React from "react";
import { Truck, Shield, Clock, Users, Target, Award } from "lucide-react";

const AboutSection = () => {
  const stats = [
    {
      number: "50K+",
      label: "Parcels Delivered",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      number: "99.8%",
      label: "Success Rate",
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: "24/7",
      label: "Customer Support",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      number: "5K+",
      label: "Happy Customers",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const features = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Secure & Reliable",
      description:
        "Advanced security protocols and insurance coverage ensure your packages are protected throughout the delivery process.",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Real-Time Tracking",
      description:
        "Track your parcels in real-time with instant updates and notifications at every stage of delivery.",
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Premium Service",
      description:
        "Professional courier network with multiple delivery options to meet your specific timing and budget needs.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-300 hover:scale-105"
            style={{ color: "#E30613" }}
          >
            About Our Service
          </h2>
          <div
            className="w-24 h-1 mx-auto mb-8 transition-all duration-300 hover:w-32"
            style={{ backgroundColor: "#FFD700" }}
          ></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Your trusted partner for efficient, transparent, and reliable parcel
            delivery services
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                Streamlining Package Delivery
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We've revolutionized the parcel delivery experience with our
                user-friendly online platform. Our system seamlessly connects
                senders with reliable courier services, ensuring your packages
                reach their destination safely and on time.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                From individual shipments to business logistics, we provide
                comprehensive solutions that include address validation, secure
                payment processing, and complete administrative control for
                managing all your delivery needs.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="px-8 py-4 font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg"
                  style={{ backgroundColor: "#E30613" }}
                >
                  Start Shipping Now
                </button>
                <button
                  className="px-8 py-4 font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg"
                  style={{ backgroundColor: "#000000" }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4"
                style={{ borderLeftColor: "#FFD700" }}
              >
                <div className="flex items-center justify-center mb-4 text-gray-600">
                  {stat.icon}
                </div>
                <div className="text-center">
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: "#E30613" }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Why Choose Our Service?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-center group"
              >
                <div className="flex justify-center mb-6 text-gray-600 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-black group-hover:text-opacity-80 transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center transform transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Our Mission
          </h3>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            To provide individuals and businesses with a seamless, efficient,
            and transparent parcel delivery experience that exceeds expectations
            through innovative technology and exceptional service.
          </p>
          <button
            className="px-10 py-4 font-semibold text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg"
            style={{ backgroundColor: "#FFD700" }}
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
