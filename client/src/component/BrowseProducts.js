import { Form, FloatingLabel, InputGroup, Button, FormControl } from 'react-bootstrap'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Rating,RatingView } from 'react-simple-star-rating'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductCard from './ProductCard'
function BrowseProducts({createProduct, user, getRaffles}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [modalProduct, setModalProduct] = useState({})
    const [fundingValue, setFundingValue] = useState("")
    const [selectValue, setSelectValue] = useState("all")
    const [errors, setErrors] = useState(null)
    const [purposeState, setPurposeState] = useState('')
    let history = useHistory()

    function handleFundingValue(e) {
        setFundingValue(e.target.value)
    }
    function handleSelect(e) {
        e.preventDefault()
        setSelectValue(e.target.value)
    }
    function handlePurposeChange(e) {
        setPurposeState(e.target.value)
    }

    async function handleSearch(e) {
        e.preventDefault()
        if (searchTerm) {
        const res = await fetch(`https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?keyword=${searchTerm}&country=US&category=aps`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": REACT_APP_AMAZON_API_KEY,
                    "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
                    'X-Requested-With': 'XMLHttpRequest'

                },
                'credentials': 'include'
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
            remaining_funding: modalProduct.price.current_price - fundingValue,
            purpose: purposeState
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
                } else {
                    const data = await res.json()             
                    const notifyError = () => toast.error(data.error.category[0], {position: toast.POSITION.TOP_CENTER});
                    notifyError()
                    const raffleReset = await fetch(`/raffles/${raffle_data.id}`, {
                        method: 'DELETE'
                    })
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
            <div className="d-flex justify-content-center px-5">
                <div className="search"> <form onSubmit={handleSearch}><input type="text" className="search-input" placeholder="Search active raffles..." value = {searchTerm} onChange={handleChange}/> <button className="search-icon"> <i className="fa fa-search"></i> </button> </form></div>
            </div>
            <div className = "row row-cols-1 row-cols-md-3 g-4" style={{'marginTop': '5%'}}>
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
                                            <RatingView ratingValue={modalProduct.reviews?modalProduct.reviews.rating:null}/> <p className="align-self-center">{` [${modalProduct.reviews?modalProduct.reviews.rating:null}]`}  </p>
                                            <div class="row price">
                                                <span>${modalProduct.price?modalProduct.price.current_price:null}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row lower" style={{'font-family': 'Nunito'}}>
                                        <div className="col"></div>
                                        {/* <div className="col"></div> */}
                                        <div className="col align-self-center">
                                            <div className="form-group row">
                                                <div className="col align-self-center">
                                                <label for="categorySelect">Product Category:</label>
                                                </div>
                                                <div className="col" style={{'marginLeft': '-40%'}}>
                                                <select class="form-select" aria-label="category" id="categorySelect" onChange = {handleSelect} style={{'font-family': 'Nunito'}} value={selectValue}>
                                                    <option value ="undef">Select product category..</option>
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
                                            <div className="col align-self-center">
                                                <label for="initialFunding">Initial Funding:</label>
                                            </div>
                                            <div class="input-group mb-3 col align-self-center" style={{'marginTop':'3%', 'marginLeft':'-40%'}}>
                                                <span class="input-group-text">$</span>
                                                <input id="initialFunding" onChange={handleFundingValue} value = {fundingValue} type="text" class="form-control" aria-label="Funding Amount" style={{ 'width': '1rem'}}/>
                                            </div>
                                        </div>
                                        <div className="row" style={{'height': '100px', 'marginTop':'0.5%'}}>
                                            <div className="col align-self-top">Purpose:</div>
                                            <div class="col align-self-top"><textarea value = {purposeState} onChange = {handlePurposeChange} type="text" rows='3' className = "form-control" style={{'marginLeft':'-40%', 'width':'140%'}}/>  </div>
                                        </div>
                                        <div className="row">
                                            <div className="col"/>
                                            <div class="col align-self-center" style={{'marginLeft':'70%', 'marginTop': '3%'}}> <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleCreateRaffle} style={{'fontFamily': 'Nunito', 'width': '103%'}}>Post</button> </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default BrowseProducts