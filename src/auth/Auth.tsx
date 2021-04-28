import * as React from 'react';
import Signup from './Signup';
import Login from './Login';
import Grid from '@material-ui/core/Grid'

const Auth = (props) => {
    return(
        <div>
            <Grid container style={{ minHeight: '100vh', paddingTop: '30px' }}>
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