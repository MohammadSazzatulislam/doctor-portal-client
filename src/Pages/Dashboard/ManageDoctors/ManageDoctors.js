import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deleteDoctor, setDeleteDoctor] = useState(null);

  const { data: doctors = [], isLoading, refetch } = useQuery({
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
  
  const handleDeleteCancle = () => {
    setDeleteDoctor(null);
  };

  const handleDeleteSuccess = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("doctorToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success(`${doctor.name} delete successfully`);
          refetch();
        }
      })
      .catch((err) => console.log(err.messages));
  };


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
              <th>Specialty</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr className="hover text-center" key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={doctor.img}
                    alt=""
                  />
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label
                    onClick={() => setDeleteDoctor(doctor)}
                    htmlFor="confirm-delete"
                    className="btn btn-xs btn-danger text-white"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteDoctor && (
        <ConfirmationModal
          deleteDoctor={deleteDoctor}
          handleDeleteCancle={handleDeleteCancle}
          handleDeleteSuccess={handleDeleteSuccess}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
