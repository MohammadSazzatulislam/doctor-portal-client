import React from "react";
import contactImg from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../component/PrimaryButton/PrimaryButton";

const Contacts = () => {
  return (
    <div className="relative w-full">
      <img className="w-full h-[533px]" src={contactImg} alt="" />
      <div className="absolute top-8   mx-auto flex flex-col gap-5 justify-center items-center text-center text-white w-full  h-[468px] ">
        <div>
          <h1 className="font-bold text-primary">Contact Us</h1>
          <h2 className="text-2xl mb-10">Stay Connected With us</h2>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full text-black max-w-xs"
        />
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-md w-full  text-black max-w-xs"
        />
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-lg w-full  text-black max-w-xs"
        />
        <PrimaryButton>Submit</PrimaryButton>
      </div>
    </div>
  );
};

export default Contacts;
