import React from "react";
import doctor from "../../../assets/images/doctor.png";
import bgImg from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../component/PrimaryButton/PrimaryButton";

const Appointment = () => {
  return (
    <div className="hero relative h-[533px] text-white w-full">
      <img className="w-full h-[533px]" src={bgImg} alt="" />
      <div className="hero-content  flex-col lg:flex-row">
        <img
          alt=""
          src={doctor}
          className=" hidden lg:block bottom-0 left-12  w-[600px] h-[700px] absolute"
        />
        <div className=" absolute right-0  w-full  lg:top-28 lg:w-1/2 p-10">
          <h1 className="text-primary font-bold mb-3">Appointment</h1>
          <h1 className="text-4xl font-bold">Make an appointment Today</h1>
          <p className="py-6 text-sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
