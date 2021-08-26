import {useState, useEffect} from 'react'
import {RatingView} from 'react-simple-star-rating'
function YourCard({raffle, setModalYours, timeLeft, getRaffles}) {
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
    let numParticipants = Object.keys(raffle.users).length

    // console.log(remainingTime.sec)
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
                <div className = 'card h-100 card-blog'>
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
                        <h6 className="text-muted" style={{'font-family':'Nunito'}}>{raffle.purpose}</h6>
                        <RatingView ratingValue={raffle.product.details}/>
                        <h2 class=" align-items-center mb-0" style={{'font-family':'Nunito'}}>{numParticipants} Participants</h2>
                    </div>
                    <div className="card-footer" style={{'font-family': 'Nunito',  'font-size': 'small'}}>
                        <h2 className="d-flex align-items-center mb-0 text-muted">{`Hosted by: ${raffle.host.username}`}</h2>
                        <h2 className="d-flex align-items-center mb-0">{`Winner: ${raffle.win.winner.username}`}</h2>
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

export default YourCard