import React, {useEffect} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../store/actions/productActions";
import LoadingBox from "../components/utils/LoadingBox";
import MessageBox from "../components/utils/MessageBox";
import Product from "../components/Product";
import {prices} from "../utils/index";

const SearchScreen = () => {
    const [searchParams] = useSearchParams();

    const params = Object.fromEntries([...searchParams]);

    const query = params.query

    const category =  params.category || ''

   const name = !query ? '' : query


    const min = params.min || 0
    const max = params.max || 0



    const {loading, error, products} = useSelector(state => state.productList)
    const {loading: loadingCategory, error: categoryError, categories} = useSelector(state => state.categories)

    const dispatch = useDispatch()

    const getFilterUrl = (filter) => {


        const filterCategory = filter.category || category
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max

        return `/search?query=${name}&category=${filterCategory}&min${filterMin}&max=${filterMax}`

       /* if(name) {
            return `/search?query=${name}&category=${filterCategory}&min${filterMin}&max=${filterMax}`
        }else {
            return `/search?category=${filterCategory}&min=${filterMin}&max=${filterMax}`
        }*/


    }




    useEffect(() => {
        dispatch(listProducts({name, category, min, max}))
    }, [dispatch, name, category, min, max])

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
                    <div>
                    {loadingCategory ? (<LoadingBox/>) : categoryError ? (<MessageBox variant="danger">{categoryError}</MessageBox>) : (
                        <>
                            {categories.length === 0  ?
                                (<MessageBox>No Categories Found</MessageBox>) : (
                                    <ul>
                                        {categories.map((cat, index) => (
                                            <li key={index}>
                                                <Link to={getFilterUrl({category: cat})} className={cat === category ? 'active' : ''}>
                                                    {cat}
                                                </Link>

                                            </li>
                                        ))}

                                    </ul>
                                )}

                           </>

                    )}
                    </div>

                    <div>
                        <h3>Price</h3>
                        <ul>
                            {prices.map(p => (
                                <li key={p.name}>
                                    <Link
                                        className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                                          to={getFilterUrl({min: p.min, max: p.max})}>
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

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
