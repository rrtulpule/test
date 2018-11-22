import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Delete from '../Delete_button/delete_botton';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            books : []
        }
    }  
     
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                //console.log(response.data);
                this.setState({
                    books : this.state.books.concat(response.data) 
                });
console.log(this.books)
            });
           
    }

    render(){
        //iterate over books to create a table row
                
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Students</h2>
                    <div class="jumbotron">
                    <h1 class="display-4">Send Message</h1>
                    <input id = "name" class="form-control" placeholder="Name"/>
                    
                    <textarea id = "message" class="form-control" placeholder="Your Message Here">
                    </textarea>
                    
                    <button id="send" class="btn btn-success">Send</button>
                    
                    <div id="messages">

                    </div>
                    </div>
                    </div>
                    </div>
                 
        )
    }
}

export default Home;
