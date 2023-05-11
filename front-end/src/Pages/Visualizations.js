import React, { useState, useEffect } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import "./Visualizations.css"
import {ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
        ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, BarChart, Bar} from 'recharts'

import NavBar from '../Components/NavBar.js'

const Visualizations = () => {

    const makeFormat = [
        ["ACURA", "AUDI"],
        ["BMW", "BUICK"],
        ["CADILLAC", "CHEVROLET"],
        ["CHRYSLER", "DODGE"],
        ["FORD", "GENESIS"],
        ["GMC", "HONDA"],
        ["HYUNDAI", "INFINITI"],
        ["JEEP", "KIA"],
        ["LEXUS", "LINCOLN"],
        ["MAZDA", "MERCEDES-BENZ"],
        ["MINI", "MITSUBISHI"],
        ["NISSAN", "RAM"],
        ["SUBARU", "TESLA"],
        ["TOYOTA", "VOLKSWAGEN"],
        ["VOLVO"]
    ];

    const [fuel_stations_graph, set_fuel_stations_graph] = useState([]);
    const fuel_stations_url = "https://api.findacarfor.me/fuel_stations?page=1&count=10000";
    useEffect(() => {
        fetch(fuel_stations_url, {method: "GET", mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                let fuel_stations = {};
                data["results"].forEach(entry => {
                    if (!(entry["name"] in fuel_stations)) {
                        fuel_stations[entry["name"]] = {};
                        fuel_stations[entry["name"]]["total_rating"] = 0;
                        fuel_stations[entry["name"]]["count"] = 0;
                    }
                    if (!isNaN(entry["rating"])) {
                        fuel_stations[entry["name"]]["total_rating"] += entry["rating"];
                        fuel_stations[entry["name"]]["count"] += 1;
                    }
                });
                    
                let graph = [];
                Object.keys(fuel_stations).forEach(name => {
                    graph.push(
                        {
                            "name": name,
                            "average_rating": fuel_stations[name]["total_rating"] / fuel_stations[name]["count"]
                        }
                    );
                });

                graph.sort((a, b) => a.average_rating - b.average_rating);

                console.log(graph);
                set_fuel_stations_graph(graph);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [fuel_stations_url]);
    
    const [listings_graph, set_listings_graph] = useState([]);
    const listings_url = "https://api.findacarfor.me/listings?page=1&count=10000";
    useEffect(() => {
        fetch(listings_url, {method: "GET", mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                let graph = [];

                data["results"].forEach(entry => {
                    let percent = Math.floor(entry["ask_price"] / entry["msrp"] * 1000) / 10;

                    if (percent == 0 || percent == 100 || entry["mileage"] == 0 || isNaN(percent)) return;

                    graph.push(
                        {
                            "percent_of_msrp": percent,
                            "miles": entry["mileage"]
                        }
                    );
                });
                
                console.log(graph);
                set_listings_graph(graph);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [listings_url]);
    
    const [specs_graph, set_specs_graph] = useState([{'category':'FrontCrashDriversideRating'}, {'category':'FrontCrashPassengersideRating'}, {'category':'OverallRating'}, {'category':'OverallSideCrashRating'}, {'category':'SidePoleCrashRating'}]);
    const specs_url = "https://api.findacarfor.me/specs?page=1&count=1000";
    useEffect(() => {
        fetch(specs_url, {method: "GET", mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                const safetyCategories = ['FrontCrashDriversideRating', 'FrontCrashPassengersideRating', 'OverallRating', 'OverallSideCrashRating', 'SidePoleCrashRating'];
                let makes = {};

                data["results"].forEach(element => {
                    let containsAllCategories = safetyCategories.every(attribute => {
                        if (isNaN(element[attribute])) {
                            return false;
                        }
                        return true;
                    });

                    if (containsAllCategories) {
                        if (!(element["Make"] in makes)) {
                            makes[element["Make"]] = {count: 0};
                            safetyCategories.forEach(category => {
                                makes[element["Make"]][category] = 0;
                            });
                        }
                        makes[element["Make"]]["count"] += 1;
                        safetyCategories.forEach(category => {
                            makes[element["Make"]][category] += parseInt(element[category]);
                        });
                    }
                })

                Object.keys(makes).forEach(make => {
                    safetyCategories.forEach(category => {
                        makes[make][category] /= makes[make].count;
                    });
                });

                let graph = [];
                safetyCategories.forEach(category => {
                    let datum = {category: category, fullMark: 5};
                    Object.keys(makes).forEach(make => {
                        datum[make] = makes[make][category];
                    });
                    graph.push(datum);
                });

                console.log(graph);
                set_specs_graph(graph);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [specs_url]);

    return (

        <div data-testid="visPage" className="visualizations">
            <NavBar/>
            
            <Container>
                <Row>
                    <h1>Fuel Station Visualizations</h1>
                    <h4>Average ratings of different fuel stations</h4>
                </Row>
                <Row>
                    <div className='graph3-container-wrapper'>
                        <div className='graph3-container'>
                            <ResponsiveContainer width="95%" height="100%">
                                <BarChart data={fuel_stations_graph}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" label={false}/>
                                    <YAxis domain={[0, 5]}/>
                                    <Tooltip />
                                    <Bar dataKey="average_rating" fill="#884868" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Row>
            </Container>

            <Container>
                <Row>
                    <h1>Listing Visualizations</h1>
                    <h4>Car's markdown price based on mileage</h4>
                </Row>
                <Row>
                    <div className='graph2-container-wrapper'>
                        <div className='graph2-container'>
                            <ResponsiveContainer width="95%" height="100%">
                                <ScatterChart>
                                    <CartesianGrid />
                                    <YAxis type="number" dataKey="percent_of_msrp" name="percent of msrp" unit="%" domain={[100, 100]}/>
                                    <XAxis type="number" dataKey="miles" name="mileage" unit="mi" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="A school" data={listings_graph} fill="#8884d8" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Row>
            </Container>

            <Container>
                <Row>
                    <h1>Safety and Specification Visualizations</h1>
                    <h4>Safety categories for each car manufacturer</h4>
                </Row>
                {Array.from(makeFormat).map(makes => {
                    return (
                        <Row>
                            {Array.from(makes).map(make => {
                                let color = "#"+Math.floor(Math.random()*128+128).toString(16)+Math.floor(Math.random()*128+128).toString(16)+Math.floor(Math.random()*128+128).toString(16);
                                return (
                                    <Col>
                                        <div className='graph1-container-wrapper'>
                                            <div className='graph1-container'>
                                                <ResponsiveContainer width="95%" height="95%">
                                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={specs_graph}>
                                                        <Radar name={make} dataKey={make} stroke={color} fill={color} fillOpacity={0.4} />;
                                                        <PolarGrid/>
                                                        <PolarAngleAxis dataKey="category" stroke='white'/>
                                                        <PolarRadiusAxis angle={90} domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} fontSize="10" stroke='darkgrey'/>
                                                        <Legend />
                                                    </RadarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    );
                })}
            </Container>

        </div>
    )
}

export default Visualizations

