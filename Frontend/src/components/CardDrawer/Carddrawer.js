import React, {Component} from 'react';

import '../../drawer.css'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Card } from '@material-ui/core';
import Jobcard from '../Cards/Jobcard';
import Jobopen from '../Jobopen/Jobopen';


class Carddrawer extends Component{
    
    constructor(props){
        
        super(props);
        
        this.state = {
          
            authFlag : false
        }
        
       
    }

    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    


    render(){

      
        return(
            <div>
                
            <section class="search-box">
            <div class="clearfix"></div>
    <div class="container-fluid">
	<div class="row">
		<div class="col-md-6 listing-block">

       <Jobcard></Jobcard>
     <Jobcard></Jobcard>
     <Jobcard></Jobcard>
     <Jobcard></Jobcard>
           <Jobcard></Jobcard>
		</div>
		<div class="col-md-6 map-box mx-0 px-0">
		    {/* <iframe width="100%" height="595" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=15+Springfield+Way,+Hythe+CT21+5SH,+United+Kingdom&t=m&z=14&ll=51.077429,1.121722&output=embed"></iframe>
		 */}
         <Jobopen></Jobopen>
         </div>
	</div>
</div>
</section>
 
            </div>
           
        )
    }
}

export default Carddrawer;