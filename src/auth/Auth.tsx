import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Auth = (props) => {
    const [toggle, setToggle] = useState(true);

    const handleToggle = () => {
        if(toggle === true){
            setToggle(false)
        } else {
            setToggle(true)
        }
    }

    const gridStyle = {
      minHeight: "100vh",
      paddingTop: "30px",
      backgroundColor: "#D4F5F5",
      color: "#747578",
    };

    return(
        <Grid style={gridStyle}>
            {toggle === true ? <><Signup setToken={props.updateToken} /><Button onClick={handleToggle}>Already a member?</Button></> : <><Login setToken={props.updateToken} /><Button onClick={handleToggle}>Need an account?</Button></>}
        </Grid>
    )
}

// const Auth = (props) => {
//     const gridStyle = {
//         minHeight: '100vh',
//         paddingTop: '30px',
//         backgroundColor: '#D4F5F5',
//         color: '#747578'
//     }

//     return(

//     )

    // return(
    //     <div>
    //         <Grid container style={gridStyle} direction='row'>

    //             <Grid item xs={12} sm={6}>
    //                 <Signup setToken={props.updateToken} />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //                 <Login setToken={props.updateToken} />
    //             </Grid>
    //         </Grid>
    //     </div>
    // )
// }

export default Auth;