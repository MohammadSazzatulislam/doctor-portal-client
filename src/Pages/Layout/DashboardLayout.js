import React, { useContext } from "react";
import Navber from "../Shared/Navber/Navber";
import { Outlet , Link } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const DashboardLayout = () => {
  const {user} = useContext(AuthContext)


  const [isAdmin] = useAdmin(user?.email)



  return (
    <div>
      <Navber></Navber>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ml-4 ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content ">
            <li>
              <Link to="/dashboard">My Appointment</Link>
            </li>
            {isAdmin && <li>
              <Link to="/dashboard/users">All users</Link>
            </li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
