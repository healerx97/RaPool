import { useState,useEffect } from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import RaffleCard from './RaffleCard'

toast.configure()

function Home({allRaffles, getRaffles, user, timeLeft}) {

    const [modalRaffle, setModalRaffle] = useState({})
    const [participationValue, setParticipationValue] = useState("")
    const [noLoginError, setNoLoginError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [raffleSearchTerm, setRaffleSearchTerm] = useState('')
    const [dfilteredRaffles, setDfilteredRaffles] = useState([])

    function handleParticipationValue(e) {
        setParticipationValue(e.target.value)
    }
    const notifyError = () => toast.error("You must be logged in!", {position: toast.POSITION.TOP_CENTER});

    function handleChange(e) {
        e.preventDefault()
        
    }

    function handleSubmit(e) {
        e.preventDefault()
        setRaffleSearchTerm(e.target.children[0].value)
        e.target.children[0].value = ''
        
    }

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
        setRaffleSearchTerm('')
        setSelectedCategory(e.target.id)
    }

    // const filteredRaffles =(selectedCategory==='all')?allRaffles:(allRaffles.filter(raffle=> {
    //     return (
    //         (raffle.product.category?raffle.product.category:null) == selectedCategory
    //     )
    // }))
        useEffect(() => {
            if (raffleSearchTerm) {
                setDfilteredRaffles((selectedCategory==='all')?
                allRaffles.filter(raffle=> {
                    return (
                        ((raffle.product?raffle.product.name.toLowerCase():null).includes(raffleSearchTerm.toLowerCase()))
                    )
                })
                :allRaffles.filter(raffle=> {
                    return (
                        ((raffle.product?raffle.product.name.toLowerCase():null).includes(raffleSearchTerm.toLowerCase())) && ((raffle.product.category?raffle.product.category:null) == selectedCategory)
                    )
                })
            )
            } else {
            setDfilteredRaffles((selectedCategory==='all')?allRaffles:(allRaffles.filter(raffle=> {
                return (
                    (raffle.product.category?raffle.product.category:null) == selectedCategory
                )
            })))
            }

            console.log(selectedCategory)
        },[allRaffles, selectedCategory, raffleSearchTerm])

    
    const renderRaffles = (
            dfilteredRaffles.map(raffle => {                
                return (<RaffleCard key={raffle.id} getRaffles={getRaffles} raffle={raffle} setModalRaffle={setModalRaffle} setParticipationValue={setParticipationValue} timeLeft={timeLeft}/>)
            })
    )

    // useEffect(() => {
    //     if (raffleSearchTerm) {
    //         let dfilteredRaffles = filteredRaffles.filter(raffle=> {
    //             return (
    //                 (raffle.product?raffle.product.name:null).includes(raffleSearchTerm)
    //             )
    //         })
    //     } else {
    //     let dfilteredRaffles = filteredRaffles}
    // },[filteredRaffles])
    const renderParticipants = (
        (modalRaffle.users?
            modalRaffle.users.map((user) => {
                return(`${user.username}`)
            }) : null)
    )
    

    return (
    <div>
        <div className="container mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-9">
                    <div className="card p-4 mt-3" style={{'font-family': 'nunito', 'background-color': 'rgb(243, 241, 234)'}}>
                        <h3 className="heading mt-5 text-center">Active Raffles</h3>
                        <div className="d-flex justify-content-center px-5">
                            <div className="search"> <form onSubmit={handleSubmit}><input type="text" className="search-input" placeholder="Search active raffles..." name=""/> <button className="search-icon"> <i className="fa fa-search"></i> </button> </form></div>
                        </div>
                        <div className="row mt-4 g-1 px-4 mb-3">
                            <div className="col-md-2">
                                <div className= {`card-inner p-3 d-flex flex-column align-items-center`} id="all" onClick={handleCategory}> <i className="fa fa-trophy" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">All</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="home" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-home" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Home</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="electronics" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-laptop" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Electronics</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="outdoor" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-sun" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Outdoor</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="clothing" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-shopping-bag" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Clothing</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="officeSupplies" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-book" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Office Supplies</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="baby" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-child" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Baby</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="pets" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-paw" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Pets</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="justForFun" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-hand-peace" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Just For Fun</span> </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="misc" className="card-inner p-3 d-flex flex-column align-items-center" onClick={handleCategory}> <i className="fa fa-question" aria-hidden="true" width="10"/>
                                    <div className="text-center mg-text"> <span className="mg-text">Misc</span> </div>
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
                                <div className="cardio">
                                    <div className="path">HOME / FACE <a>/ CLEANSERS</a> </div>
                                    <div className="row">
                                        <div className="col-md-6 text-center align-self-center"> <img className="img-fluid" src={`${modalRaffle.product?modalRaffle.product.img_url:null}`} style={{'maxHeight': '300px'}}/> </div>
                                        <div className="col-md-6 info">
                                            <div className="row title">
                                                <div className="col">
                                                    <h2>{modalRaffle.product?modalRaffle.product.name:null}</h2>
                                                </div>
                                                <div className="col text-right"><a href="#"><i className="fa fa-heart-o"></i></a></div>
                                            </div>
                                            <p>Natural herbal wash</p> <span className="fa fa-star checked"></span> <span className="fa fa-star checked"></span> <span className="fa fa-star checked"></span> <span className="fa fa-star checked"></span> <span className="fa fa-star-half-full"></span> <span id="reviews">1590 Reviews</span>
                                            <div className="row price">
                                                <span>Price</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row lower">
                                        <div className="col"></div>
                                        <div className="col"></div>
                                        <div className="col align-self-center">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">$</span>
                                            <input onChange={handleParticipationValue} value = {participationValue} type="text" className="form-control" aria-label="Funding Amount"/>
                                        </div>
                                        </div>
                                        <div className="col text-right align-self-center"> <button className="btn" style={{'fontFamily': 'Nunito', 'textAlign': 'right'}}>Add to cart</button> </div>
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