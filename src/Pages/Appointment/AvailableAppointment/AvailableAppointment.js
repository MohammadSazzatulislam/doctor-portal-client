import { format } from "date-fns";
import React, { useState } from "react";
import AvailableAppointmentCard from "../AvailableAppointmentCard/AvailableAppointmentCard";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const AvailableAppointment = ({ selected }) => {
  const [tretment, setTretment] = useState(null);
  const date = format(selected, 'PP')
  const { data: appointmentOption = [], refetch, isLoading } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <section>
      <p className="font-bold text-secondary mt-12 mb-28 text-center">
        Available Appointment on {format(selected, "PP")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 justify-center items-center">
        {appointmentOption.map((card) => (
          <AvailableAppointmentCard
            key={card._id}
            card={card}
            setTretment={setTretment}
          ></AvailableAppointmentCard>
        ))}
      </div>
      {tretment && (
        <BookingModal
          selected={selected}
          setTretment={setTretment}
          tretment={tretment}
          refetch={refetch}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointment;
