import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {RatingView} from 'react-simple-star-rating'
import { useState, useEffect } from 'react'
import WinCard from './WinCard'
import RedeemedCard from './RedeemedCard'
toast.configure()

function Wins({getRaffles, user}) {
    const [modalWin, setModalWin] = useState({})
    const [wonRaffles, setWonRaffles] = useState([])
    const [redeemedRaffles, setRedeemedRaffles] = useState([])
    async function getWonRaffles(){
        const res = await fetch('/wins')
        if (res.ok) {
            const data = await res.json()
            setRedeemedRaffles(data.filter(raffle=> raffle.win.status == "Redeemed"))
            setWonRaffles(data.filter(raffle=> raffle.win.status == "Not Redeemed"))
        }
    }
    useEffect(()=>{
        getWonRaffles()
    },[])
    async function handleRedeem() {
        const res = await fetch(`/redeem/${modalWin.id}`)
        if (res.ok) {
            const data = await res.json()
            const notifyPost = () => toast.success(`Product "${data.product.name}" Redeemed!`, {position: toast.POSITION.BOTTOM_RIGHT});
            notifyPost()
            getWonRaffles()
        }
    }

     const renderWonRaffles = (
            wonRaffles.map(raffle => {
                return (<WinCard raffle={raffle} setModalWin={setModalWin}/>)
            })
    )
    const renderRedeemedRaffles = (
        redeemedRaffles.map(raffle => {
            return (<RedeemedCard raffle={raffle} setModalWin={setModalWin}/>)
        })
)
    const renderParticipants = (
        (modalWin.users?
            modalWin.users.map((user) => {
                return(`${user.username}`)
            }) : null)
    )
    return (
        <div>
            <div className="container">

                <div className="accordion" id="wins-raffles-acc" style={{'font-family':'Nunito'}}>
                    <div className="card">
                        <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Redeemed Raffles
                            </button>
                        </h2>
                        </div>
                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-bs-parent="#wins-raffles-acc">
                            <div className="card-body">
                                <div className = "row row-cols-1 row-cols-md-3 g-4">
                                    {redeemedRaffles?renderRedeemedRaffles:null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Raffles Ready to be Redeemed
                            </button>
                        </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#wins-raffles-acc">
                            <div className="card-body">
                                <div className = "row row-cols-1 row-cols-md-3 g-4">
                                    {wonRaffles?renderWonRaffles:null}
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
            {/* unredeemed modal */}
            <div className="modal fade" id="win-view" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{modalWin.product?modalWin.product.name:null}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <div className="cardio" style={{'font-family':'Nunito', 'width': '100%!important'}}>
                                    <div className="path">{modalWin.product?modalWin.product.category.toUpperCase():null}</div>
                                    <div className="row">
                                        <div className="col-md-6 text-center align-self-center"> <img className="img-fluid" src={`${modalWin.product?modalWin.product.img_url:null}`} style={{'maxHeight': '300px'}}/> </div>
                                        <div className="col-md-6 info">
                                            <div className="row title">
                                                <div className="col align-self-center col font-weight-bold" style={{"font-size": "150%", 'font-weight': '600', 'marginBottom':'3%'}}>
                                                    <div>{modalWin.product?modalWin.product.name:null}</div>
                                                </div>
                                            </div>
                                            <p>{modalWin.purpose}</p> <RatingView ratingValue={modalWin.product?modalWin.product.details:null}/> {` [${modalWin.product?modalWin.product.details:null}]`}
                                            <div className="row price" style={{'marginTop': '3%'}}>
                                                <span>${modalWin.product?modalWin.product.price:null}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {modalWin.win && modalWin.win.status=="Not Redeemed"?<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleRedeem}>Redeem</button>:null}
                        </div>
                        </div>
                    </div>
            </div>

            {/* Redeemed Modal */}
        </div>
        </div>
    )
}

export default Wins