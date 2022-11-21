import React from "react";

const AvailableAppointmentCard = ({ card, setTretment }) => {
  return (
    <div className="card w-full mx-auto border shadow">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary">{card.name}</h2>
        <p>{card.slots.length > 0 ? card.slots[0] : "Try Another Day"}</p>
        <p>
          {card.slots.length} {card.slots.length > 1 ? "spaces" : "space"}
          Available
        </p>
        <p><small>Price : ${card.price }</small></p>
        <div className="card-actions justify-center">
          <label
            disabled={card.slots.length === 0}
            onClick={() => setTretment(card)}
            htmlFor="booking-modal"
            className="btn btn-secondary text-white"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AvailableAppointmentCard;
