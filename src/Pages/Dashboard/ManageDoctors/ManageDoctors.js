import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/doctors`, {
        headers: {
          authorization: localStorage.getItem("doctorToken"),
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-2xl text-semibold ">Manage Doctors</h1>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr className="hover text-center" key={doctor._id}>
                <th>{i + 1}</th>
                <td><img className="w-12 h-12 rounded-full" src={doctor.img} alt="" /></td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>
                  <button className="btn btn-xs btn-danger text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
