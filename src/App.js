import React, {useEffect} from "react";
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import {useSelector} from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import jwtDecode from 'jwt-decode'
import {useDispatch} from "react-redux";
import {getUserData, logoutUser} from "./store/actions/userActions";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RequireAuth from "./components/RequireAuth";
import AdminRoute from "./components/AdminRoute";
import ProductsScreen from "./screens/adminScreens/ProductsScreen";
import PublicRoute from "./components/PublicRoute";
import ProductEditScreen from "./screens/adminScreens/ProductEditScreen";
import OrdersScreen from "./screens/adminScreens/OrdersScreen";





/*const getCookie = (name) => {

    let cookie = {};

    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookie[k.trim()] = v;
    });

    return  cookie[name];
};*/

import Cookie from 'js-cookie';
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";




function App() {

    const {cartItems} = useSelector(state => state.cart)

    const {user, loading} = useSelector(state => state.authUser)

    //const token =  getCookie('auth');

    const token = Cookie.get('authToken');


    const dispatch = useDispatch()


    const navigate = useNavigate()


    useEffect(() => {
        if(token) {
            const  decodeToken =  jwtDecode(token);
            if(decodeToken.exp * 10000 < Date.now()) {
                dispatch(logoutUser());
            }else {
                dispatch(getUserData())
            }
        }else {
            dispatch(getUserData());
        }
    }, [token, dispatch])


    const signOutHandler = () => {
        dispatch(logoutUser())
        navigate('/')
    }


    return (

        <div className="grid-container">

            <header className="row">
                <div className="row">
                    <Link className="brand" to="/">amazona</Link>
                </div>

                <div>

                    <SearchBox/>

                </div>

                <div>

                    <Link to="/cart">
                        Cart
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </Link>

                    {
                        !loading && user ? (

                            <div className="auth-menu dropdown">
                            <Link to="#">{user.name} <i className="fa fa-caret-down"/></Link>
                                <ul className="dropdown-content">

                                    <li>
                                        <Link to="/myprofile" >My Profile</Link>
                                    </li>

                                    <li>
                                        <Link to="/myorders" >My Orders</Link>
                                    </li>

                                    <li>
                                        <Link to="#signout" onClick={signOutHandler}>Sign out</Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Sign In</Link>
                        )}

                    {
                        user && user.role === 'admin' && (
                            <div className="dropdown">
                                <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"/></Link>
                                <ul className="dropdown-content">

                                    <li>
                                        <Link to="/dashboard" >Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/orders" >Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/users" >Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/products" >Products</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }

                </div>

            </header>


            <main>
                <Routes>
                    <Route path="/products/:id" element={<ProductScreen/>}/>
                    <Route path="/" element={<HomeScreen/>}/>

                    <Route path="/search" element={<SearchScreen/>}/>

                    <Route path="/cart">
                        <Route path=":productId" element={<CartScreen/>}/>
                        <Route path="" element={<CartScreen/>}/>
                    </Route>

                    <Route path="/signup" element={<RegisterScreen/>}/>
                    <Route path="/signin" element={
                        <PublicRoute>
                        <LoginScreen/>
                        </PublicRoute>
                    }/>
                    <Route path="/shipping" element={
                        <RequireAuth>
                        <ShippingAddressScreen/>
                        </RequireAuth>
                    }/>
                    <Route path="/payment" element={
                        <RequireAuth>
                        <PaymentScreen/>
                        </RequireAuth>
                    }/>
                    <Route path="/placeorder" element={
                        <RequireAuth>
                        <PlaceOrderScreen/>
                        </RequireAuth>
                    }/>
                    <Route path="/myprofile" element={
                        <RequireAuth>
                        <ProfileScreen/>
                        </RequireAuth>
                    }/>
                    <Route path="/myorders" element={
                        <RequireAuth>
                        <OrderHistoryScreen/>
                        </RequireAuth>
                    }/>

                    <Route path="/order">
                        <Route path=":orderId" element={
                            <RequireAuth>
                            <OrderScreen/>
                            </RequireAuth>
                        }/>
                    </Route>


                 {/*   <Route path="/admin/orders" element={
                        <AdminRoute>
                            <OrdersScreen/>
                        </AdminRoute>
                    }/>*/}

                    <Route path="/admin">

                        <Route path="products">
                            <Route path="" element={
                                <AdminRoute>
                                    <ProductsScreen/>
                                </AdminRoute>
                            }/>

                            <Route path=":productId" element={
                                <AdminRoute>
                                    <ProductEditScreen/>
                                </AdminRoute>
                            }/>

                        </Route>

                        <Route path="orders"  exact element={
                            <AdminRoute>
                                <OrdersScreen/>
                            </AdminRoute>
                        }/>

                    </Route>

                </Routes>
            </main>

            <footer className="row center">All right reserved</footer>

        </div>


    );
}

export default App;
