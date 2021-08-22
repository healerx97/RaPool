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

    if (!raffle.win) {
    if ((Date.parse(raffle.end_time) - Date.now()) < 0 ) {
    addWin() 
    }
}
    let percentage
  if (raffle.product) {  
   percentage = (raffle.product.price - raffle.remaining_funding) / raffle.product.price * 100
  } else {
       percentage = 0
  }
  let numParticipants = Object.keys(raffle.users).length
  
  function handleClick() {
      console.log("clicked")
  }



    // console.log(remainingTime.sec)
    if (raffle.product) {
    return (
        <div onClick={handleClick} style={{"cursor": "pointer", 'font-family': 'Lucida Console'}}>
            <div className = "col-md-10">
                <div className = 'card h-100 card-blog'>
                    <div className = "card-image">
                        <a href="#">
                            <img className = "img" style={{'maxHeight': '150px'}} src={`${raffle.product.img_url}`} class="card-img-top" alt="..."/>        
                            <div className = "card-caption">
                                {left_time?`Time Left: ${left_time}`:null}
                            </div>
                        </a>
                        <div className = "ripple-cont"></div>
                    </div>
                    <div className="table">
                        <h6 className="category" style={{'font-family': 'Arial'}}>{raffle.product.name}</h6>
                        <h2 className="text-muted">${raffle.product.price}</h2>
                        <p className = "card-description" style={{'font-family': 'Arial'}}>
                        Rating: {raffle.product.details}
                        </p>
                    </div>

                    <div className="card-body">
                        <div class="card l-bg-cherry">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large"><i class="fas fa-users"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Product Funding</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            {numParticipants} Participants
                                        </h2>
                                    </div>
                                    <div class="col-4 text-right">
                                        <span>{parseInt(percentage)}% <i class="fa fa-arrow-up"></i></span>
                                    </div>
                                    
                                </div>
                                <div class="progress mt-1 " data-height="8" style={{"height": "8px"}}>
                                    <div class="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuemin="0" aria-valuemax="100" style={{"width": `${percentage}%`}}></div>
                                </div>
                            </div>
                        </div>
                                
                                <h2 className="text-muted">Remaining Funding: ${raffle.remaining_funding}</h2>
                    </div>
                    <div className="card-footer" style={{'font-family': 'Nova Flat'}}>
                        
                        <button className='btn-sm' onClick={handleCreate} data-bs-toggle="modal" data-bs-target="#raffle-view">Participate</button>
                    </div>
                </div>
        
            
                    {/* <div class="card l-bg-cherry">
                        <div class="card-statistic-3 p-4">
                            <div class="card-icon card-icon-large"><i class="fas fa-users"></i></div>
                            <div class="mb-4">
                                <h5 class="card-title mb-0">Product Funding</h5>
                            </div>
                            <div class="row align-items-center mb-2 d-flex">
                                <div class="col-8">
                                    <h2 class="d-flex align-items-center mb-0">
                                        {numParticipants} Participants
                                    </h2>
                                </div>
                                <div class="col-4 text-right">
                                    <span>{parseInt(percentage)}% <i class="fa fa-arrow-up"></i></span>
                                </div>
                            </div>
                            <div class="progress mt-1 " data-height="8" style={{"height": "8px"}}>
                                <div class="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuemin="0" aria-valuemax="100" style={{"width": `${percentage}%`}}></div>
                            </div>
                        </div>
                    </div> */}
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