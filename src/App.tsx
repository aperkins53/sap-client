import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './home/Navbar';
import Footer from './home/Footer';
import Auth from './auth/Auth';
import Home from './home/Home';
import CarIndex from './components/car/CarIndex';
import PartIndex from './components/part/PartIndex';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    console.log('user logged out');
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem('token') ? (
      <Home token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <div className="App">
      <Navbar clearToken={clearToken} token={sessionToken} />
      <Switch>
        <Route exact path='/' component={Home} /> 
        <Route exact path='/cars' component={CarIndex} />
        <Route exact path='/parts' component={PartIndex} />
      </Switch>   
      {protectedViews()}
      <Footer />
    </div>
  );
}

export default App;
