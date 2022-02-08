import React, {useEffect, useState} from 'react';
import CheckoutSteps from "../components/CheckoutSteps";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod} from "../store/actions/cartActions";


const PaymentScreen = () => {

   const {shippingAddress} = useSelector(state => state.cart)


    const [paymentMethod, setPaymentMethod] = useState('payPal')

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {

        if(!shippingAddress.address) {
           
            navigate('/shipping')
        }
    }, [navigate, shippingAddress.address])



   const onSubmitHandler  = (e) => {
        e.preventDefault()

       dispatch(savePaymentMethod(paymentMethod))
       navigate('/placeorder')
   }


    return (
        <div>
            <CheckoutSteps step1 step2 step3 />

            <form className="form"  onSubmit={onSubmitHandler}>

                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="payPal"
                            value="payPal"
                            required
                            checked
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="payPal">PayPal</label>
                    </div>
                </div>

                <div>
                    <div>
                        <input
                            type="radio"
                            id="Stripe"
                            value="Stripe"
                            required
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="Stripe">Stripe</label>
                    </div>
                </div>

                <button className="primary block" type="submit">Continue</button>

            </form>

        </div>
    );
};

export default PaymentScreen;
