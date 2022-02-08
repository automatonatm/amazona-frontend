import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listProducts, productDelete} from "../../store/actions/productActions";
import LoadingBox from "../../components/utils/LoadingBox";
import MessageBox from "../../components/utils/MessageBox";
import currentFormatter from "../../components/utils/currencyFormmater";
import {useNavigate} from "react-router-dom";
import {PRODUCT_DELETE_RESET} from "../../store/constants/productsConstants";

const ProductsScreen = () => {

    const {loading, error, products} = useSelector(state => state.productList)
    const {loading: loadingDelete, error: errorDelete, success} = useSelector(state => state.productDelete)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!products || success) {
            dispatch({type: PRODUCT_DELETE_RESET})
            dispatch(listProducts())
        }

    }, [dispatch, products, success])

    const deleteProductHandler = (productId) =>  {
        if(window.confirm("Are you sure to delete")) {
            dispatch(productDelete(productId))
        }

    }


    return (
        <div>

            <div className="row">
                <h1>Products</h1>
                <button type="button" className="small primary">Create Product</button>
            </div>

            {loadingDelete && <LoadingBox />}
            {errorDelete && (<MessageBox variant='danger'>{errorDelete}</MessageBox>)}


            {loading ? (<LoadingBox/>) :
                error ? (<MessageBox variant='danger'>{error}</MessageBox>) : (
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{currentFormatter(product.price)}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button className="small" onClick={() => navigate(`/admin/products/${product.id}`)}>Edit</button>
                                    <button className="small" onClick={() => deleteProductHandler(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) }
        </div>
    );
};

export default ProductsScreen;
