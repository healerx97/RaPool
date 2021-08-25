import {useState, useEffect} from 'react'
import {RatingView} from 'react-simple-star-rating'
function RedeemedCard({raffle, setModalWin}) {
    
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

export default RedeemedCard