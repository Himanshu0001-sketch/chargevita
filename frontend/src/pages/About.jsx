import React from "react";
import {
  FaInstagram,
  FaFlask,
  FaLeaf,
  FaSmile,
} from "react-icons/fa";
import { GiIndiaGate, GiEnergyShield } from "react-icons/gi";
import { MdLocalPharmacy, MdHealthAndSafety, MdNightlight } from "react-icons/md";
import { GiStomach } from "react-icons/gi";

const AboutPage = () => {
  return (
    <section className="bg-white py-14 px-4 md:px-20 text-gray-800 mt-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6 text-center">
          ABOUT US - ChargeVita
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-10">
          Welcome to ChargeVita, your trusted partner in health and wellness.
        </p>

        {/* Intro */}
        <p className="text-md md:text-lg mb-6">
          We are an Indian wellness brand based in <strong>Ahmedabad, Gujarat</strong>,
          offering a unique range of <strong>effervescent tablets</strong> and{" "}
          <strong>gummies</strong> designed to support your daily health needs—
          <em>naturally and effectively</em>.
        </p>

        {/* Mission */}
        <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2 text-green-600">
            <MdHealthAndSafety className="text-green-500 text-3xl" /> Our Mission
          </h2>
          <p>
            To empower people to live healthier lives by providing safe,
            science-backed, and easy-to-consume supplements that truly make a difference.
          </p>
        </div>

        {/* What Makes Us Unique */}
        <h2 className="text-xl font-semibold text-orange-600 mb-4">
          What Makes Us Unique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="flex gap-4 items-start">
            <FaFlask className="text-blue-500 text-3xl" />
            <div>
              <h3 className="font-semibold text-lg">Scientifically Formulated</h3>
              <p>Made with high-quality ingredients backed by science.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <MdLocalPharmacy className="text-yellow-500 text-3xl" />
            <div>
              <h3 className="font-semibold text-lg">Effervescent & Gummies</h3>
              <p>Better absorption and taste with modern supplement formats.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <FaLeaf className="text-green-600 text-3xl" />
            <div>
              <h3 className="font-semibold text-lg">No Added Sugar</h3>
              <p>Formulated without added sugar in many of our products.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <GiIndiaGate className="text-red-600 text-3xl" />
            <div>
              <h3 className="font-semibold text-lg">Made in India</h3>
              <p>Proudly Indian brand, manufactured to meet global quality standards.</p>
            </div>
          </div>
        </div>

        {/* Product Support */}
        <h2 className="text-xl font-semibold text-orange-600 mb-4">
          Our Products Support
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-disc pl-5 text-gray-700">
          <li className="flex items-center gap-2">
            <GiEnergyShield className="text-purple-500 text-3xl" />
            Energy & Immunity
          </li>
          <li className="flex items-center gap-2">
            <GiStomach className="text-orange-500 text-3xl" />
            Digestion & Gut Health
          </li>
          <li className="flex items-center gap-2">
            <FaSmile className="text-yellow-400 text-3xl" />
            Skin & Hair Wellness
          </li>
          <li className="flex items-center gap-2">
            <MdNightlight className="text-indigo-500 text-3xl" />
            Stress Relief & Sleep
          </li>
        </ul>

        {/* Final CTA */}
        <p className="text-md md:text-lg mt-6">
          From daily health maintenance to targeted wellness support, ChargeVita is here
          to recharge your vitality—<strong>one tablet at a time</strong>.
        </p>

        {/* Connect with Us */}
        <div className="mt-10 text-center">
          <p className="text-gray-700 text-lg">Connect with us on:</p>
          <a
            href="https://www.instagram.com/chargevita.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-orange-500 font-medium hover:underline"
          >
            <FaInstagram className="text-xl" />
            @chargevita.in
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
