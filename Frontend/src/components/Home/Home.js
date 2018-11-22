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
        let details = this.state.books.map(book => {
            return(
                <tr>
                    <td>{book.Name}</td>
                    <td>{book.StudentID}</td>
                    <td>{book.Department}</td>
                    <Delete value={book.StudentID}/>
                </tr>
            )
        })
        
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Students</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Student ID</th>
                                    <th>Deparment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}

export default Home;
