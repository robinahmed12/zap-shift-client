import React from "react";
import Marquee from "react-fast-marquee";
import pic1 from "../assets/brands/amazon.png";
import pic2 from "../assets/brands/amazon_vector.png";
import pic3 from "../assets/brands/casio.png";
import pic4 from "../assets/brands/moonstar.png";
import pic5 from "../assets/brands/randstad.png";
import pic6 from "../assets/brands/start-people 1.png";
import pic7 from "../assets/brands/start.png";

const MarqueeSection = () => {
  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading with your color theme */}
        <h1 className="text-[#E30613] text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          We've helped thousands of sales teams
        </h1>

        {/* Brand Marquee */}
        <div className="mb-12 md:mb-16">
          <Marquee
            speed={40}
            pauseOnHover={true}
            gradient={true}
            gradientColor={[255, 255, 255]}
            gradientWidth={100}
          >
            {[pic1, pic2, pic3, pic4, pic5, pic6, pic7].map((pic, index) => (
              <div
                key={index}
                className="mx-4 md:mx-8 transition-all duration-300 hover:scale-110"
              >
                <img
                  src={pic}
                  alt={`Brand ${index + 1}`}
                  className="h-9 md:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
