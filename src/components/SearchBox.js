import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const SearchBox = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
     const submitHandler = (e) => {
        e.preventDefault()

         if(!name) return false

         navigate(`/search?query=${name}`)

     }

     return (
        <form className="search" onSubmit={submitHandler}>
            <div className="row">
                <input type="text" name="query" id="query" onChange={(e) => setName(e.target.value)} />
                <button  className="primary" type="submit"><i className="fa fa-search"/></button>
            </div>
        </form>
    );
};

export default SearchBox;
