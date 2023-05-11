import NavBar from '../Components/NavBar';
import "./ExploreAndGiveMoreVisualizations.css"
import React, { useEffect, useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EGMVisual2 from '../Components/EGMVisual2';
import EGMVisual3 from '../Components/EGMVisual3';

export default function EGMVisualizations() {
    const [cityData, setCityData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const baseUrlFirst = 'https://api.exploreandgivemore.me/cities?page=';
    const baseUrlSecond = '&per_page=15&sort_field=state&asc=true&min_population=10000&max_population=300000';

    const prevButton = () => {
        if (pageNumber != 1) {
            setPageNumber(pageNumber-1)
        }
    }
    const nextButton = () => {
        setPageNumber(pageNumber+1)
    }

    useEffect(() => {
        fetch(baseUrlFirst + pageNumber + baseUrlSecond,
            {
                method: 'GET',
                mode: 'cors'
            }
            )
            .then(async (response) => await response.json())
            .then((dataReceived) => {
                console.log(dataReceived.data.cities)
                setCityData(dataReceived.data.cities);
            })
            .catch((err) => {
                console.log(err.message);
            });
        } , [pageNumber]);

    return (
        <div>
            <NavBar />
            <h1>Cities</h1>
            <Container>
                <Row>
                    <Col>
                        <div className='graph-container-wrapper'>
                            <ResponsiveContainer width="100%" height="100%" className="graph-container">
                                <BarChart width={730} height={500} margin={{top: 20, right: 40, bottom: 20, left: 40 }} data={cityData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number"/>
                                    <YAxis dataKey="name" type="category" scale="band"/>
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="budget" fill="#FB5607" />
                                    <Bar dataKey="average_rating" fill="#FF006E" />
                                    <Bar dataKey="safety" fill="#8338EC" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className='page-button-wrapper'>
                        <Button className='page-button' onClick={prevButton}>
                            Previous
                        </Button>
                        Current Page: {pageNumber}
                        <Button className='page-button' onClick={nextButton}>
                            Next
                        </Button>
                    </div>
                </Row>
            </Container>

            <div style={{marginTop: '60px', margin: "auto"}}>
                <h2>Number of Charities per State</h2>
                <EGMVisual2 />
            </div>
            <div style={{marginTop: '60px', margin: "auto"}}>
                <h2>Population and Elevation in Cities</h2>
                <EGMVisual3 />
            </div>

        </div>
    )

}

