import React from "react";
import ReactDOM from "react-dom";
import everest from "./guest/images/image.png";
import travelMount from "./images/image2.png";
import GuestApp from "./guest/GuestApp.js";
import CustomerApp from "./cust/CustomerApp.js";
import AdminApp from "./admin/AdminApp.js";
import login from "./Login.js";


//import { Helmet } from "react-helmet";

let everestImage = <img src={everest} alt="Mount Everest" width = "300" height="200" className="image_tour" />;
let travelMountImage = <img src={travelMount} alt="Mount Everest" width = "300" height="200"/>;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {role: "guest", user: null}; // We will have "user" and "admin" roles too.
        
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    
    /*login(role,userInfo){
        this.setState({role:role, user:"abcd"});
    }*/
    
    handleLogin(role, Info){
        if(role === "admin"){
            console.log(role);
            console.log(Info);
            this.setState({
                role : role,
                user: Info,
            })
        } else if(role === "customer"){
            this.setState({
                role : role,
                user: Info,
            })
        }
    }
    
    handleLogout(){
        this.setState({
            role: "guest",
            user: null,
        })
        
    }
    
    // Renders component based on current state and props
    render() {        
            switch(this.state.role){
            case 'guest':
                return <GuestApp handleLogin = {this.handleLogin} />
                break;
            case 'customer':
                return <CustomerApp handleLogout = {this.handleLogout}/>
                break;
            case 'admin':
                return <AdminApp handleLogout = {this.handleLogout}/>
                break;
            default:
                return <GuestApp handleLogin = {this.handleLogin} />
                break;
        }
        
        
    }
}
    
ReactDOM.render(<App />, document.getElementById("root"));
