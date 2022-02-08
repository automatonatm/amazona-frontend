import React, {useEffect} from 'react';
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../store/actions/cartActions";
import MessageBox from "../components/utils/MessageBox";
import currencyFormmater from "../components/utils/currencyFormmater";

const CartScreen = (props) => {

    const params = useParams()

    const productId = params.productId

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const {cartItems} = useSelector(state => state.cart)

    const [searchParams] = useSearchParams();

    const query = Object.fromEntries([...searchParams]);

    const qty = Object.keys(query).length ? Number(query.qty) : 1


    useEffect(() => {

        if(productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, productId, qty])


    const removeFromCartHandler = (product)  => {
        dispatch(removeFromCart(product))
    }

    const checkOutHandler = () => {
            navigate(`/shipping`)
    }


    return (
        <div className="row top">

            <div className="col-2">

                <h1>Shopping Cart</h1>
                {cartItems.length ===0 ? <MessageBox>Cart is empty. <Link to='/'>Go Shopping</Link></MessageBox> : (
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
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            {currencyFormmater(item.price)}
                                        </div>

                                        <div>
                                            <button type="button" onClick={() => {removeFromCartHandler(item.product)}}>Delete</button>
                                        </div>


                                    </div>

                                </li>

                            ))
                        }
                    </ul>
                )}
            </div>

            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : {currencyFormmater(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}
                            </h2>
                        </li>
                        <li>
                            <button type="button" className="primary block" onClick={checkOutHandler} disabled={cartItems.length===0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CartScreen;
