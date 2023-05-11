import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import { useParams } from "react-router-dom"
import Image from "react-bootstrap/Image";
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import './Model2Instance.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Model1Card from '../Components/Model1Card';
// import PlacesData from '../APIExamples/FuelExample.json';
import Model3Card from '../Components/Model3Card';


export default function Model2Instance() {
    const { id } = useParams();
    // var jsonObject;
    // NHTSAData.map((vehicleData, index)=>{
    //     if (vehicleData.id == id){
    //         jsonObject = vehicleData;
    //     }
    // })
    const url = 'https://api.findacarfor.me/specs/' + id

    const [posts, setPosts] = useState({"fuel_stations": "[mock data 0,mock data 1]", "listings": "[mock data 0,mock data 1]" });

    useEffect(() => {
        fetch(url, {method: "GET", mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [url]);

        
    console.log("spec post", posts)

    return (
        <div>
            <NavBar />
            <Card style={{width: '100vw'}} className="col-md-5 mx-auto">
            <h1 id="CarName">{posts.ModelYear} {posts.Make} {posts.Model}</h1>
                <h5 id="CarTrim">{posts.VehicleDescription}</h5>
                <Container>
                    <Row>
                        <Col>
                            <Image style={{width: '25vw'}} src={posts.VehiclePicture} />
                        </Col>

                        <Col class="col justify-content-center">
                            <Stack style={{margin: "25%"}}>
                                <h2>{posts.OverallRating}</h2>
                                <h6>Overall Safety Rating</h6>
                            </Stack>
                        </Col>

                        <Col>
                        <Stack style={{margin: "25%"}}>
                                <h2>{posts.RecallsCount}</h2>
                                <h6>Recalls</h6>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack style={{margin: "25%"}}>
                                <h2>{posts.ComplaintsCount}</h2>
                                <h6>Complaints</h6>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Card>
            <div >
                <Card style={{width: '95vw', margin: "50px"}} className="col-md-5 mx-auto">
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <Container>
                                <Row>
                                    <Col>
                                        <Image style={{width: '50vw'}} src={posts.FrontCrashPicture!=null?posts.FrontCrashPicture:posts.VehiclePicture} />
                                        {/* <img
                                        className="d-block w-10"
                                        src={jsonObject.photo}
                                        alt="First slide"
                                        /> */}
                                    </Col>
                                    <Col>
                                        <Stack style={{margin: "15%", padding: '0%'}}>
                                            <div>
                                                <h6>Overall Front Crash Rating</h6>
                                                <h3>{posts.OverallFrontCrashRating}</h3>
                                                <h6>Front Crash Driver Side Rating.</h6>
                                                <h3>{posts.FrontCrashDriversideRating}</h3>
                                                <h6>Front Crash Passenger Side Rating</h6>
                                                <h3>{posts.FrontCrashPassengersideRating}</h3>
                                            </div>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                <Row>
                                    <Col>
                                        <Image style={{width: '50vw'}} src={posts.SideCrashPicture!=null?posts.SideCrashPicture:posts.VehiclePicture} />
                                    </Col>
                                    <Col>
                                        <Stack style={{margin: "15%", padding: '0%'}}>
                                            <div>
                                                <h6>Overall Side Crash Rating</h6>
                                                <h3>{posts.OverallSideCrashRating}</h3>
                                                <h6>Side Crash Driver Side Rating.</h6>
                                                <h3>{posts.SideCrashDriversideRating}</h3>
                                                <h6>Side Crash Passenger Side Rating</h6>
                                                <h3>{posts.SideCrashPassengersideRating}</h3>
                                            </div>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                <Row>
                                    <Col>
                                        <Image style={{width: '50vw'}} src={posts.SidePolePicture!=null?posts.SidePolePicture:posts.VehiclePicture} />
                                    </Col>
                                    <Col>
                                        <Stack style={{margin: "10%", padding: '0%'}}>
                                            <div>
                                                <h6>Overall Side Barrier Rating</h6>
                                                <h3>{posts.sideBarrierRating}</h3>
                                                <h6>Combined Side Barrier and Pole Rating Front</h6>
                                                <h3>{posts.combinedSideBarrierAndPoleRatingFront}</h3>
                                                <h6>Combined Side Barrier and Pole Rating Rear</h6>
                                                <h3>{posts.combinedSideBarrierAndPoleRatingRear}</h3>
                                                <h6>Side Pole Crash Rating</h6>
                                                <h3>{posts.SidePoleCrashRating}</h3>
                                            </div>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Container>
                        </Carousel.Item>
                    </Carousel>
                </Card>
            </div>
            <Card style={{width: '100vw'}} className="col-md-5 mx-auto">
                <h1 id="CarName">Safety Features</h1>
                <Container>
                    <Row>
                        <Col>
                            <Image style={{width: '25vw'}} src={posts.VehiclePicture} />
                        </Col>

                        <Col class="col justify-content-center">
                            <Stack style={{margin: "15%"}}>
                                <h2>{posts.NHTSAElectronicStabilityControl=="Standard"?"Standard":"No"}</h2>
                                <h6>Electronic Stability Control</h6>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack style={{margin: "15%"}}>
                                <h2>{posts.NHTSAForwardCollisionWarning=="Standard"?"Standard":"No"}</h2>
                                <h6>Forward Collision Warning</h6>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack style={{margin: "15%"}}>
                                <h2>{posts.NHTSALandeDepartureWarning=="Standard"?"Standard":"No"}</h2>
                                <h6>Lane Departure Warning</h6>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Card>
            {/* <Card style={{width: '90vw', margin: "50px"}} className="col-md-5 mx-auto">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <Container>
                            <Row>
                                <Col>
                                    <Stack style={{margin: "15%", padding: '0%'}}>
                                        <div>
                                            <h3>{complaints}</h3>
                                        </div>
                                    </Stack>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container>
                            <Row>
                                <Col>
                                    <Stack style={{margin: "15%", padding: '0%'}}>
                                        <div>
                                            <h3>Complaint 2</h3>
                                        </div>
                                    </Stack>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Container>
                            <Row>
                                <Col>
                                    <Stack style={{margin: "15%", padding: '0%'}}>
                                        <div>
                                            <h3>Complaint 3</h3>
                                        </div>
                                    </Stack>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                </Carousel>
            </Card> */}
            <h1> Gas Stations near you</h1>
            <div className="cards">
                {/* {PlacesData.gas_stations.map((placeData, index)=>{
                    return <Model1Card key={index} information={placeData} />
                })}
                {PlacesData.charge_stations.map((placeData, index)=>{
                    return <Model1Card key={index} information={placeData} />
                })} */}
                {Array.from(posts["fuel_stations"]).map((post, index) => {
                    return <Model1Card key={index} information={post} wordArr={[]}/>
                })}
            </div>
            <h1> Cars for sale </h1>
            <div className="cards">
                {Array.from(posts["listings"]).map((post, index) => {
                    return <Model3Card key={index} information={post} genericInformation={posts} wordArr={[]}/>
                })}
            </div>
        </div>

    )
}