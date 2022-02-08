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
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET,
    ORDER_DELIVER_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {

    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return  {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return  {
                loading: false,
                error: action.payload
            }

        case ORDER_CREATE_RESET:
            return  {}

         default:
             return state

    }
}


export const getOrder = (state = {loading: true}, action) => {

    switch (action.type) {

        case GET_ORDER_REQUEST:
            return  {
                loading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case GET_ORDER_FAIL:
            return  {
                loading: false,
                error: action.payload
            }
         default:
             return state
    }
}


export const orderPay = (state = {}, action) => {

    switch (action.type) {

        case ORDER_PAY_REQUEST:
            return  {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                success: true,
                loading: false,
            }

        case ORDER_PAY_FAIL:
            return  {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}


export const userOrders = (state = {loading: true}, action) => {

    switch (action.type) {

        case GET_USER_ORDERS_REQUEST:
            return  {
                loading: true
            }
        case GET_USER_ORDERS_SUCCESS:
            return {
                orders: action.payload,
                loading: false,
            }

        case GET_USER_ORDERS_FAIL:
            return  {
                error: action.payload,
                loading: false,
            }

        default:
            return state
    }
}

export const adminOrdersReducer = (state = {loading: true}, action) => {

    switch (action.type) {

        case GET_ALL_ORDERS_REQUEST:
            return  {
                loading: true
            }
        case GET_ALL_ORDERS_SUCCESS:
            return {
                orders: action.payload,
                loading: false,
            }

        case GET_ALL_ORDERS_FAIL:
            return  {
                error: action.payload,
                loading: false,
            }

        default:
            return state
    }
}


export const adminDeliverOrdersReducer = (state = {}, action) => {

    switch (action.type) {

        case ORDER_DELIVER_REQUEST:
            return  {
                loading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
               success: true,
                loading: false,
            }

        case ORDER_DELIVER_FAIL:
            return  {
                error: action.payload,
                loading: false,
            }

        case ORDER_DELIVER_RESET:
            return {}

        default:
            return state
    }
}
