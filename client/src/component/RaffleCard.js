function RaffleCard({raffle}) {
    // console.log(product)
    // function handleCreate() {
    //     console.log('click')
    //     setModalProduct(product)
    //     setFundingValue(product.price.current_price)
    // }
    if (raffle.product) {
    return (
        <div className = "col">
            <div className = 'card h-100'>
                <img style={{'maxHeight': '150px'}} src={`${raffle.product.img_url}`} class="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{raffle.product.name}</h5>
                    <p className="card-text">Rating: {raffle.product.details}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">${raffle.product.price}</small>
                    {/* <button className='btn-sm' onClick={handleCreate} data-bs-toggle="modal" data-bs-target="#product-raffle-view">Create Raffle</button> */}
                </div>
            </div>
            
        </div>

    )}
    else {
        return (
            <div className = "col">
            <div className = 'card h-100'>
                <img style={{'maxHeight': '150px'}} src="https://picsum.photos/200/300" class="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">No Product</h5>
                    <p className="card-text">Sorry!</p>
                </div>
                <div className="card-footer">
                    {/* <small className="text-muted">${raffle.product.price}</small> */}
                    {/* <button className='btn-sm' onClick={handleCreate} data-bs-toggle="modal" data-bs-target="#product-raffle-view">Create Raffle</button> */}
                </div>
            </div>
            
        </div>
        )
    }
}

export default RaffleCard