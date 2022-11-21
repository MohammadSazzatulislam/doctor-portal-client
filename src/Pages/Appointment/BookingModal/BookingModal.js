import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const BookingModal = ({ tretment, selected, setTretment, refetch }) => {
  const date = format(selected, "PP");

  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const slot = form.slot.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const appointment = {
      petient: name,
      tretment: tretment.name,
      date,
      slot,
      email,
      phone,
      price:tretment.price
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setTretment(null);
          toast.success("Appointment Confirmed");
          refetch();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="text-lg  text-black font-bold">{tretment.name}</h3>

          <form
            onSubmit={handleBooking}
            className="flex gap-4 flex-col mt-7 justify-center items-center"
          >
            <input
              type="text"
              value={date}
              readOnly
              className="input font-semibold input-bordered text-black input-secondary w-full "
            />
            <select
              name="slot"
              className="select text-black select-secondary w-full "
            >
              {tretment.slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              name="name"
              type="text"
              readOnly
              defaultValue={user?.displayName}
              placeholder="Full Name"
              className="input input-bordered text-black input-secondary w-full "
            />

            <input
              name="email"
              type="email"
              readOnly
              defaultValue={user?.email}
              placeholder="Email"
              className="input input-bordered text-black input-secondary w-full "
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered  text-black input-secondary w-full"
            />
            <input
              className="btn btn-accent text-white w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
