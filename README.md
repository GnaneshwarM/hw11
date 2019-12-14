**Student Name**:  Gnanehswar Mandava

**NetID**: df5864



# Homework #11 Solutions

## Question 1  Proxy


###  (a) Dev Test

![1a](/images/1a.PNG)
			


 ### b)  Proxy Test
 
![1b](/images/1b.PNG)

```Javascript
// Need Local install of parcel-bundler so we and import it below.
const Bundler = require('parcel-bundler');
const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
// Paths we want to forward to the app server
const forward = ['/tours', '/login', '/logout','/tours/delete/'];
app.use(forward, proxy({target: 'http://127.0.0.11:1711'}));
// Instance of the parcel.js bundler with start file
const bundler = new Bundler('./index.html');
app.use(bundler.middleware());
app.listen(1234);

```
 ### 2.) Getting Tours
  #### (a) Updated Tours Component
  
 ``` Javascript
import React from "react";


class Tours extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            hasErrors: false,
            tours: []
    };
    }

  componentDidMount() {
    let that = this;
    fetch("/tours")
      .then(function(response){
            if(response.ok){
                return response.json();
            } else{
                let info =`Status Code: ${response.status}, ${response.statusText}`;
                console.log('response ',response);
                return Promise.reject(info);
            }
        })
        .then(function(tours){
            that.setState({
                isLoaded:true,
                tours:tours
            });
            console.log('tours ',tours);
        })
        .catch(function(msg){
            console.log("Something bad "+msg);
        })
  }
    
    bodyDetails() {
      return this.state.tours.map((tour, index) => {
         return (
            <tr>
               <td>{tour.Name}</td>
               <td>{tour.Date}</td>
            </tr>
         )
      })
}


  render() {
      let toursInfo= this.state.tours;
    //return <div>{JSON.stringify(this.state.tours)}</div>;
      return( <div>
             <main className ="main_tour">
                <h3>Virtual Tours:</h3>
             <table>
             <thead>
             <tr>
             <th>Name</th>
             <th>Date</th>
             </tr>
             </thead>
             <tbody>
             {this.bodyDetails()}
             </tbody>
             </table>
             
    </main>
    </div>
    );
  }
}

export default Tours;

 ```
 
 #### (b) Tour Test
 
 ![2b](/images/2b.PNG)

  
## Question 3 Login/Logout Integration

### (a) Login via Server

![3a](/images/3a.PNG)


### (b) Login Handler code


``` Javascript

    signIn() {
       let that = this;
        console.log("Button pressed");
        
        if(this.state.email === "sided1830@outlook.com"){
            console.log('admin');
            console.log(this.state);
            this.props.OnSucces("admin",{email: this.state.email, password: this.state.password});
        }
        else if(this.state.email === "cust@email.org"){
            console.log('customer');
            this.props.OnSucces("customer",{email: this.state.email, password: this.state.password});
        }   
        else {
            console.log('guest');
            this.props.OnSucces("guest",{email: this.state.email, password: this.state.password});
        }
        fetch('/login',{
            method:'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(function(response){
            if(response.ok){
                return response.json();
            } else{
                let info =`Status Code: ${response.status}, ${response.statusText}`;
                console.log('response ',response);
                return Promise.reject(info);
            }
            console.log(response.json());
            return response.json();
        }).then(function(Info){
            console.log('Info',Info);
            that.props.OnSucces(Info.role,Info)
        })
    }

```


### (c) Logout Handler Code

``` Javascript

  signOut() {  
		 let that = this;
         fetch('/logout')
       .then(function(response){
                if(response.ok){
                return response.json();
            } else{
                let info =`Status Code: ${response.status}, ${response.statusText}`;
                console.log('response ',response);
                return Promise.reject(info);
            }
        })
        .then(function(Info){
          that.props.handleLogout("guest",null);
        })
        .catch(function(msg){
            console.log("Something bad "+msg);
        })	 
  }

```

## Question 4 Admin Add Tour

### (a) Send tour to server

![4a](/images/4a.PNG)

### (b) Update the List of Tours

![4b](/images/4b.PNG)


### (c) Show Updated Code

```Javascript

     addTour() {
       let that = this;
        console.log("Button pressed");
        
        fetch('/tours',{
            method:'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                Date: this.state.Date,
                Name: this.state.Name
            })
        }).then(function(response){
            if(response.ok){
                return response.json();
            } else{
                let info =`Status Code: ${response.status}, ${response.statusText}`;
                console.log('response ',response);
                return Promise.reject(info);
            }
            console.log(response.json());
            return response.json();
        }).then(function(tour){
            that.setState(tour);
        })
    }

```

## Question 5 Admin Delete Tour

### (a) Delete Request to Server


![5a](/images/5a.PNG)

### (b) Update Tour Info

```Javascript

    deleteTour(i)
	{
        let that = this;
        const updatedTours = this.state.tours;
        let deleteTour;
        deleteTour = updatedTours[i];
		fetch("/tours/delete/" + deleteTour._id, {
            method: 'DELETE'
        })
        .then(response => response.json());

		var localtours = this.state.tour;
		that.setState({tour: localtours});  
	}
```

### ToursDB File

```JSON
{"Name":"Germany","Date":"Starting April 2020","_id":"AQPDPgZPA3ERWUsd"}
{"Name":"Spain","Date":"Starting February 2020","_id":"L9Bv8CF8BtXXO0L9"}
{"Name":"London","Date":"Starting March 2020","_id":"UUtw8RCHK8yZIvpf"}
{"Name":"Brazil","Date":"Starting january 2020","_id":"akV6hWPaSyXjjUK0"}
{"Name":"Italy","Date":"Starting December 2019","_id":"frPsGrv7o2sUH42J"}
{"Name":"nowhere","Date":"never","_id":"h5Xr5ypuoB2bTZai"}


```