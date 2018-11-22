import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Login extends Component{
    
    constructor(props){
        
        super(props);
        
        this.state = {
            username : "",
            password : "",
            authFlag : false
        }
        
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
   
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
   
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }

    render(){

        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Admin Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Login;