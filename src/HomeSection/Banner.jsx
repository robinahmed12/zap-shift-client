import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pic1 from "../assets/banner/slider02.jpg";
import pic2 from "../assets/banner/slide-1.jpg";
import pic3 from "../assets/banner/slider-bg-01.jpg";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

const Banner = () => {
  const slides = [
    {
      image: pic1,
      title: "Instant Delivery",
      subtitle: "Get your parcels delivered within hours",
      features: ["Same-day delivery", "Real-time tracking", "24/7 support"],
      cta: "Order Now",
      link: "/instant-delivery",
      bgOverlay: "rgba(227, 6, 19, 0.3)", // Red with opacity
    },
    {
      image: pic2,
      title: "Premium Service",
      subtitle: "Exclusive handling for your valuable items",
      features: [
        "White-glove service",
        "Insurance included",
        "Priority handling",
      ],
      cta: "Upgrade Now",
      link: "/premium-service",
      bgOverlay: "rgba(0, 0, 0, 0.3)", // Black with opacity
    },
    {
      image: pic3,
      title: "Emergency Delivery",
      subtitle: "When time is of the essence",
      features: [
        "Dedicated courier",
        "Express processing",
        "Guaranteed timelines",
      ],
      cta: "Urgent Delivery",
      link: "/emergency-delivery",
      bgOverlay: "rgba(255, 215, 0, 0.3)", // Gold with opacity
    },
  ];

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      showArrows={true}
      interval={5000}
      transitionTime={1000} // Slower transition between slides
      className="rounded-lg overflow-hidden shadow-lg"
    >
      {slides.map((slide, index) => (
        <div key={index} className="relative">
          {/* Only animate the current slide */}
          <motion.div
            key={`image-${index}`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
            className="w-full h-[300px] md:h-[600px] overflow-hidden"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay with gradient and solid color */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${slide.bgOverlay} 0%, transparent 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1
                  className="text-2xl md:text-4xl font-bold mb-2"
                  style={{ color: "#E30613" }}
                >
                  <TypeAnimation
                    sequence={[slide.title, 1000, "", 500]}
                    wrapper="span"
                    cursor={true}
                    speed={30}
                    repeat={Infinity} // Infinite animation
                    style={{ display: "inline-block" }}
                  />
                </h1>
                <h2
                  className="text-xl md:text-2xl font-semibold mb-4"
                  style={{ color: "#FFFFFF" }}
                >
                  {slide.subtitle}
                </h2>

                <ul className="mb-6 hidden sm:block">
                  {slide.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.3 }}
                      className="flex items-center mb-2"
                    >
                      <span className="mr-2" style={{ color: "#FFD700" }}>
                        ✓
                      </span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    to={slide.link}
                    className={`px-6 py-3 rounded-md font-bold text-lg shadow-lg ${
                      index === 0
                        ? "bg-[#E30613] hover:bg-[#C00511] text-white" // Red button
                        : index === 1
                        ? "bg-[#000000] hover:bg-[#333333] text-white" // Black button
                        : "bg-[#FFD700] hover:bg-[#E6C200] text-black" // Gold button
                    } transition-colors duration-300`}
                  >
                    {slide.cta}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
