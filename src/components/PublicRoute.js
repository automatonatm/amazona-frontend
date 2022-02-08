import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";


const  PublicRoute = ({ children }) =>  {

    const { authenticated } = useSelector(state => state.authUser)

    const location = useLocation();

    //console.log(location.pathname)


    return authenticated === false ? children : <Navigate to="/" replace state={{ path: location.pathname }} />;

}

export default PublicRoute;