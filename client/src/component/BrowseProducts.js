import { Form, FloatingLabel, InputGroup, Button, FormControl } from 'react-bootstrap'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Rating,RatingView } from 'react-simple-star-rating'
import ProductCard from './ProductCard'
function BrowseProducts({createProduct, user, getRaffles}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [modalProduct, setModalProduct] = useState({})
    const [fundingValue, setFundingValue] = useState("")
    const [selectValue, setSelectValue] = useState("all")
    let history = useHistory()

    function handleFundingValue(e) {
        setFundingValue(e.target.value)
    }
    function handleSelect(e) {
        setSelectValue(e.target.value)
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
                const data = await res.json()
                console.log(data.products)
                setSearchResults(data.products)
                setSearchTerm("")
            }
            
            
        }
    }

    function handleChange(e) {
        setSearchTerm(e.target.value)
    }

    async function handleCreateRaffle() {
        let obj = {
            //assuming user 1 is logged in
            host_id: user.id,
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
            let partObj = {
                user_id: user?user.id:null,
                raffle_id: raffle_data.id,
                bought_shares: fundingValue
            }
            const asdf = await fetch('/participate', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(partObj)
            })
            if (asdf.ok) {
            (async () => {
                const res = await createProduct({
                    raffle_id: raffle_data.id,
                    name: modalProduct.title,
                    price: modalProduct.price.current_price,
                    img_url: modalProduct.thumbnail,
                    details: `${modalProduct.reviews.rating}`,
                    category: selectValue
                })
                if (res.ok) {
                const data = await res.json()
                console.log(data)
                getRaffles()
                alert("Raffle Posted!")
                history.push('/')
                }
              })()
            }
        }
    }

    const renderProducts =  (
        searchResults.map(product=> {
            return ( <ProductCard setFundingValue={setFundingValue} setModalProduct={setModalProduct} product={product}/>)
        })
    )
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
                {renderProducts ? renderProducts:null}
            </div>

            <div className="modal fade" id="product-raffle-view" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl" >
                        <div className="modal-content" style={{'background-color': 'rgb(243, 241, 234)'}}>
                        <div className="modal-header" style={{'background-color': 'rgb(243, 241, 234)'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{'font-family': 'Nunito'}}>
                            
                            <div className="card" style={{'background-color': 'rgb(243, 241, 234)'}}>
                                <div class="cardio card">
                                    <div class="path"> </div>
                                    <div class="row">
                                        <div class="col-md-6 text-center align-self-center"> <img class="img-fluid" src={`${modalProduct?modalProduct.thumbnail:null}`} style={{'maxHeight': '300px'}}/> </div>
                                        <div class="col-md-6 info">
                                            <div class="row title" style={{'font-family': 'Nunito', 'font-size': '100px'}}>
                                                <div class="col">
                                                    <h3 style={{'font-family': 'Nunito', 'font-size': '20%'}}>{modalProduct?modalProduct.title:null}</h3>
                                                </div>
                                            </div>                                
                                            <RatingView ratingValue={modalProduct.reviews?modalProduct.reviews.rating:null}/> {` [${modalProduct.reviews?modalProduct.reviews.rating:null}]`}                                        
                                            <div class="row price">
                                                <span>${modalProduct.price?modalProduct.price.current_price:null}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row lower">
                                        <div className="col"></div>
                                        <div className="col"></div>
                                        <div className="col align-self-center">
                                            <div className="form-group row">
                                                <div className="col align-self-center">
                                                <label for="categorySelect">Product Category</label>
                                                </div>
                                                <div className="col">
                                                <select class="form-select" aria-label="category" id="categorySelect"onChange = {handleSelect} value={selectValue}>
                                                    <option value ="all">All</option>
                                                    <option value="home">Home</option>
                                                    <option value="electronics">Electronics</option>
                                                    <option value="outdoor">Outdoor</option>
                                                    <option value="clothing">Clothing</option>
                                                    <option value="officeSupplies">Office Supplies</option>
                                                    <option value="baby">Baby</option>
                                                    <option value="pets">Pets</option>
                                                    <option value="justForFun">Just For Fun</option>
                                                    <option value="misc">Misc</option>
                                                </select>                                                
                                                </div>

                                            </div>
                                        <div className="row">
                                            <div className="col">
                                                <label for="initialFunding">Initial Funding:</label>
                                            </div>
                                            <div class="input-group mb-3 col">
                                                <span class="input-group-text">$</span>
                                                <input id="initialFunding" onChange={handleFundingValue} value = {fundingValue} type="text" class="form-control" aria-label="Funding Amount" style={{'marginRight':'5%'}}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col"/>
                                            <div class="col align-self-center"> <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleCreateRaffle} style={{'fontFamily': 'Nunito'}}>Post</button> </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            </div>

            {/* <div className="modal fade" id="product-raffle-view" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
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
            </div> */}
        </div>
    )
}

export default BrowseProducts