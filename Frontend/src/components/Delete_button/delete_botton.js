import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class Delete_button extends Component{

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        this.state = {
            StudentID : "",
        }
        this.onClick = this.onClick.bind(this);
        //maintain the state required for this component
    }
    onClick() {
        console.log(this.props.value);
        
        const data = {
            StudentID : this.props.value
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/delete',data)
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
            window.location.reload();
        }




    render(){
       
        return(
            
              
                   
                    <div>
                            <button class="btn btn-success" type="submit" onClick ={this.onClick}>Delete</button>
                    </div> 
                
        )
    }
}

export default Delete_button;