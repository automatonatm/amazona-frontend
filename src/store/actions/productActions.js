import axios from "../../utils/axios";

import {
    PRODUCT_CATEGORY_FAIL,
    PRODUCT_CATEGORY_REQUEST, PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS
} from "../constants/productsConstants";


export const listProducts = (options) => async (dispatch) => {



    dispatch({
        type: PRODUCT_LIST_REQUEST
    })

    try {

        //console.log(options)

        const url = `/api/v1/products?name=${options.name}&category=${options.category}&min=${options.min}&max=${options.max}`

        /*if(options) {

            if(options.name) {
                url = `/api/v1/products?name=${options.name}`
            }

            if(options.category) {
                url = `/api/v1/products?category=${options.category}`
            }

            if(options.category && options.name) {
                url = `/api/v1/products?name=${options.name}&category=${options.category}`
            }

            if(options.category && options.name) {
                console.log(options)
                url = `/api/v1/products?name=${options.name}&category=${options.category}&min=${options.min}&max=${options.max}`
            }

        }*/

        const {data} = await axios.get(url)

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


export const getProductCategory = () => async (dispatch) => {

    dispatch({type: PRODUCT_CATEGORY_REQUEST})

    try {

        const {data} = await axios.get(`/api/v1/categories`)

        dispatch({
            type: PRODUCT_CATEGORY_SUCCESS,
            payload: data.data
        })

    }catch (err) {
        dispatch({
            type: PRODUCT_CATEGORY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}






