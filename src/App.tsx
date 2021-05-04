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
    const localToken = localStorage.getItem('token');

    if (localToken) {
      setSessionToken(localToken);
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

  return (
    <div className="App">
      {clearToken}
      <Navbar clearToken={clearToken} token={sessionToken} />
      <Switch>
        <Route exact path='/' component={() => <Home token={sessionToken} updateToken={updateToken} />} /> 
        <Route exact path='/cars' component={() => <CarIndex token={sessionToken} />} />
        <Route exact path='/parts' component={() => <PartIndex token={sessionToken} />} />
      </Switch>   
      <br />
      <Footer />
    </div>
  );
}

export default App;
