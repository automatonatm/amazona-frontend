import {
    GET_ALL_ORDERS_FAIL,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_USER_ORDERS_FAIL,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";
import {CART_EMPTY} from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {

    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    })

    try {

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };

      //  const {} = getState() //returns the whole state

       const {data}  =  await axios.post(`/api/v1/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.data
        })

        dispatch({type: CART_EMPTY })

        localStorage.removeItem("cartItems")

    }catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}


export const getOrderDetails = (orderId) => async (dispatch) => {

    dispatch({
        type: GET_ORDER_REQUEST,
    })

    try {

        const {data}  =  await axios.get(`/api/v1/orders/${orderId}`)

        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}


export const payOrder = (order, paymentData) => async (dispatch) => {

    dispatch({type: ORDER_PAY_REQUEST})

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.post(`/api/v1/orders/${order.id}/pay`, paymentData, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}

export const getUserOrders = () => async (dispatch) => {

    dispatch({type: GET_USER_ORDERS_REQUEST})

    try {

        const {data} = await axios.get(`/api/v1/orders/`)

        dispatch({
            type: GET_USER_ORDERS_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: GET_USER_ORDERS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}

export const getAllOrders = () => async (dispatch) => {

    dispatch({type: GET_ALL_ORDERS_REQUEST})

    try {

        const {data} = await axios.get(`/api/v1/orders/admin/orders`)

        dispatch({
            type: GET_ALL_ORDERS_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: GET_ALL_ORDERS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}

export const deliverOrder = (orderId) => async (dispatch) => {

    dispatch({type: ORDER_DELIVER_REQUEST})

    try {

        await axios.put(`/api/v1/orders/${orderId}/deliver`)

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
        })


    }catch (err) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}