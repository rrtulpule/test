import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Message from './Message/Message';
import Navbar from './LandingPage/Navbar';
import Search from './Search/Search';
import Jobcard from './Cards/Jobcard';
import Carddrawer from './CardDrawer/Carddrawer';
import Jobopen from './Jobopen/Jobopen';
import NormalApply from './Apply/NormalApply';
import EasyApply from './Apply/EasyApply';
import FilterBar from './FilterBar/FilterBar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/" component={Navbar}/> */}
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Message}/>
                {/* <Route path="/delete" component={Delete}/> */}
                <Route path="/create" component={Create}/>
                <Route path="/search" component={Search}/>
                <Route path="/card" component={Jobcard}/>
                <Route path="/drawer" component={Carddrawer}/>
                <Route path="/normal" component={NormalApply}/>
                <Route path="/easy" component={EasyApply}/>
                <Route path="/bar" component={FilterBar}/>
                {/* <Route path="/drawer" component={Jobopen}/> */}

                {/* <Route path="/message" component={Message}/> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;