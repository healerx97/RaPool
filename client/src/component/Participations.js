import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {RatingView} from 'react-simple-star-rating'
import { useState, useEffect } from 'react'
import YourCard from './YourCard'
import ActiveCard from './ActiveCard'
import RedeemedCard from './RedeemedCard'
toast.configure()

function Participations({getRaffles, user, timeLeft, allRaffles}) {
    const [modalYours, setModalYours] = useState({})
    const [activeRaffles, setActiveRaffles] = useState([])
    const [yourRaffles, setYourRaffles] = useState([])
    const [hostedRaffles, setHostedRaffles] = useState([])
    async function getYourRaffles(){
        const res = await fetch('/yours')
        if (res.ok) {
            const data = await res.json()
            setYourRaffles(data.filter(raffle=> !!raffle.win))
            setActiveRaffles(data.filter(raffle=> !raffle.win))
            if (user) {
            setHostedRaffles(data.filter(raffle=> raffle.host.id == user.id))
            }
        }
    }
    useEffect(()=>{
        getYourRaffles()
    },[allRaffles])
    // async function handleRedeem() {
    //     const res = await fetch(`/redeem/${modalYours.id}`)
    //     if (res.ok) {
    //         const data = await res.json()
    //         const notifyPost = () => toast.success(`Product "${data.product.name}" Redeemed!`, {position: toast.POSITION.BOTTOM_RIGHT});
    //         notifyPost()
    //         getWonRaffles()
    //     }
    // }

     const renderYourRaffles = (
            yourRaffles.map(raffle => {
                return (<YourCard timeLeft={timeLeft} raffle={raffle} setModalYours={setModalYours} getRaffles={getRaffles} />)
            })
    )
    const renderActiveRaffles = (
        activeRaffles.map(raffle => {
            return (<ActiveCard timeLeft={timeLeft} raffle={raffle} setModalYours={setModalYours} getRaffles={getRaffles} />)
        })
)
    // const renderHostedRaffles = (
    //     activeRaffles.map(raffle => {
    //         return (<ActiveCard timeLeft={timeLeft} raffle={raffle} setModalYours={setModalYours} getRaffles={getRaffles} />)
    //     })
    // )

    const renderParticipants = (
        (modalYours.users?
            modalYours.users.map((user) => {
                return(`${user.username}`)
            }) : null)
    )

    

    return (
        <div>
            <div className="container">
                <div className="accordion" id="part-raffles-acc" style={{'font-family':'Nunito'}}>
                    <div className="card">
                        <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Active Raffles
                            </button>
                        </h2>
                        </div>
                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-bs-parent="#part-raffles-acc">
                            <div className="card-body">
                                <div className = "row row-cols-1 row-cols-md-3 g-4">
                                    {activeRaffles?renderActiveRaffles:null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Past Raffles
                            </button>
                        </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#part-raffles-acc">
                            <div className="card-body">
                                <div className = "row row-cols-1 row-cols-md-3 g-4">
                                    {yourRaffles?renderYourRaffles:null}
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
            {/* raffle modal */}

            <div className="modal fade" id="part-view" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            
                            <div className="card">
                                <div className="cardio" style={{'font-family':'Nunito', 'width': '100%!important'}}>
                                    <div className="path">{modalYours.product?modalYours.product.category.toUpperCase():null}</div>
                                    <div className="row">
                                        <div className="col-md-6 text-center align-self-center"> <img className="img-fluid" src={`${modalYours.product?modalYours.product.img_url:null}`} style={{'maxHeight': '300px'}}/> </div>
                                        <div className="col-md-6 info">
                                            <div className="row title">
                                                <div className="col align-self-center col font-weight-bold" style={{"font-size": "150%", 'font-weight': '600', 'marginBottom':'3%'}}>
                                                    <div>{modalYours.product?modalYours.product.name:null}</div>
                                                </div>
                                            </div>
                                            <p>{modalYours.purpose}</p> <RatingView ratingValue={modalYours.product?modalYours.product.details:null}/> {` [${modalYours.product?modalYours.product.details:null}]`}
                                            <div className="row price" style={{'marginTop': '3%'}}>
                                                <span>${modalYours.product?modalYours.product.price:null}</span>
                                            </div>
                                            <div className="row donations" style={{'marginTop': '3%'}}>
                                                <span>{modalYours.product && (modalYours.remaining_funding <= 0)?`Donated $${(- modalYours.remaining_funding)}`:null}</span>
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
        </div>
    )
}

export default Participations