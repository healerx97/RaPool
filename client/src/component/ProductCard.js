function ProductCard({product, setModalProduct, setFundingValue}) {
    // console.log(product)
    function handleCreate() {
        console.log('click')
        setModalProduct(product)
        setFundingValue(product.price.current_price)
    }

    return (
        <div className = "col">
            <div className = 'card h-100'>
                <img style={{'maxHeight': '150px'}} src={`${product.thumbnail}`} class="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">Rating: {product.reviews.rating}</p>
                    <p className="card-text">{product.reviews.total_reviews} reviews</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{product.price.currency} {product.price.current_price}</small>
                    <button className='btn-sm' onClick={handleCreate} data-bs-toggle="modal" data-bs-target="#product-raffle-view">Create Raffle</button>
                </div>
            </div>
            
        </div>

    )
}

export default ProductCard