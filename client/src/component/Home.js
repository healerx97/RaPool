import RaffleCard from './RaffleCard'

function Home({allRaffles}) {

    const renderRaffles = (
            allRaffles.map(raffle => {
                return (<RaffleCard raffle={raffle}/>)
            })
    )
    console.log(allRaffles)
    return (
        <div className="container">
            <div className = "row row-cols-1 row-cols-md-3 g-4">
                {allRaffles?renderRaffles:null}
            </div>
            
        </div>
    )
}

export default Home