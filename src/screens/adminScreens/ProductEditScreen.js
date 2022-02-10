import React, {useEffect, useState} from 'react';

import {useNavigate, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import LoadingBox from "../../components/utils/LoadingBox";
import MessageBox from "../../components/utils/MessageBox";
import {getProductDetails, productUpdate} from "../../store/actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../../store/constants/productsConstants";
import axios from "axios";


const ProductEditScreen = () => {



    const params = useParams();
    const productId = params.productId

    const navigate = useNavigate()


    const {loading, error, product} = useSelector(state => state.productDetails)

    const {loading: loadingUpdate, error: errorUpdate, success} = useSelector(state => state.productUpdate)


    const [loadingUpload, setLoadingUpload] = useState(false)
    const [uploadError, setUploadError] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')


    const dispatch = useDispatch()

    useEffect(() => {

        if(success) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/products')
        }

        if(!product || (product.id) !== productId) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            dispatch(getProductDetails(productId))

        }else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }

    }, [dispatch, productId, product, navigate, success])


    const submitHandler =  (e) => {
        e.preventDefault()
        const data = {
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }

        dispatch(productUpdate(productId, data))

    }

    const uploadImage =  async (e) => {

        const file  = e.target.files[0]
        const bodyFormData = new FormData()
        bodyFormData.append('image', file)
        
        setLoadingUpload(true)
        
        try {
            const config = {
                'Content-Type' : 'multi/form-data'
            }
            const {data} = await axios.put(`/api/v1/products/${productId}/uploads`, bodyFormData, config)

            setLoadingUpload(false)
            setImage(data.data)


        }catch (err) {
            setUploadError(err.response && err.response.data.message ? err.response.data.message : err.message)
            setLoadingUpload(false)
        }


    }



    return (
        <div>


            {loading ? <LoadingBox /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (

                <div>
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                            <h1>Edit Product {productId}</h1>
                        </div>

                            <>
                                {loadingUpdate && <LoadingBox />}
                                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input id="price" type="text" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input id="image" type="text" placeholder="Enter name" value={image} onChange={(e) => setImage(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="image-upload">Image Upload</label>
                                    <input id="image-upload" type="file" label="Select file"  onChange={uploadImage} />
                                </div>

                                {loadingUpload && (<LoadingBox />)}
                                {uploadError && (<MessageBox>{uploadError}</MessageBox>)}

                                <div>
                                    <label htmlFor="category">Category</label>
                                    <input id="category" type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="brand">Brand</label>
                                    <input id="brand" type="text" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="countInStock">Count In Stock</label>
                                    <input id="countInStock" type="text" placeholder="Enter count In Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"  placeholder="Enter description"  value={description} onChange={(e) => setDescription(e.target.value)}
                                    >
                                      </textarea>

                                </div>

                            </>


                        <label />

                        <button type="submit" onChange={submitHandler} className="primary block">Edit Product</button>

                    </form>
                </div>

            )}




        </div>
    );
};

export default ProductEditScreen;
