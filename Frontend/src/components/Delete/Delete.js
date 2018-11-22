import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class Delete extends Component{

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.bookIDHandler = this.bookIDHandler.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    bookIDHandler = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
   
    //submit Login handler to send a request to the node backend
    deleteRecord = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.BookID
           
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                    this.setState({
                        authFlag : true
                        
                    }
                )
                return window.location.href = '/home';
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }




    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
       
        return(
            <div class="container">
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input onChange = {this.bookIDHandler} type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick={this.deleteRecord} class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
        )
    }
}

export default Delete;