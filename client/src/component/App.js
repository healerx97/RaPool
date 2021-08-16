import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import NavBar from './NavBar';
import Home from './Home';
import Wins from './Wins';
import Login from './Login';
import Signup from './Signup'
import BrowseProducts from './BrowseProducts';

function App() {
  const [allRaffles, setAllRaffles] = useState([])
  //login/signup
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])

  let history = useHistory()

  async function logOut() {
    const res = await fetch("/logout", {
      method: "DELETE"
    })
    if (res.ok) {
      setUser(null)
      history.push("/login")
    }
  }
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
  useEffect(()=> {
    
    getRaffles()
  },[])

  return (
    <div className="App">
      
      <NavBar logOut={logOut} user={user}/>
      <Switch>
        <Route exact path = "/browse">
          <BrowseProducts createProduct={createProduct} user={user} getRaffles={getRaffles}/>
        </Route>
        <Route exact path = "/wins">
          <Wins/>
        </Route>
        <Route exact path = "/login">
          <Login username={username} email={email} password={password} errors={errors} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} setErrors={setErrors} onLogin={setUser}/>
        </Route>
        <Route exact path = "/signup">
          <Signup username={username} email={email} password={password} errors={errors} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} setErrors={setErrors} onLogin={setUser}/>
        </Route> 
        <Route exact path = "/">
          <Home allRaffles={allRaffles} getRaffles={getRaffles} user={user}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
