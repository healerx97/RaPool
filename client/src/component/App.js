import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import cable from "./cable"
import NavBar from './NavBar';
import Home from './Home';
import Wins from './Wins';
import Login from './Login';
import Signup from './Signup'
import BrowseProducts from './BrowseProducts';

toast.configure()

function App() {
  const [allRaffles, setAllRaffles] = useState([])
  //login/signup
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  let history = useHistory()

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/me")
      if (res.ok) {
        const json = await res.json()
        setUser(json)
        history.push("/")
      }
    }
    getUser()
  }, [])

  //action cable
  const [constate, setConstate] = useState(true)
  useEffect(()=>{
    if (user) {
    const raffle_params = {
      channel: "RaffleChannel",
      id: user?user.id:null
    }
    const win_params = {
      channel: "WinsChannel",
      id: user?user.id:null
    }
    const all_params = {
      channel: "AllChannel"
    }
    const update_params = {
      channel: "UpdateChannel"
    }
    const raffle_handlers = {
      received(data) {
        const notifyPost = () => toast.success(`Raffle Initiated: ${data.body.product?data.body.product.name:null}`, {position: toast.POSITION.BOTTOM_RIGHT});
        notifyPost()
        getRaffles()
        console.log('recieved raffle signal')
      },
      connected() {
        console.log("connected")
      },
      disconnected() {
        console.log("disconnected")
      },
    }
    const win_handlers = {
      received(data) {
        const notifyPost = () => toast.success(`Winner for ${data.raffle?data.raffle.product.name:null} is ${data.winner?data.winner.username:null}!`, {position: toast.POSITION.BOTTOM_RIGHT});
        notifyPost()
        getRaffles()
        console.log('recieved win signal')
      },
      connected() {
        console.log("connected")
      },
      disconnected() {
        console.log("disconnected")
      },
    }
    const all_handlers = {
      received(data) {
        const notifyPost = () => toast.success(`New Raffle Posted: ${data.body.product.name}`, {position: toast.POSITION.BOTTOM_RIGHT});
        notifyPost()
        getRaffles()
      },
      connected() {
        console.log("connected")
      },
      disconnected() {
        console.log("disconnected")
      },
    }
    const update_handlers = {
      received(data) {
        getRaffles()
        console.log("updated")
      },
      connected() {
        console.log("connected")
      },
      disconnected() {
        console.log("disconnected")
      },
    }
    const raffle_subscription = cable.subscriptions.create(raffle_params, raffle_handlers)
    const win_subscription = cable.subscriptions.create(win_params, win_handlers)
    const all_subscription = cable.subscriptions.create(all_params, all_handlers)
    const update_subscription = cable.subscriptions.create(update_params, update_handlers)
    // console.log(subscription)
    return function cleanup() {
      raffle_subscription.unsubscribe()
      win_subscription.unsubscribe()
      all_subscription.unsubscribe()
      update_subscription.unsubscribe()
      console.log("cleaned up")
    }
    }
  },[user])




  // TIME LEFT for Raffle Countdown
  function timeLeft(time) {
  // time = "2021-08-18T17:02:28.286Z"
  let endTime = Date.parse(time)
  let now = Date.now()
  let dif = endTime - now

  let dateObj = new Date(dif);
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();
  let seconds = dateObj.getSeconds();

  let timeString = hours.toString().padStart(2, '0') + ':' + 
  minutes.toString().padStart(2, '0') + ':' + 
  seconds.toString().padStart(2, '0');
  return timeString
  }

  useEffect(()=>{
    async function addTime(id) {
      const res = await fetch(`/initiatetime/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        }
      })
        // getRaffles()
        }

          if (allRaffles) {
          allRaffles.forEach((raffle)=> {
            if ((!raffle.end_time) && (parseFloat(raffle.remaining_funding) <= 0)) {
              addTime(raffle.id)
              console.log('save me')
            }
  
          }
          )
        }


    }
  ,[allRaffles])

  


  async function logOut() {
    const res = await fetch("/logout", {
      method: "DELETE"
    })
    if (res.ok) {
      setUser(null)
      history.push("/login")
    }
  }
  

  //reusable functions
  async function createProduct(obj) {
    const res = await fetch('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(obj)
    })
    return res
  }

  async function getRaffles() {
    const res = await fetch('/raffles')
    if (res.ok) {
      const data = await res.json()
      setAllRaffles(data)
    }
  }

  //rerender all raffles at page reload
  useEffect(()=> {
    getRaffles()
  },[user])

  return (
    <div className="App content-container">
      
      <NavBar logOut={logOut} user={user}/>
      <Switch>
        <Route exact path = "/browse">
          {user? <BrowseProducts createProduct={createProduct} user={user} getRaffles={getRaffles}/>: <Redirect to="/login" />}
        </Route>
        <Route exact path = "/wins">
        {user? <Wins/>: <Redirect to="/login"/>}
        </Route>
        <Route exact path = "/login">
          <Login username={username} email={email} password={password} errors={errors} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} setErrors={setErrors} onLogin={setUser}/>
        </Route>
        <Route exact path = "/signup">
          <Signup username={username} email={email} password={password} errors={errors} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} setErrors={setErrors} onLogin={setUser}/>
        </Route> 
        <Route exact path = "/">
        {user? <Home allRaffles={allRaffles} getRaffles={getRaffles} user={user} timeLeft={timeLeft}/>: <Redirect to="/login"/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
