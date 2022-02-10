import axios from "axios";
import Cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT : process.env.REACT_APP_API_URL_PRODUCTION

const token = Cookies.get('authToken');



export default axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` },
})

