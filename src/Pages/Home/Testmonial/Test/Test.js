import React from "react";

const Test = ({ card }) => {
  return (
    <div className="card lg:w-96 w-full p-9 mx-auto border rounded-md shadow-xl">
      <div className="card-body p-0 ">
        <p>{card.description}</p>
      </div>
      <div className="flex gap-3 items-center pt-4">
        <figure>
          <img className="w-20" src={card.img} alt="Shoes" />
        </figure>
        <div>
          <h2 className="card-title">{card.name}</h2>
          <h3>{card.district}</h3>
        </div>
      </div>
    </div>
  );
};

export default Test;
