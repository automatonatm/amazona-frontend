import React, {useEffect} from 'react';
import Product from "../components/Product";
import LoadingBox from "../components/utils/LoadingBox";
import MessageBox from "../components/utils/MessageBox";
import {useSelector, useDispatch} from "react-redux";
import {listProducts} from "../store/actions/productActions";

const HomeScreen = () => {

   const {loading, error, products} = useSelector(state => state.productList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])


    return (
        <div>
            {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
                <div className="row center">
                    {products.map(product => (
                        <Product product={product} key={product._id} />
                    )) }
                </div>
            )}

        </div>
    );
};

export default HomeScreen;
