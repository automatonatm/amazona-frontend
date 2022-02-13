import React, {useEffect} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../store/actions/productActions";
import LoadingBox from "../components/utils/LoadingBox";
import MessageBox from "../components/utils/MessageBox";
import Product from "../components/Product";

const SearchScreen = () => {
    const [searchParams] = useSearchParams();

    const params = Object.fromEntries([...searchParams]);

    const query = params.query

    const category =  params.category || ''

   const name = !query ? '' : query




    const {loading, error, products} = useSelector(state => state.productList)
    const {loading: loadingCategory, error: categoryError, categories} = useSelector(state => state.categories)


    const dispatch = useDispatch()

    const getFilterCategory = (filter) => {
        const filterCategory = filter.category || category
        if(name) {
            return `/search?query=${name}&category=${filterCategory}`
        }else {
            return `/search?category=${filterCategory}`
        }


    }

    useEffect(() => {
        dispatch(listProducts({name, category}))
    }, [dispatch, name, category])

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

                    {loadingCategory ? (<LoadingBox/>) : categoryError ? (<MessageBox variant="danger">{categoryError}</MessageBox>) : (

                        <>
                            {categories.length === 0  ?
                                (<MessageBox>No Categories Found</MessageBox>) : (
                                    <ul>
                                        {categories.map((cat, index) => (
                                            <li key={index}>
                                                <Link to={getFilterCategory({category: cat})} className={cat === category ? 'active' : ''}>
                                                    {cat}
                                                </Link>

                                            </li>
                                        ))}

                                    </ul>
                                )}

                           </>

                    )}


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
