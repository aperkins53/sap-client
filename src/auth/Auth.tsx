import * as React from 'react';
import Signup from './Signup';
import Login from './Login';
import Grid from '@material-ui/core/Grid'

const Auth = (props) => {
    const gridStyle = {
        minHeight: '100vh',
        paddingTop: '30px',
        backgroundColor: '#D4F5F5',
        color: '#747578'
    }

    return(
        <div>
            <Grid container style={gridStyle} direction='row'>
                <Grid item xs={12} sm={6}>
                    <Signup setToken={props.updateToken} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Login setToken={props.updateToken} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Auth;