import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../store/actions/productActions";
import LoadingBox from "../components/utils/LoadingBox";
import MessageBox from "../components/utils/MessageBox";
import Product from "../components/Product";

const SearchScreen = () => {
    const [searchParams] = useSearchParams();

    const params = Object.fromEntries([...searchParams]);

    const query = params.query

   const name = !query ? '' : query

   // console.log(name)


    const {loading, error, products} = useSelector(state => state.productList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts({name}))
    }, [dispatch, name])

    return (
        <div>
            <div className="row">
                {loading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                    <div>
                        {products.length} Results
                    </div>
                )}
            </div>

            <div className="row top">
                <div className="col-1">
                    <h3>Department</h3>
                    <ul>
                        <li>Category 1</li>
                    </ul>

                </div>
                <div className="col-2">

                    {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
                        <>
                            {products.length === 0 && (
                                <MessageBox>No products Found</MessageBox>
                            )}
                        <div className="row center">
                            {products.map(product => (
                                <Product product={product} key={product._id} />
                            )) }
                        </div>
                        </>
                    )}

                </div>

            </div>


            
        </div>
    );
};

export default SearchScreen;
