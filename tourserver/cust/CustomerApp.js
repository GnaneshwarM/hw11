import React from "react";
import ReactDOM from "react-dom";
import image from "../images/image.png";
//import Home from "./Home.js"
//import About from "./About.js"
//import Login from "./Login.js"

class CustomerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: "Tours",
        };
        this.setShowTours=this.setShowTours.bind(this);

    }
    
    setShowTours(){
        this.setState({
            showing: "Tours",
        });
    }
    
    // Renders component based on current state and props
    render() {
        return (<div>
        <nav>
        <span className="CoName" >International tours</span>
    <a href="tours.html">Home </a>
    <a href="tours.html">About us</a>
    <a href="tours.html">Newsletter signup</a>
    <a href="signup.html">Login</a>
    <a onClick={this.setShowTours}>Coming tours</a>
        </nav><br></br>
                <h1> Tours: not implemented yet </h1>
                
        {this.state.showing === "tours" && (
        <Tours />
        )}    
        
        </div>
        )
            
    }
}

export default CustomerApp;