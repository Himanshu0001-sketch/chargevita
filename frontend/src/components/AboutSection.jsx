import React from "react";
import aboutImage from "../assets/image/circleimage.webp";

const AboutSection = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left: Image */}
        <div className="w-full md:w-1/2">
          <img
            src={aboutImage}
            alt="About ChargeVita"
            className="w-full max-w-[400px] mx-auto md:max-w-full h-auto object-contain animate-spin"
          />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 text-justify">
          <h2 className="text-sm md:text-base font-bold text-orange-500 mb-4 uppercase tracking-wider">
            About Us
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            At ChargeVita, we believe that true energy and vitality begin with complete nourishment. Our mission is to provide premium wellness solutions that not only support your health goals but also complement your everyday lifestyle. Whether you're an active professional, a wellness enthusiast, or someone simply looking to boost their immunity, ChargeVita has something crafted for you.
          </p>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            Our formulations are built on a foundation of clinical research and clean ingredients, free from unnecessary additives. We aim to deliver not just supplements, but trust and transparency in every bottle.
          </p>
          <ul className="list-disc pl-5 text-gray-700 text-base space-y-2 break-words">
            <li>Formulated by health experts and backed by science</li>
            <li>GMP-certified, Non-GMO, and gluten-free ingredients</li>
            <li>Focused on clean labels and transparent sourcing</li>
            <li>Designed to improve immunity, energy, skin, gut, and sleep health</li>
            <li>Proudly made with care to support holistic well-being</li>
          </ul>
          <p className="text-gray-700 text-base mt-4">
            Join the ChargeVita family and take your wellness journey to the next level — naturally, confidently, and with purpose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
