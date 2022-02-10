import axios from "axios";

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

import config from "../../utils/config";


export const addToCart = (productId, qty) => async (dispatch, getState) => {

    const {data} = await axios.get(`${config.baseURL}/api/v1/products/${productId}`)

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                name: data.data.name,
                image: data.data.image,
                price: data.data.price,
                countInStock : data.data.countInStock,
                product: data.data._id,
                qty
            }
        })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (productId) => async (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingData) => (dispatch) => {

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: shippingData
    })

    localStorage.setItem('shippingAddress', JSON.stringify(shippingData))

}

export const savePaymentMethod = (paymentMethod) => (dispatch) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod
    })

   // localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))

}