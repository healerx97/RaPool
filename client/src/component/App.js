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
import BrowseProducts from './BrowseProducts';

function App() {
  const [allRaffles, setAllRaffles] = useState([])

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
      
      <NavBar/>
      <Switch>
        <Route exact path = "/browse">
          <BrowseProducts createProduct={createProduct}/>
        </Route>
        <Route exact path = "/wins">
          <Wins/>
        </Route>
        <Route exact path = "/login">
          <Login/>
        </Route> 
        <Route exact path = "/">
          <Home allRaffles={allRaffles} getRaffles={getRaffles}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
