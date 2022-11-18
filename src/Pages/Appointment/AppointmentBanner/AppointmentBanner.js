import React from 'react';
import bannerImg from "../../../assets/images/chair.png";
import bannerbackImg from "../../../assets/images/bg.png";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = ({ selected, setSelected }) => {
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
        <div className="lg:w-1/2 flex items-center justify-center w-full">
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;