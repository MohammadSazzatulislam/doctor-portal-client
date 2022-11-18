import React from "react";
import bannerImg from "../../../assets/images/chair.png";
import bannerbackImg from "../../../assets/images/bg.png";
import PrimaryButton from "../../../component/PrimaryButton/PrimaryButton";

const Banner = () => {
  return (
    <div className="hero relative">
      <img
        className="w-full h-screen"
        style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
        src={bannerbackImg}
        alt=""
      />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          alt=""
          src={bannerImg}
          className="lg:w-1/2 w-full rounded-lg shadow-2xl"
        />
        <div className="lg:w-1/2  w-full">
          <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the
          </p>
          <PrimaryButton>Getting Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Banner;
