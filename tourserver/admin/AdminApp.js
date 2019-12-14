import React from "react";
import ReactDOM from "react-dom";
import image from "../images/image.png";
import Customers from "./Customers.js"
//import About from "./About.js"
//import Login from "./Login.js"

class AdminApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: "Customers",
        };
        this.setShowCustomers=this.setShowCustomers.bind(this);

    }
    
    setShowCustomers(){
        this.setState({
            showing: "Customers",
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
    <a onClick={this.setShowCustomers}>Coming tours</a>
        </nav><br></br>
                
        {this.state.showing === "Customers" && (
        <Customers />
        )}    
        
        </div>
        )
            
    }
}

export default AdminApp;