import {
    USER_DETAILS_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_SIGN_FAIL,
    USER_SIGN_REQUEST,
    USER_SIGN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS
} from "../constants/userConstants";

import axios from "../../utils/axios";

import Cookie from 'js-cookie';





export const signInUser = (formData) => async (dispatch) => {
    dispatch({
        type: USER_SIGN_REQUEST
    })

    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };


        const {data} = await axios.post(`/api/v1/auth/signin`, formData, config)


        Cookie.set('authToken',  data.token);



 /*    const cookies = new Cookies();

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true
        };

        cookies.set('amazona_token', data.token, { path: '/',  domain: appConfig.baseURL }, options);*/

        dispatch({
            type: USER_SIGN_SUCCESS,
            payload: data.data
        })


        dispatch(getUserData())
    }catch (err) {
        dispatch({
            type: USER_SIGN_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const signUpUser = (formData) => async (dispatch) => {


    dispatch({
        type: USER_SIGNUP_REQUEST,
    })

    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        const {data} = await axios.post(`/api/v1/auth/signup`, formData, config)

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data.data
        })

        Cookie.set('authToken',  data.token);

        dispatch(getUserData())

    }catch (err) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


export const logoutUser = () => async (dispatch) => {

    axios.post(`/api/v1/auth/logout`)
        .then(() => {
            dispatch({
                type: USER_SIGNOUT
            });

            Cookie.remove('authToken');

            localStorage.removeItem('cartItems')
            localStorage.removeItem('shippingAddress')

        })
        .catch(err => console.log(err))
};


export const getUserData = () =>  (dispatch) => {

    dispatch({type: USER_DETAILS_REQUEST})

    axios.get(`/api/v1/auth/me`)
        .then(({data}) => {
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data.data
            })

        })
        .catch(err => {
            dispatch({
                type: USER_DETAILS_FAILED,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        })
};
