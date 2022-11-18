import React from "react";

const ServicesCard = ({ card }) => {
  return (
    <div className="card w-full border shadow-xl mx-auto">
      <figure className="px-10 pt-10">
        <img src={card.icon} alt="Shoes" className="rounded-xl w-28" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{card.name}</h2>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
