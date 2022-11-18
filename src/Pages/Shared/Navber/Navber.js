import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Navber = () => {
  const { user, userSignOut, toggleTheme } = useContext(AuthContext);


  const handleSignOUt = () => {
    userSignOut()
      .then(() => {
        localStorage.removeItem('doctorToken')
      })
      .catch((error) => {
        // An error happened.
      });
  };




   const menuItems = (
     <React.Fragment>
       <div className="flex items-center ">
         <input onClick={toggleTheme} type="checkbox"  className=" hidden lg:flex toggle" />
       </div>
       <li>
         <Link to="/">Home</Link>
       </li>
       <li>
         <Link to="/about">About</Link>
       </li>
       <li>
         <Link to="/appointment">Appointment</Link>
       </li>
       <li>
         <Link to="/reviews">Reviews</Link>
       </li>
       <li>
         <Link to="/contact">Contact Us</Link>
       </li>
       {user?.uid ? (
         <>
           <li>
             <Link to="/dashboard">Dashboard </Link>
           </li>
           <Link to="/">
             <button
               onClick={handleSignOUt}
               className="btn text-white btn-secondary"
             >
               Log out
             </button>
           </Link>
         </>
       ) : (
         <li>
           <Link to="/login">Login </Link>
         </li>
       )}
     </React.Fragment>
   );

  
  return (
    <div className="navbar felx gap-4 justify-between items-center">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact  dropdown-content mt-3 p-2 shadow bg-black text-white rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Doctors Portal
        </Link>
      </div>
      <div className="navbar-center hidden items-center lg:flex">
        <ul className="menu menu-horizontal flex items-center gap-2 p-0">
          {menuItems}
        </ul>
      </div>
      <div className="flex items-center lg:hidden ">
        <input onClick={toggleTheme} type="checkbox" className="toggle" />
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={3}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navber;
