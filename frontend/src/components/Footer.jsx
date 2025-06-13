import React from 'react';
import { FaCcVisa, FaCcMastercard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';
import imageone from "../assets/image/chargevitalogo.png";
import picone from '../assets/image/p1.png';
import pictwo from '../assets/image/p2.png';
import picthree from '../assets/image/p3.png';
import picfour from '../assets/image/p4.png';

const Footer = () => {
  return (
    <footer className="bg-[#f4eff6] text-gray-700 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Trustpilot */}
        <div>
          <h1 className="text-2xl font-bold text-orange-500 mb-2 uppercase">
            ChargeVita
          </h1>
          <div className="flex items-center mt-4 space-x-2">
            <img
              src={imageone}
              alt="Trustpilot"
              className="h-15"
            />
            <span className="text-sm">Trustscore 4.0 | 9,200 reviews</span>
          </div>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-bold mb-2">Company</h2>
          <ul className="space-y-1 text-sm">
            <li>About us</li>
            <li>Privacy policy</li>
            <li>Terms & conditions</li>
          </ul>
        </div>

        {/* Shipping services */}
        <div>
          <h2 className="font-bold mb-2">Shipping services</h2>
          <ul className="space-y-1 text-sm">
            <li>Couriers</li>
            <li>Delivery services</li>
          </ul>
        </div>

        {/* Customers */}
        <div>
          <h2 className="font-bold mb-2">Customers</h2>
          <ul className="space-y-1 text-sm">
            <li>Contact us</li>
            <li>Support hub</li>
          </ul>
        </div>
      </div>

      <hr className="my-8" />

      {/* 4 Key Features Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center text-sm gap-4">
        <p>🚚 Delivered within 7 days</p>
        <p>🔒 100% Secure Checkout</p>
        <p>🌍 Outstanding  Support</p>
        <p>⭐ Over 9,000 Genuine Reviews</p>
      </div>

      <hr className="my-6" />

      {/* Footer Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <img src="https://flagcdn.com/in.svg" className="h-4" alt="IN" />
          <span>India</span>
        </div>
        <p>Copyright © 2025 | All Rights Reserved</p>
       {/*  <div className="flex items-center justify-center space-x-4">
          <img src={picone} alt="Visa" className="h-8 w-auto" />
          <img src={pictwo} alt="Mastercard" className="h-8 w-auto" />
          <img src={picthree} alt="PayPal" className="h-8 w-auto" />
          <img src={picfour} alt="Google Pay" className="h-8 w-auto" />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
