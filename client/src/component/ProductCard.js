import {Rating, RatingView} from 'react-simple-star-rating'
function ProductCard({product, setModalProduct, setFundingValue}) {
    // console.log(product)
    function handleCreate() {
        console.log('click')
        setModalProduct(product)
        setFundingValue(product.price.current_price)
    }

    return (
        // <div className = "col">
        //     <div className = 'card h-100'>
        //         <img style={{'maxHeight': '150px'}} src={`${product.thumbnail}`} class="card-img-top" alt="..."/>
        //         <div className="card-body">
        //             <h5 className="card-title">{product.title}</h5>
        //             <p className="card-text">Rating: {product.reviews.rating}</p>
        //             <p className="card-text">{product.reviews.total_reviews} reviews</p>
        //         </div>
        //         <div className="card-footer">
        //             <small className="text-muted">{product.price.currency} {product.price.current_price}</small>
        //             <button className='btn-sm' onClick={handleCreate} data-bs-toggle="modal" data-bs-target="#product-raffle-view">Create Raffle</button>
        //         </div>
        //     </div>
            
        // </div>
        <div>
            <div className = "col-md-10" onClick={handleCreate} data-bs-toggle="modal" data-bs-target="#product-raffle-view" style={{"cursor": "pointer", 'font-family': 'Lucida Console'}}>
                <div className = 'card h-100 card-blog'>
                    <div className = "card-image">
                        <a href="#">
                            <img className = "img" style={{'maxHeight': '150px', 'borderRadius': '8px', 'overflow': 'hidden'}} src={`${product.thumbnail}`} class="card-img-top" alt="..."/>                                
                        </a>
                        <div className = "ripple-cont"></div>
                    </div>
                    <div className="table">
                        <h6 className="category" style={{'font-family':'Nunito'}}>{product.title}</h6>
                        <h2 className="text-muted" style={{'font-family':'Nunito'}}>${product.price.current_price}</h2>
                        <RatingView ratingValue={product.reviews.rating}/>
                    </div>

                    <div className="card-body" style={{'marginBottom': "-10%", "marginTop": "-10%"}}>
                        
                                
                    </div>                    
                </div>
            </div>
        </div>

    )
}

export default ProductCard