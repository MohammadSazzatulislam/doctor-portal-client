import React from "react";
import people1 from "../../../assets/images/people1.png";
import people2 from "../../../assets/images/people2.png";
import people3 from "../../../assets/images/people3.png";
import testbackImg from "../../../assets/icons/quote.svg";
import Test from "./Test/Test";

const Testmonial = () => {
  const cardData = [
    {
      id: 1,
      name: "Winson Herry",
      img: people1,
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      district: "California",
    },
    {
      id: 2,
      name: "Winson Herry",
      img: people2,
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      district: "California",
    },
    {
      id: 3,
      name: "Winson Herry",
      img: people3,
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      district: "California",
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between gap-3 mt-28 items-center ">
        <div>
          <h1 className="text-primary font-bold">Testimonial</h1>
          <h2 className="text-3xl font-semibold">What Our Patients Says</h2>
        </div>
        <img className="w-48" src={testbackImg} alt="" />
      </div>
      <div className="w-full mt-36 mb-36 grid grid-cols-1 lg:grid-cols-3 mx-auto">
        {cardData.map((card) => (
          <Test key={card.id} card={card}></Test>
        ))}
      </div>
    </div>
  );
};

export default Testmonial;
