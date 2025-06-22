import React from "react";
import { GiPlantRoots } from "react-icons/gi";
import { FaBan, FaGlobeAmericas, FaLeaf } from "react-icons/fa";

const points = [
  {
    icon: <GiPlantRoots className="text-2xl md:text-5xl text-green-500" />,
    title: "Organic Ingredients",
    desc: "Sourced from nature, our formulas are rooted in purity, safety, and tradition.",
    number: "01",
  },
  {
    icon: <FaBan className="text-2xl md:text-5xl text-red-500" />,
    title: "No Harmful Additives",
    desc: "Absolutely no artificial colors, preservatives, or pesticides in any product.",
    number: "02",
  },
  {
    icon: <FaGlobeAmericas className="text-2xl md:text-5xl text-blue-600" />,
    title: "Freshly Processed",
    desc: "Our products are formulated and packed fresh to preserve nutrient value.",
    number: "03",
  },
  {
    icon: <FaLeaf className="text-2xl md:text-5xl text-green-700" />,
    title: "Holistic Wellness",
    desc: "Every ChargeVita supplement is designed to support your full-body vitality.",
    number: "04",
  },
];

const WhyChooseChargeVita = () => {
  return (
    <section className="bg-white pb-5 px-6 md:px-16">
      <h1 className="text-orange-500 py-5 font-semibold">Why ChargeVita ?</h1>
      <div className="max-w-7xl mx-auto text-center">
       
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-3 md:gap-10">
          {points.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Circle Icon with Number */}
              <div className="relative mb-6">
                <div className="w-20 h-20 md:w-28 md:h-28 border border-dashed border-orange-400 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-lg">
                  {item.number}
                </div>
              </div>
              {/* Title & Description */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseChargeVita;
