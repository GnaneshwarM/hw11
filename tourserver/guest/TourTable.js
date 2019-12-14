import React from "react";
import ReactDOM from "react-dom";
import tours from "./tours.json";

class TourTable extends React.Component {
 
 constructor(props){
 super(props);
	 this.state = {tours :  tours}
	 this.headerDetails = this.headerDetails.bind(this);
	 this.bodyDetails = this.bodyDetails.bind(this);
	
}
    
headerDetails() {
      let header = Object.keys(this.state.tours[0])
      return header.map((key, index) => {
         return <th className="th" key={index}>{key}</th>
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
	 
	 
  render(){
  return (
	  <div>
      <main className ="main_tour">
      <h3>Virtual Tours:</h3>
      	<table>
     <thead>
     	{this.headerDetails()}
      </thead>
	  <tbody>
      {this.bodyDetails()}
      </tbody>
      </table>
        <br/>
        <br/>
        <br/>
	  </main>
	  </div>
  );
}
}


export default TourTable;