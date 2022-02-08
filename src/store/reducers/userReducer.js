import {
    USER_DETAILS_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_SIGN_FAIL,
    USER_SIGN_REQUEST,
    USER_SIGN_SUCCESS,
    USER_SIGNOUT,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from "../constants/userConstants";

export const userSignInReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_SIGN_REQUEST:
            return  {
                loading: true
            }

        case USER_SIGN_SUCCESS:
            return  {
                loading: false,
                success: true
            }

        case USER_SIGN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_SIGNOUT :
            return  {}

        default:
            return state

    }
}

export const userSignUpReducer = (state = {}, action) => {

    switch (action.type) {

        case USER_SIGNUP_REQUEST:
            return  {
                loading: true
            }

        case  USER_SIGNUP_SUCCESS:
            return  {
                loading: false,
                success: true
            }

        case  USER_SIGNUP_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state

    }
}

export const userReducer = (state = {loading : true}, action) => {

    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                loading: true
            };

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false,
            };

        case USER_DETAILS_FAILED:
            return {
                ...state,
                authenticated: false,
                error: action.payload,
                loading: false,
            };

        case USER_SIGNOUT :
            return  {}

        default:
            return state
    }


};