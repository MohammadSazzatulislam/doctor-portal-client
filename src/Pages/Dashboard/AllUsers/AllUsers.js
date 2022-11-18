import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const { user } = useContext(AuthContext);

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://doctors-portal-server-khaki.vercel.app/allUsers?email=${user?.email}`,
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

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleAdmin = (id) => {
    fetch(
      `https://doctors-portal-server-khaki.vercel.app/allUsers/admin/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: localStorage.getItem("doctorToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount) {
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold ">All Users</h1>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((users, i) => (
              <tr className="hover text-center" key={users._id}>
                <th>{i + 1}</th>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>
                  {users?.role === "Admin" ? (
                    <h1 className="text-md font-semibold text-green-500">
                      Admin
                    </h1>
                  ) : (
                    <button
                      onClick={() => handleAdmin(users._id)}
                      className="btn btn-xs btn-primary text-white"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
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

export default AllUsers;
