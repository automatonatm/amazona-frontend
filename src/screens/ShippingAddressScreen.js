import React, { useState} from 'react';
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../store/actions/cartActions";
import MessageBox from "../components/utils/MessageBox";
import {useNavigate} from "react-router-dom";

const ShippingAddressScreen = () => {


  //  const  {authenticated, loading} = useSelector(state => state.authUser)

    const  {shippingAddress} = useSelector(state => state.cart)

    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [error, setError] = useState('')



    const dispatch = useDispatch()
    const navigate = useNavigate()





/*
    useEffect(() => {
        if(!loading) {
            if(authenticated === false) {
                navigate('/signin')
            }
        }

    }, [authenticated, navigate, loading])*/




    const submitHandler = (e) => {

        e.preventDefault()

        if(!fullName || !country || !city || !postalCode || !country) {
            setError('Fill all form fields')
            return
        }
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}))

        navigate('/payment')
    }


    return (
        <div>
            <CheckoutSteps step1 step2/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>

                {error && <MessageBox variant='danger'>{error}</MessageBox>}


                <div>
                    <label htmlFor="fullName" >Full Name </label>
                    <input type="text" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value )} />
                </div>

                <div>
                    <label htmlFor="address" >Address</label>
                    <input type="text" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value )} />
                </div>


                <div>
                    <label htmlFor="city" >City </label>
                    <input type="text" id="city" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value )} />
                </div>

                <div>
                    <label htmlFor="postalCode" >Postal Code </label>
                    <input type="text" id="postalCode" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value )} />
                </div>

                <div>
                    <label htmlFor="country" >Country </label>
                    <input type="text" id="country" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value )} />
                </div>

                <label />
                    <button type="submit" className="primary block">
                        Continue
                    </button>




            </form>
        </div>
    );
};

export default ShippingAddressScreen;
