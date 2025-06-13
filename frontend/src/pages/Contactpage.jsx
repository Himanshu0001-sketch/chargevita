import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaGlobe,
  FaClock,
  FaAmazon,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-4 sm:px-8 lg:px-24 mt-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg">
            Have a question or need help with an order? We’re here to assist you.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-green-500 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-1">Office Address</h4>
                <p className="text-gray-700">
                  24/1, Ronak Park, Opp. Dayaram Textile, Shahwadi, Narol,
                  Ahmedabad, Gujarat – 382405
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-blue-500 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-1">Phone</h4>
                <a
                  href="tel:+919998681097"
                  className="text-gray-700 hover:underline"
                >
                  +91 99986 81097
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-orange-500 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-1">Email</h4>
                <a
                  href="mailto:feelfree@chargevita.in"
                  className="text-gray-700 hover:underline"
                >
                  feelfree@chargevita.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaGlobe className="text-gray-500 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-1">Website</h4>
                <a
                  href="https://www.chargevita.in"
                  className="text-gray-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.chargevita.in
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaInstagram className="text-pink-600 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-1">Instagram</h4>
                <a
                  href="https://www.instagram.com/chargevita.in"
                  className="text-gray-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @chargevita.in
                </a>{" "}
                (coming soon)
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaAmazon className="text-gray-700 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-1">Amazon Storefront</h4>
                <p className="text-gray-700">
                  Available soon on Amazon for convenient shopping.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaClock className="text-purple-500 text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold mb-1">Support Hours</h4>
                <p className="text-gray-700">
                  Mon – Sat: 10:00 AM to 6:00 PM
                  <br />
                  (Closed on Sundays and public holidays)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-sm text-gray-500 mt-12">
          &copy; {new Date().getFullYear()} ChargeVita. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
