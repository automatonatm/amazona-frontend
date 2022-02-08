import React, {useEffect, useState} from 'react';
import Rating from "../components/Rating";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import LoadingBox from "../components/utils/LoadingBox";
import MessageBox from "../components/utils/MessageBox";
import {getProductDetails} from "../store/actions/productActions";


const ProductScreen = () => {



    const [qty, setQty] = useState(1)

    const params = useParams();


    const navigate = useNavigate();

    const {loading, error, product} = useSelector(state => state.productDetails)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductDetails(params.id))
    }, [dispatch, params])

    const addToCartHandler = () => {

         navigate(`/cart/${params.id}?qty=${qty}`)

    }


    return (
        <div>

            {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (

                <div>
                    <Link to="/">Back to Result</Link>
                    <div className="row top">

                        <div className="col-2" >
                            <img className="large" src={`/products/${product.image}`} alt={product.name}/>
                        </div>

                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating numReviews={product.numReviews} rating={product.rating} />
                                </li>
                                <li>
                                    Price ${product.price}
                                </li>
                                <li>
                                    Description:
                                    <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>

                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">${product.price}</div>
                                        </div>
                                    </li>


                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>{product.countInStock > 0 ?
                                                <span className="success">In Stock</span>
                                                : <span className="danger">Unavailable</span>
                                            }</div>
                                        </div>
                                    </li>

                                    {product.countInStock > 0 && (
                                        <>
                                        <li>
                                            <div className="row">
                                                <div>Qty</div>
                                               <div>
                                                   <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                       {
                                                           [...Array(product.countInStock).keys()].map((x) => (
                                                               <option key={x} value={x+1}>{x+1}</option>
                                                           ))
                                                       }
                                                   </select>

                                               </div>
                                            </div>
                                        </li>

                                        <li>
                                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                        </li>

                                        </>
                                    )
                                    }

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            )}




        </div>
    );
};

export default ProductScreen;
