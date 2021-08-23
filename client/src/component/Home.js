import { useState } from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import RaffleCard from './RaffleCard'

toast.configure()

function Home({allRaffles, getRaffles, user, timeLeft}) {

    const [modalRaffle, setModalRaffle] = useState({})
    const [participationValue, setParticipationValue] = useState("")
    const [noLoginError, setNoLoginError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('all')
    function handleParticipationValue(e) {
        setParticipationValue(e.target.value)
    }
    const notifyError = () => toast.error("You must be logged in!", {position: toast.POSITION.TOP_CENTER});

    async function handleParticipate() {
        let obj = {
            // logged in user id
            user_id: user?user.id:null,
            raffle_id: modalRaffle.id,
            bought_shares: participationValue
        }
        const res = await fetch('/participate', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(obj)
        })
        
        const data = await res.json()
        if (res.ok) {
            // console.log(data)
            const r = await fetch(`/rafflefunds/${modalRaffle.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({remaining_funding: modalRaffle.remaining_funding - participationValue})
            })
            const d = await r.json()
            if (r.ok) {
                // console.log(d)
                getRaffles()
            }
            
        } else {
            notifyError()
        }
    }
    function handleCategory(e) {
        e.preventDefault()
        setSelectedCategory(e.target.id)
    }
    console.log(selectedCategory)

    let filteredRaffles = (selectedCategory==='all')?(allRaffles.filter(raffle=> {
        return (
            raffle.product.category == selectedCategory
        )
    })):allRaffles

    const renderRaffles = (        
            filteredRaffles.map(raffle => {                
                return (<RaffleCard key={raffle.id} getRaffles={getRaffles} raffle={raffle} setModalRaffle={setModalRaffle} setParticipationValue={setParticipationValue} timeLeft={timeLeft}/>)
            })
    )
    const renderParticipants = (
        (modalRaffle.users?
            modalRaffle.users.map((user) => {
                return(`${user.username}`)
            }) : null)
    )
    // console.log(allRaffles)
    return (
    <div>
        <div class="container mt-4">
            <div class="row d-flex justify-content-center">
                <div class="col-md-9">
                    <div class="card p-4 mt-3" style={{'font-family': 'nunito', 'background-color': 'rgb(243, 241, 234)'}}>
                        <h3 class="heading mt-5 text-center">Active Raffles</h3>
                        <div class="d-flex justify-content-center px-5">
                            <div class="search"> <input type="text" class="search-input" placeholder="Search..." name=""/> <a href="#" class="search-icon"> <i class="fa fa-search"></i> </a> </div>
                        </div>
                        <div class="row mt-4 g-1 px-4 mb-3">
                            <div class="col-md-2">
                                <div id="all" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-trophy" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">All</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="home" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-home" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Home</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="electronics" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-laptop" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Electronics</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="outdoor" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-sun" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Outdoor</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="clothing" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-shopping-bag" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Clothing</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="officeSupplies" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-book" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Office Supplies</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="baby" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-child" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Baby</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="pets" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-paw" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Pets</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="justForFun" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-hand-peace" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Just For Fun</span> </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div id="misc" class="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-question" aria-hidden="true" width="10"/>
                                    <div class="text-center mg-text"> <span class="mg-text">Misc</span> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className = "row row-cols-1 row-cols-md-3 g-4">
                {allRaffles?renderRaffles:null}
            </div>
            {/* raffle modal */}
            <div className="modal fade" id="raffle-view" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            
                            <div className="card">
                                <div class="cardio">
                                    <div class="path">HOME / FACE <a>/ CLEANSERS</a> </div>
                                    <div class="row">
                                        <div class="col-md-6 text-center align-self-center"> <img class="img-fluid" src={`${modalRaffle.product?modalRaffle.product.img_url:null}`} style={{'maxHeight': '300px'}}/> </div>
                                        <div class="col-md-6 info">
                                            <div class="row title">
                                                <div class="col">
                                                    <h2>{modalRaffle.product?modalRaffle.product.name:null}</h2>
                                                </div>
                                                <div class="col text-right"><a href="#"><i class="fa fa-heart-o"></i></a></div>
                                            </div>
                                            <p>Natural herbal wash</p> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star-half-full"></span> <span id="reviews">1590 Reviews</span>
                                            <div class="row price">
                                                <span>Price</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row lower">
                                        <div className="col"></div>
                                        <div className="col"></div>
                                        <div className="col align-self-center">
                                        <div class="input-group mb-3">
                                            <span class="input-group-text">$</span>
                                            <input onChange={handleParticipationValue} value = {participationValue} type="text" class="form-control" aria-label="Funding Amount"/>
                                        </div>
                                        </div>
                                        <div class="col text-right align-self-center"> <button className="btn" style={{'fontFamily': 'Nunito', 'textAlign': 'right'}}>Add to cart</button> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleParticipate}>Participate</button>
                            
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    )
}

export default Home