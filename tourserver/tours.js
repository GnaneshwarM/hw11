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