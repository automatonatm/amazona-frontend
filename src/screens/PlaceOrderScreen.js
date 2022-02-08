import React, {useEffect} from 'react';
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import currencyFormmater from "../components/utils/currencyFormmater";
import {createOrder} from "../store/actions/orderActions";
import {ORDER_CREATE_RESET} from "../store/constants/orderConstants";
import LoadingBox from "../components/utils/LoadingBox";
import MessageBox from "../components/utils/MessageBox";

const PlaceOrderScreen = () => {


    const {loading, success, error, order} = useSelector(state => state.createOrder)

    const {shippingAddress, paymentMethod, cartItems} = useSelector(state => state.cart)

    const toPrice = (num) => Number(num.toFixed(2))

    const itemsPrice =  toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0))

    const shippingPrice =  itemsPrice > 100 ? toPrice(0) : toPrice(10)

    const taxPrice = toPrice(0.15 * itemsPrice)

    const orderTotalPrice =  itemsPrice + shippingPrice + taxPrice


    const dispatch = useDispatch()



    const navigate = useNavigate()

    useEffect(() => {

        if(!paymentMethod) navigate('/payment')


        //if order was places successfully
       if(success) {
            navigate(`/order/${order.id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }


    }, [navigate, paymentMethod, order, success, dispatch])



    const placeOrderHandler = () => {
        
        const data = {
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice: orderTotalPrice,
            orderItems: cartItems
        }

        dispatch(createOrder(data))

    }


    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />

            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li className="card card-body">
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {shippingAddress.fullName} <br/>
                                <strong>Address: </strong> {shippingAddress.address}, {shippingAddress.city},
                                {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>

                        </li>

                        <li className="card card-body">
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {paymentMethod}
                            </p>

                        </li>

                        <li className="card card-body">
                            <h2>Order Items</h2>
                            <ul>
                                {
                                    cartItems.map(item => (
                                        <li key={item.product}>
                                            <div className="row">

                                                <div>
                                                    <img src={`/products/${item.image}`} alt={item.name} className="small"/>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    {item.qty} X {currencyFormmater(item.price)} = {currencyFormmater(item.price * item.qty)}
                                                </div>

                                            </div>

                                        </li>

                                    ))
                                }
                            </ul>

                        </li>
                    </ul>

                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li><h2>Order Summary</h2></li>
                             <li>
                                 <div className="row">
                                     <div>Items</div>
                                     <div>{currencyFormmater(itemsPrice)}</div>
                                 </div>

                             </li>
                             <li>
                                 <div className="row">
                                     <div>Shipping</div>
                                     <div>{currencyFormmater(shippingPrice)}</div>
                                 </div>

                             </li>
                             <li>
                                 <div className="row">
                                     <div>Tax</div>
                                     <div>{currencyFormmater(taxPrice)}</div>
                                 </div>

                             </li>
                             <li>
                                 <div className="row">
                                     <div>
                                         <strong>Order Total</strong>
                                     </div>
                                     <div>
                                         <strong>{currencyFormmater(orderTotalPrice)}</strong>
                                     </div>
                                 </div>

                             </li>

                            <li>
                                <button
                                    className="primary block"
                                    onClick={placeOrderHandler}
                                    disabled={cartItems.length === 0 || loading}
                                >Proceed Order</button>
                            </li>
                            <li>
                                {loading && <LoadingBox/>}
                                {error && <MessageBox>{error}</MessageBox>}
                            </li>



                        </ul>


                    </div>

                </div>
            </div>

        </div>
    );
};

export default PlaceOrderScreen;
