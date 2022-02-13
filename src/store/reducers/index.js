import {combineReducers} from 'redux'
import {
    productList,
    productDetails,
    productCreateReducer,
    productUpdateReducer,
    productDeleteReducer, categoryList
} from "./productsReducer";
import {cartItems} from "./cartReducer";
import {userSignInReducer, userReducer, userSignUpReducer} from "./userReducer";
import {
    adminDeliverOrdersReducer,
    adminOrdersReducer,
    getOrder,
    orderCreateReducer,
    orderPay,
    userOrders
} from "./orderReducer";



const reducer = combineReducers({
    productList,
    productDetails,
    cart: cartItems,
    userSignIn: userSignInReducer,
    userSignUp: userSignUpReducer,
    authUser: userReducer,
    createOrder: orderCreateReducer,
    order: getOrder,
    orderPay,
    userOrders,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    adminOrders: adminOrdersReducer,
    deliverOrder: adminDeliverOrdersReducer,
    categories: categoryList
})


export default reducer