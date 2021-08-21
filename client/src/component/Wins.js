import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
                <h2>Redeemed Raffles</h2>
            <div className = "row row-cols-1 row-cols-md-3 g-4">
                {redeemedRaffles?renderRedeemedRaffles:null}
            </div>
            <br></br>
                <h2>Raffles Ready to be Redeemed</h2>
            <div className = "row row-cols-1 row-cols-md-3 g-4">
                {wonRaffles?renderWonRaffles:null}
            </div>
            {/* raffle modal */}
            <div className="modal fade" id="win-view" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{modalWin.product?modalWin.product.name:null}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className='col-md-4'>
                                    <img style={{'width': '25%'}} src={`${modalWin.product?modalWin.product.img_url:null}`} class="card-img-top" alt="..."/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-4 ms-auto'>
                                        Participants:
                                    </div>
                                    <div className='col-md-4'>
                                        {modalWin.users ?renderParticipants: "no participants"}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-3 ms-auto'>
                                        ${modalWin.product ? modalWin.product.price: 0}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleRedeem}>Redeem</button>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    )
}

export default Wins