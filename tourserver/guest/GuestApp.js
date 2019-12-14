import React from "react";
import ReactDOM from "react-dom";
import everest from "../images/image.png";
import travelMount from "../images/image2.png";
import About from "./About.js";
import Home from "./Home.js";
import Login from "./Login.js";
import Tours from "./tours.js";
//import {Link} from 'react-router-dom';
import {  BrowserRouter as Router,  Route,  Link,  Switch,  Redirect} from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
//import { Helmet } from "react-helmet";


class GuestApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        //here
        role: "guest",
        showing: "Home",
        tours: "",
        }; // We will have "user" and "admin" roles too.
        this.setShowAboutUs = this.setShowAboutUs.bind(this);
        this.setShowHome = this.setShowHome.bind(this);
        this.setShowLogin = this.setShowLogin.bind(this);
        this.OnSucces = this.OnSucces.bind(this);
        this.setComingTours = this.setComingTours.bind(this);
    }
    
    setShowAboutUs(){
        this.setState({
            showing: "About",
        });
    }
    
    setComingTours(){
        this.setState({
            showing: "Tours",
        });
    }
    
    setShowHome(){
        this.setState({
            showing: "Home",
        });
    }
    
    setShowLogin(){
        this.setState({
            showing: "Login",
        });
    }
    
    OnSucces(role, Info){
        this.props.handleLogin(role,Info);
        this.setState({
            user: Info,
        });
    }

    
    // Renders component based on current state and props
    render() {
        return ( 
        <div>
        <nav>
        <span className="CoName" >International tours</span>
    <a onClick={this.setShowHome}>Home </a>
    <a onClick={this.setShowAboutUs}>About us</a>
    <a onClick={this.setShowHome}>Newsletter signup</a>
    <a onClick={this.setShowLogin}>Login</a>
    <a onClick={this.setComingTours}>Coming tours</a>
        </nav><br/>
            
        
        {this.state.showing === "About" && (
         <About />
         )} 
        {this.state.showing === "Home" && (
         <Home />
         )} 
        
        {this.state.showing === "Tours" && (
         <Tours />
         )} 
        
        {this.state.showing === "Login" && (
         <Login OnSucces = {this.OnSucces} />
         )} 
        </div>
)
}
}
    
export default GuestApp;
