import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";


const  PrivateRoute = ({ children }) =>  {

    const { authenticated, user } = useSelector(state => state.authUser)

    return authenticated === true && user.role === 'user' ? children : <Navigate to="/signin" />;

}

export default PrivateRoute;