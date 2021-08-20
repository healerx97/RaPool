import {useState, useEffect} from 'react'

function RaffleCard({raffle, setParticipationValue, setModalRaffle, timeLeft, getRaffles}) {
    const left_time = raffle.end_time ? timeLeft(raffle.end_time):null
    const [remainingTime, setRemainingTime] = useState(left_time?{
        hr: left_time.substring(0,2),
        min: left_time.substring(3,5),
        sec: left_time.substring(6,8)
    }:
    {})
    function handleCreate() {
        console.log('click')
        setModalRaffle(raffle)
        setParticipationValue(raffle.remaining_funding)
    }
    const renderParticipants = (
        raffle.users.map((user) => {
            return(<p className="card-text">{user.username}</p>)
        })
    )
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

           
    }, 1000);
    return () => clearInterval(interval);}
    }, []);
    if (!raffle.win) {
    if ((Date.parse(raffle.end_time) - Date.now()) < 0 ) {
        fetch(`/wins/${raffle.id}`)
        .then(res=> res.json())
        .then((data) => {
            fetch(`broadcastwin/${data.id}`)
            console.log(data)
            getRaffles()
        })
    }
}

    // console.log(remainingTime.sec)
    if (raffle.product) {
    return (
        <div className = "col">
            <div className = 'card h-100'>
                <img style={{'maxHeight': '150px'}} src={`${raffle.product.img_url}`} class="card-img-top" alt="..."/>
                <div className="card-body">
                    <p className="card-text">{remainingTime?`Time Left: ${left_time}`:null}</p>
                    <h5 className="card-title">{raffle.product.name}</h5>
                    <p className="card-text">Rating: {raffle.product.details}</p>
                    <p>Participants:</p>
                    {raffle.users?renderParticipants:(<p>None</p>)}
                </div>
                <div className="card-footer">
                    <small className="text-muted">Product Price: ${raffle.product.price}</small>
                    <small className="text-muted">Remaining Funding: ${raffle.remaining_funding}</small>
                    <button className='btn-sm' onClick={handleCreate} data-bs-toggle="modal" data-bs-target="#raffle-view">Participate</button>
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

export default RaffleCard