import {useState, useEffect} from 'react'
import {RatingView} from 'react-simple-star-rating'
function ActiveCard({raffle, setModalYours, timeLeft, getRaffles, hostedDisplay, user}) {
    //timer
    const left_time = raffle.end_time ? timeLeft(raffle.end_time):null
    const [remainingTime, setRemainingTime] = useState(left_time?{
        hr: left_time.substring(0,2),
        min: left_time.substring(3,5),
        sec: left_time.substring(6,8)
    }:
    {})
    async function addWin() {
        const res = await fetch(`/wins/${raffle.id}`)
        if (res.ok) {
            const data = await res.json()
            const r = await fetch(`broadcastwin/${data.id}`)
            getRaffles()
        } else {
            getRaffles()
        }
    }

    useEffect(() => {
        
        if (remainingTime) {
    const interval = setInterval(() => {
        if (remainingTime.min < 0) {
            setRemainingTime({
                hr: remainingTime.hr - 1,
                min: remainingTime.min,
                sec: remainingTime.sec
            })
        } else if (remainingTime.sec < 0) {
            setRemainingTime({
                hr: remainingTime.hr,
                min: remainingTime.min - 1,
                sec: remainingTime.sec
            })
        }
        setRemainingTime({
                hr: remainingTime.hr,
                min: remainingTime.min,
                sec: remainingTime.sec -1
            })
            if (!raffle.win) {
                if ((Date.parse(raffle.end_time) - Date.now()) < 0 ) {
                addWin() 
                }
            }
    }, 1000);
    return () => clearInterval(interval);}
    }, [remainingTime]);
    //timer


    function handleOpen() {
        console.log('click')
        setModalYours(raffle)
    }
    const renderParticipants = (
        raffle.users.map((user) => {
            return(<p className="card-text">{user.username}</p>)
        })
    )
    let percentage
        if (raffle.product) {  
        percentage = (raffle.product.price - raffle.remaining_funding) / raffle.product.price * 100
        } else {
            percentage = 0
        }
        let numParticipants = Object.keys(raffle.users).length
    // console.log(remainingTime.sec)

    const hostStyle = {
        'background-color': '#faf1bf'
      }
    if (raffle.product) {
    return (
        // <div className = "col">
        //     <div className = 'card h-100'>
        //         <img style={{'maxHeight': '150px'}} src={`${raffle.product.img_url}`} class="card-img-top" alt="..."/>
        //         <div className="card-body">
        //             <h5 className="card-title">{raffle.product.name}</h5>
        //             <p className="card-text">Rating: {raffle.product.details}</p>
        //             <p>Participants:</p>
        //             {raffle.users?renderParticipants:(<p>None</p>)}
        //         </div>
        //         <div className="card-footer">
        //             <small className="text-muted">Product Price: ${raffle.product.price}</small>
        //             <small className="text-muted">Remaining Funding: ${raffle.remaining_funding}</small>
        //             <button className='btn-sm' onClick={handleOpen} data-bs-toggle="modal" data-bs-target="#win-view">Redeem</button>
        //         </div>
        //     </div>
            
        // </div>
        <div >
            <div className = "col-md-10" onClick={handleOpen} data-bs-toggle="modal" data-bs-target="#part-view" style={{"cursor": "pointer", 'font-family': 'Nunito'}}>
                <div className = 'card h-100 card-blog' style = {hostedDisplay && (raffle.host_id == user.id)?hostStyle:null}>
                    <div className = "card-image">
                        <a href="#">
                            <img className = "img" style={{'maxHeight': '150px', 'borderRadius': '8px', 'overflow': 'hidden'}} src={`${raffle.product.img_url}`} class="card-img-top" alt="..."/>        
                            <div className = "card-caption">
                                {!raffle.win && left_time?`Time Left: ${left_time}`:null}
                            </div>
                        </a>
                        <div className = "ripple-cont"></div>
                    </div>
                    <div className="table">
                        <h6 className="category" style={{'font-family':'Nunito', 'font-size': '120%'}}>{raffle.product.name}</h6>
                        <h2 className="text-muted" style={{'font-family':'Nunito'}}>${raffle.product.price}</h2>
                        <RatingView ratingValue={raffle.product.details}/>
                    </div>
                    <div className="card-body" style={{'marginBottom': "-10%", "marginTop": "-10%"}}>
                        <div class="card l-bg-cherry">
                            <div class="card-statistic-3 p-2">
                                <div class="card-icon card-icon-large"><i class="fas fa-users"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0" style={{'font-family':'Nunito'}}>Product Funding</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8" style={{'font-family':'Nunito', 'font-size': '80%'}}>
                                        <span class="d-flex align-items-center mb-0">
                                            ${parseInt(raffle.product.price - raffle.remaining_funding)}
                                        </span>
                                    </div>
                                    <div class="col-4 text-right" style={{'font-family':'Nunito',  'font-size': '80%'}}>
                                        <span>${raffle.product.price}</span>
                                    </div>
                                                        
                                </div>
                                <div class="progress mt-1 " data-height="8" style={{"height": "12px", "marginBottom": "10px"}}>
                                    <div class="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuemin="0" aria-valuemax="100" style={{'color':'black', "width": `${percentage}%`}}>{parseInt(percentage)}%</div>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0" style={{'font-family':'Nunito'}}>
                                            {numParticipants} Participants
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                                
                    </div>
                    <div className="card-footer" style={{'font-family': 'Nunito',  'font-size': 'small'}}>
                        <h2 className="d-flex align-items-center mb-0 text-muted">{`Hosted by: ${raffle.host.username}`}</h2>
                    </div>
                </div>
            </div>
        </div>

    )}
    else {
        return (
            <div className = "col">
            <div className = 'card h-100'>
                <img style={{'maxHeight': '150px'}} src="https://picsum.photos/200/300" class="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">No Product</h5>
                    <p className="card-text">Sorry!</p>
                </div>
                <div className="card-footer">
                    {/* <small className="text-muted">${raffle.product.price}</small> */}
                    {/* <button className='btn-sm' onClick={handleCreate} data-bs-toggle="modal" data-bs-target="#product-raffle-view">Create Raffle</button> */}
                </div>
            </div>
            
        </div>
        )
    }
}

export default ActiveCard