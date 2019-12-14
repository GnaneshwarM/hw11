import React from "react";
import ReactDOM from "react-dom";
import GuestApp from "./GuestApp.js";
import CustomerApp from "../cust/CustomerApp.js";
import AdminApp from "../admin/AdminApp.js";

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        role: "guest",
        email: null,
        password: null
        };// We will have "user" and "admin" roles too.
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    
     signIn(email, password) {
    this.setState({
        email: email,
        password: password,
      
    })
  }
    setEmail(event){
        this.setState({
            email:event.target.value
        });
    }
    
    setPassword(event){
        this.setState({
            email:event.target.value
        });
    }
    
  
  // Using a class based component here because we're accessing DOM refs
 
  logIn(e) {
    e.preventDefault()
    let email = this.refs.email.value
    let password = this.refs.password.value
    this.signIn(email, password)
  }
  
  render() {
    return (
    <div>
    <main className ="tour">
        <h1>Login</h1>
      <form onSubmit={this.logIn.bind(this)}>
        
        Email : <input type="text" ref="email" placeholder="enter you Email" /><br/>
        Password: <input type="password" ref="password" placeholder="enter password" /><br/>
        <input type="submit" value="Login" />
        <br/>
            <br/>
      </form>
   
    
    {this.state.email === "admin@email.org" && (
         <AdminApp/>
    )}
    
    {this.state.email === "cust@email.org" && (
         <CustomerApp/>
    )}
    <br/>
    <br/>
     </main>
      </div>
        )
        
  }

}

export default Login;
