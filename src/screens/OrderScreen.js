import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import currencyFormmater from "../components/utils/currencyFormmater";
import {deliverOrder, getOrderDetails, payOrder} from "../store/actions/orderActions";

import LoadingBox from "../components/utils/LoadingBox";
import MessageBox from "../components/utils/MessageBox";
import axios from "../utils/axios";
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from "../store/constants/orderConstants";


const OrderScreen = () => {

    const params = useParams();

    const orderId = params.orderId


    const dispatch = useDispatch()

    const {loading, error, order} = useSelector(state => state.order)

    const {success: successDeliver, error: deliverError, loading: deliverLoading} = useSelector(state => state.deliverOrder)

    const {user} = useSelector(state => state.authUser)

    const {loading: loadingPay, error: errorPay, success: successPay} = useSelector(state => state.orderPay)

    const [sdkReady, setSdkReady] = useState(false)



    useEffect(() => {

        const addPayPalScript = async () => {
            const {data} = await axios.get('/api/v1/config/paypal');
            const script =  document.createElement('script');
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true
            script.onload = () =>  {setSdkReady(true)}
            document.body.appendChild(script)
        }

        if(!order || successPay || successDeliver || (order && order.id !== orderId)) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))

        }else {
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript()
                }else {
                    setSdkReady(true)
                }
            }
        }

    }, [dispatch, orderId, order, sdkReady, successPay, successDeliver])

    const onSuccessHandler = (paymentResult) => {
       dispatch(payOrder(order, paymentResult))
    }

    const markAsDeliveredHandler = () => {
        dispatch(deliverOrder(orderId))
    }



    return (
        <div>

            {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
                <div>
                    {order && (
                        <div className="row top">

                            <div className="col-2">
                                <h1>Order : {orderId}</h1>
                                <ul>
                                    <li className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name: </strong> {order.shippingAddress.fullName} <br/>
                                            <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city},
                                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                        </p>
                                        {
                                            order.isDelivered ?
                                                <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox> :
                                                <MessageBox variant='danger'>Not Delivered</MessageBox>
                                        }

                                    </li>

                                    <li className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method: </strong> {order.paymentMethod}
                                        </p>
                                        {
                                            order.isPaid ?
                                                <MessageBox variant="success">Pay at {order.payedAt}</MessageBox> :
                                                <MessageBox variant='danger'>Not Paid</MessageBox>
                                        }

                                    </li>

                                    <li className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {
                                                order.orderItems.map(item => (
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
                                                <div>{currencyFormmater(order.itemsPrice)}</div>
                                            </div>

                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Shipping</div>
                                                <div>{currencyFormmater(order.shippingPrice)}</div>
                                            </div>

                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Tax</div>
                                                <div>{currencyFormmater(order.taxPrice)}</div>
                                            </div>

                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>
                                                    <strong>Order Total</strong>
                                                </div>
                                                <div>
                                                    <strong>{currencyFormmater(order.totalPrice)}</strong>
                                                </div>
                                            </div>

                                        </li>



                                        {
                                            <>


                                                {!order.isPaid && user.role === 'user' && (
                                                    <li>
                                                        {!sdkReady ? (<LoadingBox/>) : (
                                                            <>
                                                                {errorPay && (<MessageBox
                                                                    variant='danger'>{errorPay}</MessageBox>)}
                                                                {loadingPay && (<LoadingBox/>)}

                                                                <PayPalButton amount={order.totalPrice}
                                                                              onSuccess={onSuccessHandler}/>
                                                            </>

                                                        )}
                                                    </li>
                                                )
                                                }
                                                {deliverLoading && (<LoadingBox/>)}
                                                {deliverError && (<MessageBox variant="danger">{deliverError}</MessageBox>)}

                                                {order.isPaid && !order.isDelivered && user.role === 'admin' && (
                                                    <button type="button" disabled={deliverLoading} className="primary block" onClick={markAsDeliveredHandler}>Deliver Order</button>
                                                )}
                                            </>
                                        }


                                    </ul>


                                </div>

                            </div>
                        </div>
                    )}
                </div>

            ) }

        </div>
    );
};

export default OrderScreen;
