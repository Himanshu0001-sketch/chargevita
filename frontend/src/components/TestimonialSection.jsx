import React from 'react';
import { IoPersonCircle } from 'react-icons/io5'; // 👈 Import user icon

const testimonials = [
  {
    name: "Sneha Kapoor",
    role: "Health Enthusiast, Bangalore",
    message:
      "ChargeVita supplements have become part of my daily routine. I feel more energetic and focused since I started using their multivitamins.",
  },
  {
    name: "Raj Mehta",
    role: "Fitness Trainer, Mumbai",
    message:
      "I always recommend ChargeVita’s gummies to my clients. They're tasty, effective, and easy to incorporate into a busy lifestyle.",
  },
  {
    name: "Aisha Rahman",
    role: "Working Professional, Delhi",
    message:
      "Balancing work and health is tough, but ChargeVita’s probiotic tablets and sleep gummies have truly made a difference in my wellbeing.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-600 mb-6">What Our Customers Say</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Trusted by thousands of happy clients across India. Here's what a few of them have to say about their experience with ChargeVita.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 border border-purple-100 hover:shadow-xl transition"
            >
              <div className="flex items-center mb-4">
                <div className="text-gray-500 text-5xl mr-4">
                  <IoPersonCircle /> {/* 👈 User icon here */}
                </div>
                <div className="text-left">
                  <h4 className="text-md font-semibold text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">"{t.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
