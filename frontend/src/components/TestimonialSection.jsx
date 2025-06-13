import React from 'react';

const testimonials = [
  {
    name: "Aarav Malhotra",
    role: "Entrepreneur, Delhi",
    message:
      "ChargeVita has completely changed the way I manage shipments. Super fast delivery and reliable customer support!",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Small Business Owner, Mumbai",
    message:
      "As a startup, I was struggling with logistics until I found ChargeVita. Their bulk shipping solution is a game-changer.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Rohit Verma",
    role: "Freelancer, Bangalore",
    message:
      "I love how easy it is to track packages with ChargeVita. The interface is intuitive and support is always helpful.",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className=" py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-6">What Our Customers Say</h2>
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
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
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
