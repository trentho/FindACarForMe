import React, { useState, useEffect } from 'react';
// import FuelData from '../APIExamples/FuelExample.json';
import NavBar from '../Components/NavBar';
import { useParams } from "react-router-dom"
import Image from "react-bootstrap/Image";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Model3Card from '../Components/Model3Card';
import Model2Card from '../Components/Model2Card';

export default function Model2Instance() {
    const { id } = useParams();
    console.log("on model 1 instance page", id);

    // var jsonObject;
    // FuelData.charge_stations.map((chargeData, index)=>{
    //     if (chargeData.geometry.location.lat == lat &&
    //         chargeData.geometry.location.lng == lng){
    //         jsonObject = chargeData;
    //     }
    // })
    // FuelData.gas_stations.map((gasData, index)=>{
    //     if (gasData.geometry.location.lat == lat &&
    //         gasData.geometry.location.lng == lng){
    //         jsonObject = gasData;
    //     }
    // })

    const url = 'https://api.findacarfor.me/fuel_stations/' + id

    const [posts, setPosts] = useState({"listings": "[mock data 0,mock data 1]", "specs": "[mock data 0,mock data 1]"});
    const [photosData, setPhotosData] = useState({'html_attributions': ''});
    const search = '\'';
    const replaceWith = '"';

    useEffect(() => {
        fetch(url, {method: "GET", mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                console.log("Data", data);
                setPosts(data);
                setPhotosData(JSON.parse(data.photos.replaceAll(search, replaceWith)));
                console.log("photosData in useEffect", JSON.parse(data.photos.replaceAll(search, replaceWith)))
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [url]);

    console.log("posts", posts);
    console.log("photosData: ", photosData);

    return (
        <div>
            <NavBar />
            <Card style={{width: '100vw'}} className="col-md-5 mx-auto">
                <h1 id="CarName">{posts.name}</h1>
                <h5 id="CarTrim">{posts.business_status}</h5>
                <Image src={photosData.html_attributions} />
                <Container>
                    <Row>
                        <Col>
                            <Image src={posts.icon} />
                        </Col>

                        <Col class="col justify-content-center">
                            <Stack style={{margin: "25%"}}>
                                <h6>Currently {posts.open_now?"Open":"Closed"}</h6>
                            </Stack>
                        </Col>

                        <Col>
                        <Stack style={{margin: "25%"}}>
                                <h6>Rating: {posts.rating} </h6>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Card>
            {/* <Image src={jsonObject.photos[0].image} /> */}
            <p>Address: {posts.address} </p>
            <h1> Cars for sale </h1>
            <div className="cards">
                {Array.from(posts["listings"]).map((post, index) => {
                    return <Model3Card key={index} information={post} genericInformation={posts} wordArr={[]}/>
                })}
            </div>
            <h1> Related Car Safety</h1>
            <div className="cards">
                {Array.from(posts["specs"]).map((post, index) => {
                    return <Model2Card key={index} information={post} wordArr={[]}/>
                })}
            </div>
        </div>

    )
}