import React from "react";
import Appointment from "../Appointment/Appointment";
import Banner from "../Banner/Banner";
import Contacts from "../Contacts/Contacts";
import DentalCare from "../DentalCare/DentalCare";
import InfoCards from "../InfoCards/InfoCards";
import ServicesCards from "../ServicesCards/ServicesCards";
import Testmonial from "../Testmonial/Testmonial";

const Home = () => {
  return (
    <div className="mx-5">
      <Banner></Banner>
      <InfoCards></InfoCards>
      {/* <ServicesCards></ServicesCards>
      <DentalCare></DentalCare>
      <Appointment></Appointment>
      <Testmonial></Testmonial>
      <Contacts></Contacts> */}
    </div>
  );
};

export default Home;
