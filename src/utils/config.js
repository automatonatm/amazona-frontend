const config = {
    baseURL : process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT : process.env.REACT_APP_API_URL_PRODUCTION
}

export  default config