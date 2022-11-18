import React from "react";

const InfoCard = ({ card }) => {
  return (
    <div
      className={` ${card.bgClass} card p-5 flex lg:flex-row flex-col justify-center items-center text-white  w-full  card-side bg-base-100 shadow-xl `}
    >
      <figure className="w-16">
        <img src={card.icon} alt="Movie" />
      </figure>
      <div className="card-body w-full p-3">
        <h2 className="card-title">{card.name}</h2>
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
