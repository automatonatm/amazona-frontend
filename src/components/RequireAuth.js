import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";


const  RequireAuth = ({ children }) =>  {

    const { authenticated } = useSelector(state => state.authUser)

    const location = useLocation();

    return authenticated === true ? children :  <Navigate to="/signin" replace state={{ path: location.pathname }} />;

}

export default RequireAuth;