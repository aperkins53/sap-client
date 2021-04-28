import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export interface LoginProps{
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface LoginState{
    email: string;
    password: string;
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/user/login';
        const body: ReqLogin = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json')

        const fetchInfo = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        };

        fetch(url, fetchInfo)
            .then((res) => res.json())
            .then((json: ResLogin) => {
                this.props.setToken(json.sessionToken);
                console.log(json);
            });
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <TextField id="standard-basic" label="Email" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} required />
                    <br />
                    <TextField id="standard-basic" label="Password" type='password' onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} required />
                    <br />
                    <br />
                    <Button variant='outlined' color="primary" type='submit'>Login</Button>
                </form>
            </div>
        )
    }
}

export default Login;

export interface Users{
    email: string;
    password: string;
}

export interface ReqLogin{
    user: Users;
}

export interface ResLogin{
    user: Users;
    message: string;
    sessionToken: string;
}

