import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Switch, Route, Link } from 'react-router-dom';
import CarIndex from '../components/car/CarIndex';
import PartIndex from '../components/part/PartIndex';
import Auth from '../auth/Auth';
import Button from '@material-ui/core/Button';

const Home = (props) => {
    const [sessionToken, setSessionToken] = useState('');

    const updateToken = (newToken) => {
        localStorage.setItem("token", newToken);
        setSessionToken(newToken);
        console.log(newToken);
    };

    const protectedViews = () => {
        if (sessionToken === null){
          <Auth updateToken={updateToken} />
        }
    }

    const carLinkStyle = {
        textDecoration: 'underline #554348',
        color: '#93B7BE',
        backgroundColor: '#554348',
        fontWeight: 'bold',
        marginRight: '10px'
    }

    const partLinkStyle = {
        textDecoration: 'underline #554348',
        color: '#93B7BE',
        backgroundColor: '#554348',
        fontWeight: 'bold',
        marginLeft: '10px'
    }

    const gridStyle = {
        backgroundColor: '#D4F5F5',
        height: '85vh',
        color: '#747578'
    }

    return(<div>
        {props.token ?
        <Grid container justify='center' style={gridStyle}>
            <Grid item>
                <h1 style={{fontSize: '50px', paddingTop: '30px'}}>Welcome to Greenwood Auto Parts Online!</h1>
                <br />
                <h3>We buy and sell unwanted vehicles as well as any new, used, or aftermarket auto parts.</h3>
                <br />
                <Grid item style={{marginTop: '20px', marginBottom: '25px'}}>
                    <Link to='/cars'>
                        <Button variant='contained' style={carLinkStyle}>Cars</Button>
                    </Link>
                    <Link to='/parts'>
                        <Button variant='contained' style={partLinkStyle}>Parts</Button>
                    </Link>
                </Grid>
                <p>Here you can find our inventory to see what used cars we have for sale,
                <br />or if we have the used part you need to fix your car.</p>
                <Switch>
                    <Route exact path='/cars' component={() => <CarIndex token={sessionToken} />} />
                    <Route exact path='/parts' component={() => <PartIndex token={sessionToken} />} />
                    {protectedViews()}
                </Switch>  
            </Grid>
        </Grid> : <Auth {...props} />}
        </div>
    )
};

export default Home;