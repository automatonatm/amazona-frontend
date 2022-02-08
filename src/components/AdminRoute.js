import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";


const  AdminRoute = ({ children }) =>  {

    const { authenticated, user } = useSelector(state => state.authUser)

    const location = useLocation();

    return authenticated === true && user.role === 'admin' ? children :
        <Navigate to="/signin" replace state={{ path: location.pathname }} />;

}

export default AdminRoute;