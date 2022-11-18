import React from 'react';
import tretment from '../../../assets/images/treatment.png';
import PrimaryButton from '../../../component/PrimaryButton/PrimaryButton';

const DentalCare = () => {
    return (
      <div className="hero my-40">
        <div className="hero-content w-full mx-auto flex-col lg:flex-row">
          <img
            src={tretment}
            alt=""
            className="rounded-lg w-full lg:w-[458px] h-[576px] shadow-2xl"
          />
          <div className="lg:w-2/5  w-full  lg:ml-28">
            <h1 className="text-5xl font-bold">
              Exceptional Dental Care, on Your Terms
            </h1>
            <p className="py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>
      </div>
    );
};

export default DentalCare;