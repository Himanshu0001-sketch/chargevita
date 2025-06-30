import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';

const testimonials = [
  {
    name: "Ritika Sharma",
    role: "Corporate Executive, Delhi",
    message:
      "ChargeVita's Hair Biotin Gummies have transformed my hair health! My strands feel stronger and shinier after just a month of use.",
  },
  {
    name: "Karan Verma",
    role: "Marketing Manager, Mumbai",
    message:
      "The Skin Care Gummies from ChargeVita are a game-changer. My skin looks visibly clearer and more radiant—even my colleagues noticed!",
  },
  {
    name: "Priya Nair",
    role: "Freelancer, Chennai",
    message:
      "I was skeptical at first, but after trying ChargeVita's Hair Biotin Gummies, I’ve seen significant reduction in hair fall and improved volume.",
  },
  {
    name: "Amit Joshi",
    role: "Software Engineer, Pune",
    message:
      "As someone who battles with dull skin, ChargeVita’s Skin Care Gummies gave me a natural glow and smoother complexion in just weeks.",
  },
];

const TestimonialSection = () => (
  <section className="py-12 px-6 bg-gray-50">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-700 mb-4">
        What Our Customers Are Saying
      </h2>
      <p className="text-gray-600 mb-10">
        Hear from real users who’ve experienced the benefits of our Hair Biotin Gummies and Skin Care Gummies.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-center mb-4">
              <div className="text-gray-400 text-4xl mr-3">
                <IoPersonCircle />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold text-gray-800">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">“{t.message}”</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
