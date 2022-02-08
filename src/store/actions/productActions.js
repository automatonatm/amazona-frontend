import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS
} from "../constants/productsConstants";
import axios from "axios";


export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })

    try {

        const {data} = await axios.get('/api/v1/products/')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


export const getProductDetails = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST
    })

    try {
        const {data} = await axios.get(`/api/v1/products/${productId}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}




export const createProduct = (data) => async (dispatch) => {
    dispatch({
        type: PRODUCT_CREATE_REQUEST
    })
    try {
        const {data} = await axios.post(`/api/v1/products/`)
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


export const productUpdate = (productId, updateData) => async (dispatch) => {
    dispatch({
        type: PRODUCT_UPDATE_REQUEST
    })
    try {
        const {data} = await axios.put(`/api/v1/products/${productId}`, updateData)
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


export const productDelete = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DELETE_REQUEST
    })
    try {
         await axios.delete(`/api/v1/products/${productId}`)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: productId
        })

    }catch (err) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}






