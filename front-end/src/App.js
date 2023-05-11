import React, { useState, useEffect } from 'react';
import Splash from './Pages/Splash';
import Model1 from './Pages/Model1';
import Model2 from './Pages/Model2';
import Model3 from './Pages/Model3';
import SearchPage from './Pages/SearchPage';
import Model1Instance from './Pages/Model1Instance';
import Model2Instance from './Pages/Model2Instance';
import Model3Instance from './Pages/Model3Instance';
import About from './Pages/About/About';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import './App.css';
import NHTSAData from './APIExamples/NHTSAExample';
import FuelData from './APIExamples/FuelExample';
import CISData from './APIExamples/CISExample';

function App() {
  const [fuelStationData, setFuelStationData] = useState({"results": "[mock data 0,mock data 1]"});

    useEffect(() => {
        fetch('https://api.findacarfor.me/fuel_stations', {method: "GET", mode: 'cors'})
            .then(async (response) => await response.json())
            .then((data) => {
                // console.log(data);
                setFuelStationData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/fuel_stations" element={<Model1 />} />
          <Route path="/specs" element={<Model2 />} />
          <Route path="/listings" element={<Model3 />} />
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/egmvisualizations" element={<EGMVisualizations/>}/>
          
          {FuelData.charge_stations.map((chargeData, index)=>{
            <Link to={'/fuel_stations/' + fuelStationData.id} />
          })}
          {FuelData.gas_stations.map((vehicleData, index)=>{
            <Link to={'/fuel_stations/' + vehicleData.id} />
          })}
          <Route path="/fuel_stations/:id" element={<Model1Instance information={FuelData} />} />

          {NHTSAData.map((vehicleData, index)=>{
            <Link to={'/specs/' + vehicleData.id} />
          })}
          <Route path="/specs/:id" element={<Model2Instance />} />

          {CISData.map((carData, index)=>{
            carData.data.listings.map((listingData, index2)=>{
              <Link to={'/listings/' + listingData.id} />
            })
          })}
          <Route path="/listings/:id" element={<Model3Instance />} />

          <Route path="/About" element={<About />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
