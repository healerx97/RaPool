import {useState, useEffect} from 'react'
import {RatingView} from 'react-simple-star-rating'
function WinCard({raffle, setModalWin}) {
    
    function handleOpen() {
        console.log('click')
        setModalWin(raffle)
    }
    const renderParticipants = (
        raffle.users.map((user) => {
            return(<p className="card-text">{user.username}</p>)
        })
    )
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
            <div className = "col-md-10" onClick={handleOpen} data-bs-toggle="modal" data-bs-target="#win-view" style={{"cursor": "pointer", 'font-family': 'Nunito'}}>
                <div className = 'card h-100 card-blog'>
                    <div className = "card-image">
                        <a href="#">
                            <img className = "img" style={{'maxHeight': '150px', 'borderRadius': '8px', 'overflow': 'hidden'}} src={`${raffle.product.img_url}`} class="card-img-top" alt="..."/>        
                            <div className = "card-caption">
                                
                            </div>
                        </a>
                        <div className = "ripple-cont"></div>
                    </div>
                    <div className="table">
                        <h6 className="category" style={{'font-family':'Nunito', 'font-size': '120%'}}>{raffle.product.name}</h6>
                        <h2 className="text-muted" style={{'font-family':'Nunito'}}>${raffle.product.price}</h2>
                        <RatingView ratingValue={raffle.product.details}/>
                    </div>

                    {/* <div className="card-body" style={{'marginBottom': "-10%", "marginTop": "-10%"}}>
                        <div class="card l-bg-cherry">
                            <div class="card-statistic-3 p-2">
                                <div class="card-icon card-icon-large"><i class="fas fa-users"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0" style={{'font-family':'Nunito'}}>Product Funding</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0" style={{'font-family':'Nunito', 'font-size': '80%'}}>
                                            ${raffle.product.price - raffle.remaining_funding}
                                        </h2>
                                    </div>
                                    <div class="col-4 text-right" style={{'font-family':'Nunito',  'font-size': '80%'}}>
                                        <span>{parseInt(percentage)}% <i class="fa fa-arrow-up"></i></span>
                                    </div>                    
                                </div>
                                <div class="progress mt-1 " data-height="8" style={{"height": "8px", "marginBottom": "10px"}}>
                                    <div class="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuemin="0" aria-valuemax="100" style={{"width": `${percentage}%`}}></div>
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
                                
                    </div> */}
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

export default WinCard