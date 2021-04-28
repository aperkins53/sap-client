import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CarIndex from '../components/car/CarIndex';
import Home from './Home';
import Auth from '../auth/Auth';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const Navbar = (props) => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }

    return(
        <AppBar position="static">
        <Toolbar>
            <Typography variant='h6' color='inherit'>
                SAP Auto Parts
            </Typography>
            <Grid container justify='flex-end'>
                <Link to='/' style={linkStyle}>
                    <Button color='inherit'>Home</Button>
                </Link>
                <Link to='/cars' style={linkStyle}>
                    <Button color='inherit'>Cars</Button>
                </Link>
                <Link to='/parts' style={linkStyle}>
                    <Button color='inherit'>Parts</Button>
                </Link>
                <Button color="inherit" onClick={props.clearToken}>Logout</Button>
            </Grid>
        </Toolbar>
        </AppBar>
    )
}

export default Navbar;