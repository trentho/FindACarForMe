import React, { useState, useEffect } from 'react';
// import CISData from '../APIExamples/CISExample';
import NavBar from '../Components/NavBar';
import { useParams } from "react-router-dom"
import Image from "react-bootstrap/Image";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Model1Card from '../Components/Model1Card';
import Model2Card from '../Components/Model2Card';

export default function Model3Instance() {
    const { id } = useParams();
    // var jsonGenericObject;
    // var jsonObject;
    // CISData.map((carData, index)=>{
    //     // jsonGenericObject = carData;
    //     carData.data.listings.map((listingData, index2)=>{
    //         if (listingData.id == id){
    //             jsonObject = listingData;
    //         }
    //     })
    // })

    const url = 'https://api.findacarfor.me/listings/' + id

    const [posts, setPosts] = useState({"fuel_stations": "[mock data 0,mock data 1]", "listings": "[mock data 0,mock data 1]", "vin_decode": "{mock 1: data, mock 2: data}", "specs" : "[VehiclePictuire: 1]" });
    // const [vinDecodeText, setVinDecodeText] = useState("{'ABS': '', 'ActiveSafetySysNote': ''}");
    const [vinDecode, setVinDecode] = useState({'ABS': '', 'ActiveSafetySysNote': '', 'AdaptiveCruiseControl': '', 'AdaptiveDrivingBeam': '', 'AdaptiveHeadlights': '', 'AirBagLocCurtain': '1st & 2nd Rows', 'AirBagLocFront': '1st Row (Driver & Passenger)', 'AirBagLocKnee': '', 'AirBagLocSeatCushion': '', 'AirBagLocSide': '1st Row (Driver & Passenger)', 'AutoReverseSystem': '', 'AutomaticPedestrianAlertingSound': '', 'AxleConfiguration': '', 'Axles': '', 'BasePrice': '', 'BatteryA': '', 'BatteryA_to': '', 'BatteryCells': '', 'BatteryInfo': '', 'BatteryKWh': '', 'BatteryKWh_to': '', 'BatteryModules': '', 'BatteryPacks': '', 'BatteryType': '', 'BatteryV': '', 'BatteryV_to': '', 'BedLengthIN': '', 'BedType': 'Not Applicable', 'BlindSpotIntervention': '', 'BlindSpotMon': '', 'BodyCabType': 'Not Applicable', 'BodyClass': 'Sedan/Saloon', 'BrakeSystemDesc': '', 'BrakeSystemType': '', 'BusFloorConfigType': 'Not Applicable', 'BusLength': '', 'BusType': 'Not Applicable', 'CAN_AACN': '', 'CIB': '', 'CashForClunkers': '', 'ChargerLevel': '', 'ChargerPowerKW': '', 'CoolingType': 'Water', 'CurbWeightLB': '', 'CustomMotorcycleType': 'Not Applicable', 'DaytimeRunningLight': '', 'DestinationMarket': '', 'DisplacementCC': '2400.0', 'DisplacementCI': '146.45698582735', 'DisplacementL': '2.4', 'Doors': '4', 'DriveType': '4x2', 'DriverAssist': '', 'DynamicBrakeSupport': '', 'EDR': '', 'ESC': '', 'EVDriveUnit': '', 'ElectrificationLevel': '', 'EngineConfiguration': 'In-Line', 'EngineCycles': '4', 'EngineCylinders': '4', 'EngineHP': '201', 'EngineHP_to': '', 'EngineKW': '149.8857', 'EngineManufacturer': 'Honda', 'EngineModel': 'K24V7', 'EntertainmentSystem': '', 'ForwardCollisionWarning': '', 'FuelInjectionType': '', 'FuelTypePrimary': 'Gasoline', 'FuelTypeSecondary': '', 'GCWR': '', 'GCWR_to': '', 'GVWR': 'Class 1C: 4,001 - 5,000 lb (1,814 - 2,268 kg)', 'GVWR_to': '', 'KeylessIgnition': '', 'LaneCenteringAssistance': '', 'LaneDepartureWarning': '', 'LaneKeepSystem': '', 'LowerBeamHeadlampLightSource': '', 'Make': 'ACURA', 'MakeID': '475', 'Manufacturer': 'HONDA DEVELOPMENT & MANUFACTURING OF AMERICA, LLC', 'ManufacturerId': '988', 'Model': 'ILX', 'ModelID': '2150', 'ModelYear': '2022', 'MotorcycleChassisType': 'Not Applicable', 'MotorcycleSuspensionType': 'Not Applicable', 'NCSABodyType': '', 'NCSAMake': '', 'NCSAMapExcApprovedBy': '', 'NCSAMapExcApprovedOn': '', 'NCSAMappingException': '', 'NCSAModel': '', 'NCSANote': '', 'Note': '', 'OtherBusInfo': '', 'OtherEngineInfo': 'Direct Fuel Injection', 'OtherMotorcycleInfo': '', 'OtherRestraintSystemInfo': 'Front: Seat Belt / Rear: Seat Belt and Side Curtain Air Bag (Outer positions) / Seat Belt (Center position)', 'OtherTrailerInfo': '', 'ParkAssist': '', 'PedestrianAutomaticEmergencyBraking': '', 'PlantCity': 'MARYSVILLE', 'PlantCompanyName': '', 'PlantCountry': 'UNITED STATES (USA)', 'PlantState': 'OHIO', 'PossibleValues': '', 'Pretensioner': '', 'RearAutomaticEmergencyBraking': '', 'RearCrossTrafficAlert': '', 'RearVisibilitySystem': '', 'SAEAutomationLevel': '', 'SAEAutomationLevel_to': '', 'SeatBeltsAll': 'Manual', 'SeatRows': '', 'Seats': '', 'SemiautomaticHeadlampBeamSwitching': '', 'Series': '', 'Series2': '', 'SteeringLocation': '', 'SuggestedVIN': '', 'TPMS': 'Direct', 'TopSpeedMPH': '', 'TrackWidth': '', 'TractionControl': '', 'TrailerBodyType': 'Not Applicable', 'TrailerLength': '', 'TrailerType': 'Not Applicable', 'TransmissionSpeeds': '8', 'TransmissionStyle': 'Dual-clutch Transmission (DCT)', 'Trim': 'Premium and A-Spec Package / Technology and A-Spec Package', 'Trim2': '', 'Turbo': '', 'VIN': '19UDE2F87NA008837', 'ValveTrainDesign': 'Dual Overhead Cam (DOHC)', 'VehicleType': 'PASSENGER CAR', 'WheelBaseLong': '', 'WheelBaseShort': '', 'WheelBaseType': '', 'WheelSizeFront': '', 'WheelSizeRear': '', 'Wheels': '', 'Windows': ''});

    const search = '\'';
    const replaceWith = '"';

    useEffect(() => {
        fetch(url, {method: "GET", mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                // console.log("text", data.vin_decode);
                setPosts(data);
                // setVinDecodeText(data.vin_decode);
                // // setVinDecode(JSON.parse(data.vin_decode));
                // obj = JSON.parse(data.vin_decode);
                // console.log("in useEffect: ", obj);
                setVinDecode(JSON.parse(data.vin_decode.replaceAll(search, replaceWith)));
                // console.log("data.vin_decode: ", data.vin_decode);
            })
            .catch((err) => {
                // console.log(err.message);
            });
            // obj = JSON.parse(posts.vin_decode)
        }, [url]);

        
    console.log("spec post", posts);
    console.log("vinDecode", vinDecode);
    // console.log("vinDecodeTest typeof:", typeof vinDecodeText);
    // console.log("NOT Changed vinDecodeText:", vinDecodeText);
    // console.log("Changed vinDecodeText:", JSON.parse(vinDecodeText.replaceAll(search, replaceWith)));
    // console.log("vindDeconde.VIN", vinDecode.VIN)
    // console.log("vinDecodeText parse:", JSON.parse(vinDecodeText));
    // console.log("vinDecode :", vinDecode);
    // console.log("var obj: ", obj);
    // console.log("type of vinDecode", typeof JSON.parse(vinDecode));
    // console.log("vinDecode.ABS: ", vinDecode.ABS);

    return (
        <div>
            <NavBar />
            <Card style={{width: '100vw'}} className="col-md-5 mx-auto">
                <h1 id="CarName">{posts.year} {posts.brand_name} {posts.model_name}</h1>
                <h5 id="CarTrim">{vinDecode.Trim}</h5>
                <Container>
                    <Row>

                        <Col class="col justify-content-center">
                            <Stack style={{margin: "25%"}}>
                                <h2>${posts.ask_price}</h2>
                                <h6>Ask Price</h6>
                            </Stack>
                        </Col>

                        <Col>
                        <Stack style={{margin: "25%"}}>
                                <h2>{posts.is_new?"New":"Used"}</h2>
                                <h6>Condition</h6>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack style={{margin: "25%"}}>
                                <h2>{posts.mileage} miles</h2>
                                <h6>mileage</h6>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack style={{margin: "25%"}}>
                                <h2>{posts.color}</h2>
                                <h6>Exterior Color</h6>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Card>
            <div >
                <Container>
                    <Row>
                        <Col>
                            <Card style={{width: '30vw', margin: "20px"}} className="col-md-5 mx-auto">
                                <Stack style={{margin: "15%", padding: '0%'}}>
                                    <div>
                                        <h8>Airbag Curtain</h8>
                                        <h3>{vinDecode.AirBagLocCurtain}</h3>
                                        <h8>Front Airbag Location</h8>
                                        <h3>{vinDecode.AirBagLocFront}</h3>
                                        <h8>Side Airbag Location</h8>
                                        <h3>{vinDecode.AirBagLocSide}</h3>
                                    </div>
                                </Stack>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{width: '30vw', margin: "20px"}} className="col-md-5 mx-auto">
                                <Stack style={{margin: "15%", padding: '0%'}}>
                                    <div>
                                        <h8>Doors</h8>
                                        <h3>{vinDecode.Doors}</h3>
                                        <h8>Body style</h8>
                                        <h3>{vinDecode.BodyClass}</h3>
                                        <h8>Vehicle Type</h8>
                                        <h3>{vinDecode.VehicleType}</h3>
                                    </div>
                                </Stack>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{width: '30vw', margin: "20px"}} className="col-md-5 mx-auto">
                                <Stack style={{margin: "15%", padding: '0%'}}>
                                    <div>
                                        <h8>Engine Horsepower</h8>
                                        <h3>{vinDecode.EngineHP}</h3>
                                        <h8>Engine model</h8>
                                        <h3>{vinDecode.EngineModel}</h3>
                                        <h8>Fuel Type</h8>
                                        <h3>{vinDecode.FuelTypePrimary}</h3>
                                    </div>
                                </Stack>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Card style={{width: '100vw'}} className="col-md-5 mx-auto">
                <h1 id="CarName">Safety Features</h1>
                <Container>
                    <Row>
                        <Col>
                            <Image style={{width: '25vw'}} src={posts.specs.VehiclePicture} />
                        </Col>

                        <Col class="col justify-content-center">
                            <Stack style={{margin: "15%"}}>
                                <h2>{vinDecode.DriveType}</h2>
                                <h6>Drive Type</h6>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack style={{margin: "15%"}}>
                                <h2>{vinDecode.CoolingType}</h2>
                                <h6>Cooling Type</h6>
                            </Stack>
                        </Col>

                        <Col>
                            <Stack style={{margin: "15%"}}>
                                <h6>{vinDecode.Manufacturer}</h6>
                                <h6>Manufacturer</h6>
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </Card>
            <h2>Safety Specifications for this Car</h2>
            <div className="cards">
                <Model2Card key={1} information={posts.specs} wordArr={[]}/>
            </div>
            <h2>Gas Stations near you</h2>
            <div className="cards">
                {Array.from(posts["fuel_stations"]).map((post, index) => {
                    return <Model1Card key={index} information={post} wordArr={[]}/>
                })}
            </div>
        </div>

    )
}