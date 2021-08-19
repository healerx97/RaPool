import { useState } from 'react'

import RaffleCard from './RaffleCard'

function Home({allRaffles, getRaffles, user, timeLeft}) {
    const [modalRaffle, setModalRaffle] = useState({})
    const [participationValue, setParticipationValue] = useState("")
    function handleParticipationValue(e) {
        setParticipationValue(e.target.value)
    }

    async function handleParticipate() {
        let obj = {
            // logged in user id
            user_id: user.id,
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
            console.log(data)
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
            
        }
    }

    const renderRaffles = (
            allRaffles.map(raffle => {
                return (<RaffleCard getRaffles={getRaffles} raffle={raffle} setModalRaffle={setModalRaffle} setParticipationValue={setParticipationValue} timeLeft={timeLeft}/>)
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
        <div className="container">
            <div className = "row row-cols-1 row-cols-md-3 g-4">
                {allRaffles?renderRaffles:null}
            </div>
            {/* raffle modal */}
            <div className="modal fade" id="raffle-view" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{modalRaffle.product?modalRaffle.product.name:null}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className='col-md-4'>
                                    <img style={{'width': '25%'}} src={`${modalRaffle.product?modalRaffle.product.img_url:null}`} class="card-img-top" alt="..."/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-4 ms-auto'>
                                        Participants:
                                    </div>
                                    <div className='col-md-4'>
                                        {modalRaffle.users ?renderParticipants: "no participants"}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-3 ms-auto'>
                                        ${modalRaffle.product ? modalRaffle.product.price: 0}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-3 ms-auto'>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">$</span>
                                        <input onChange={handleParticipationValue} value = {participationValue} type="text" class="form-control" aria-label="Funding Amount"/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleParticipate}>Participate</button>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Home