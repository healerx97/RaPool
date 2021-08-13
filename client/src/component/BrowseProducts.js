import { Form, FloatingLabel, InputGroup, Button, FormControl } from 'react-bootstrap'
import {useState} from 'react'

import ProductCard from './ProductCard'
function BrowseProducts({createProduct}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [modalProduct, setModalProduct] = useState({})
    const [fundingValue, setFundingValue] = useState("")

    function handleFundingValue(e) {
        setFundingValue(e.target.value)
    }



    async function handleSearch(e) {
        e.preventDefault()
        if (searchTerm) {
        const res = await fetch(`https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?keyword=${searchTerm}&country=US&category=aps`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": process.env.REACT_APP_AMAZON_API_KEY,
                    "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com"
                }
            })
            if (res.ok) {
                console.log("finally")
            }
            const data = await res.json()
            setSearchResults(data.products)
            setSearchTerm("")
            
        }
    }
    function handleChange(e) {
        setSearchTerm(e.target.value)
    }

    async function handleCreateRaffle() {
        let obj = {
            //assuming user 1 is logged in
            host_id: 1,
            remaining_funding: modalProduct.price.current_price - fundingValue

        }
        const r = await fetch('/raffles', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        const raffle_data = await r.json()

        if (r.ok) {
            (async () => {
                const res = await createProduct({
                    raffle_id: raffle_data.id,
                    name: modalProduct.title,
                    price: modalProduct.price.current_price,
                    img_url: modalProduct.thumbnail,
                    details: `Ratings: ${modalProduct.reviews.rating}`
                })
                if (res.ok) {
                const data = await res.json()
                console.log(data)
                alert("Raffle Posted!")
                }
              })()
            }

        
        
        
    }
    return (
        <div className="container">
            <form className="row g-3" onSubmit={handleSearch}>
                <div className="col-auto">
                <input className = "form-control" type="text" placeholder="Search" onChange={handleChange}/>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Search</button>
                </div>
            </form>
            
            <div className = "row row-cols-1 row-cols-md-3 g-4">
                {searchResults ? searchResults.map(product => <ProductCard setFundingValue={setFundingValue} setModalProduct={setModalProduct} product={product}/>):null}
            </div>

            <div className="modal fade" id="product-raffle-view" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{modalProduct.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className='col-md-4'>
                                    <img style={{'width': '25%'}} src={`${modalProduct.thumbnail}`} class="card-img-top" alt="..."/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-3 ms-auto'>
                                        ${modalProduct.price ? modalProduct.price.current_price: 0}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-3 ms-auto'>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">$</span>
                                        <input onChange={handleFundingValue} value = {fundingValue} type="text" class="form-control" aria-label="Funding Amount"/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCreateRaffle}>Create Raffle</button>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default BrowseProducts