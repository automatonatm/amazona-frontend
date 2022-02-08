const currentFormatter = (amount, currencyCode = 'USD') =>  {
    return  (amount).toLocaleString('en-US', {
        style: 'currency',
        currency: currencyCode,
    })
}

export default currentFormatter