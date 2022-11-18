import React from "react";
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import ServicesCard from "../ServicesCard/ServicesCard";

const ServicesCards = () => {
  const cardData = [
    {
      id: 1,
      name: "Fluoride Treatment",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the ",
      icon: fluoride,
    },
    {
      id: 2,
      name: "Cavity Filling",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the ",
      icon: cavity,
    },
    {
      id: 3,
      name: "Teeth Whitening",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the ",
      icon: whitening,
    },
  ];

  return (
    <div>
      <div className="w-full text-center mt-32 ">
        <h1 className="text-primary font-bold uppercase">our services</h1>
        <h2 className="text-xl lg:text-3xl md:text-2xl font-semibold">
          Services We Provide
        </h2>
      </div>
      <div className="w-full mt-16 flex flex-col lg:flex-row gap-8">
        {cardData.map((card) => (
          <ServicesCard key={card.id} card={card}></ServicesCard>
        ))}
      </div>
    </div>
  );
};

export default ServicesCards;
