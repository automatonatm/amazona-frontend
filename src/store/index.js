import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from  'redux-devtools-extension'
import reducer from "./reducers";


const initialState = {
    cart:  {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :  [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) :  {},
        paymentMethod: 'payPal'
    }
};





const middleware = [thunk];

const  store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware),
    )
);

export  default  store