import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

export interface SignupProps{
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface SignupState{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.email.includes('@')){
            alert('This is not a valid email address.')
        }

        if(this.state.password.length < 8){
            alert('Password needs to be at least 8 characters.')
        }

        const url = `http://localhost:3000/user/register`;

        const body: ReqSignup = {
            user: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            },
        };

        let signupHeaders = new Headers();
        signupHeaders.append('Content-Type', 'application/json')

        const fetchInfo = {
            method: 'POST',
            headers: signupHeaders,
            body: JSON.stringify(body)
        };

        fetch(url, fetchInfo)
            .then((res) => res.json())
            .then((json: ResSignup) => {
                this.props.setToken(json.sessionToken);
                console.log(json);
            });
    }

    render(){
        return(
            <div>
                <h1>Signup</h1>
                <form onSubmit={this.onSubmit}>
                    <TextField id="standard-basic" label="First Name" onChange={(e) => this.setState({firstName: e.target.value})} value={this.state.firstName} required />
                    <br />
                    <TextField id="standard-basic" label="Last Name" onChange={(e) => this.setState({lastName: e.target.value})} value={this.state.lastName} required />
                    <br />
                    <TextField id="standard-basic" label="Email" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} required />
                    <br />
                    <TextField id="standard-basic" label="Password" type='password' onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} required />
                    <br />
                    <br />
                    <Button style={{textDecoration: 'underline #554348', color: '#93B7BE', backgroundColor: '#554348',fontWeight: 'bold'}} type='submit'>Sign Up</Button>
                </form>
            </div>
        )
    }
}

//withStyles
export default Signup;

export interface Users{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ReqSignup{
    user: Users;
}

export interface ResSignup{
    user: Users;
    message: string;
    sessionToken: string;
}
