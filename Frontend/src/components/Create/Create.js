import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import '../../App.css';

class Create extends Component{

    constructor(props){

        super(props);

        this.state = {
            BookID : "",
            Author : "",
            Title : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.bookIDChangeHandler = this.bookIDChangeHandler.bind(this);
        this.authorChangeHandler = this.authorChangeHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.createBook = this.createBook.bind(this);
       
    }

    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

    bookIDChangeHandler = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }
    authorChangeHandler = (e) => {
        this.setState({
            Author : e.target.value
        })
    }


    titleChangeHandler = (e) => {
        this.setState({
            Title : e.target.value
        })
    }

    createBook = (e) => {
        var headers = new Headers();

        e.preventDefault();
        const data = {
            BookID : this.state.BookID,
            Author : this.state.Author,
            Title : this.state.Title
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
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
            <div>
            {redirectVar}
                <br/>
                <div class="container">
                   
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.bookIDChangeHandler} type="text" class="form-control" name="BookID" placeholder="Student Name"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.titleChangeHandler} type="text" class="form-control" name="Title" placeholder="StudentID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.authorChangeHandler} type="text" class="form-control" name="Author" placeholder="Department"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick={this.createBook} class="btn btn-success" type="submit">Create</button>
                        </div> 
                   
                </div>
            </div>
        )
    }
}

export default Create;