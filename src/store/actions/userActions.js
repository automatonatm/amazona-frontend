import {
    USER_DETAILS_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_SIGN_FAIL,
    USER_SIGN_REQUEST,
    USER_SIGN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS
} from "../constants/userConstants";

import axios from "axios";

import appConfig from "../../utils/config";


export const signInUser = (formData) => async (dispatch) => {
     const {email, password} = formData
    dispatch({
        type: USER_SIGN_REQUEST,
        payload: {
            email, password
        }
    })

    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };


        const {data} = await axios.post(`${appConfig.baseURL}/api/v1/auth/signin`, formData, config)


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

        const {data} = await axios.post(`${appConfig.baseURL}/api/v1/auth/signup`, formData, config)

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data.data
        })

        dispatch(getUserData())

    }catch (err) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


export const logoutUser = () => async (dispatch) => {

    axios.post(`${appConfig.baseURL}/api/v1/auth/logout`)
        .then(() => {
            dispatch({
                type: USER_SIGNOUT
            });

            localStorage.removeItem('cartItems')
            localStorage.removeItem('shippingAddress')

        })
        .catch(err => console.log(err))
};


export const getUserData = () =>  (dispatch) => {

    dispatch({type: USER_DETAILS_REQUEST})

    axios.get(`${appConfig.baseURL}/api/v1/auth/me`)
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
