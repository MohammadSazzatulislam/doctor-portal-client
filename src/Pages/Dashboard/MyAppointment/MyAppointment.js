import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);

  const { data: booking = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://doctors-portal-server-khaki.vercel.app/bookings?email=${user?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("doctorToken"),
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold ">My Appointments</h1>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Tretment</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((book, i) => (
              <tr className="hover" key={book._id}>
                <th>{i + 1}</th>
                <td>{book.petient}</td>
                <td>{book.tretment}</td>
                <td>{book.slot}</td>
                <td>{book.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
