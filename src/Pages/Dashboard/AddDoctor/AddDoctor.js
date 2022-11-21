import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { data: specialty = [], isLoading } = useQuery({
    queryKey: ["special"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctors-portal-server-khaki.vercel.app/appointmentSpecialty"
      );
      const data = await res.json();
      return data;
    },
  });

  const imageHostKey = process.env.REACT_APP_imagebb_key;

  const handleAddDoctor = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img: imageData.data.url,
          };

          fetch("https://doctors-portal-server-khaki.vercel.app/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: localStorage.getItem("doctorToken"),
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("successfully added");
                navigate("/dashboard/managedoctors");
              }
            });
        }
      })
      .catch((err) => err.message);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-2xl text-semibold ">Add Doctor</h1>
      <div className="w-96 p-7 border mx-auto rounded">
        <form onSubmit={handleSubmit(handleAddDoctor)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="text-md">Name</span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              placeholder="Name"
              className="input input-bordered text-black w-full "
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="text-md">Email</span>
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
              className="input input-bordered text-black w-full "
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="text-md">Specialty</span>
            </label>
            <select
              {...register("specialty", {
                required: "specialty is required",
              })}
              className="select select-bordered w-full max-w-xs"
            >
              {specialty.map((special) => (
                <option key={special._id}>{special.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="text-md">Photo</span>
            </label>
            <input
              {...register("img", {
                required: "img is required",
              })}
              type="file"
              placeholder="photo"
              className="input input-bordered text-black w-full "
            />
            {errors.img && (
              <span className="text-red-500 text-xs">{errors.img.message}</span>
            )}
          </div>
          <input
            className="btn btn-accent text-white mt-4 w-full "
            type="submit"
            value="add doctor"
          />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
