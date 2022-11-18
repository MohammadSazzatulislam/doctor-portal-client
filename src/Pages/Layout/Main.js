import React from 'react';
import Footer from '../Shared/Footer/Footer';
import Navber from '../Shared/Navber/Navber';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;