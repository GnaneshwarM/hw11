import React from "react";
import ReactDOM from "react-dom";
import places from "../images/image.png";
import tour from "../images/image2.png";
//import { Helmet } from "react-helmet";

let placesimage = <img src={places} alt="Tour" width = "300" height="200" className="image_tour" />;
let tourimage = <img src={tour} alt="Tourt" width = "300" height="200"/>;

function Home() {
        return  <div className="main">
        <main className="tour"><h1>International tours  </h1>
        {placesimage}<p>This is the best tour company you can find on the whole wide world we offer you the first tour with your family foronly fifty percent  off </p><p>{tourimage}</p>
        
        </main></div>
            
            
            
}

    
export default Home;
