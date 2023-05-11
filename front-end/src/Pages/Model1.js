import NavBar from '../Components/NavBar';
import React, { useState, useEffect, useRef} from 'react';
import Model1Card from '../Components/Model1Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Model1() {
    // const [posts, setPosts] = useState({"results": "[mock data 0,mock data 1]"});
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const baseUrl = 'https://api.findacarfor.me/fuel_stations?page=';
    const [sortName, setSortName] = useState('id');
    let filteredDataFromSearch = filteredData;
    const inputRef = useRef(null);
    const [nameFilter, setNameFilter] = useState('Name');
    const [open_nowFilter, setOpen_NowFilter] = useState('Open/Closed');
    const [gas_stationFilter, setGas_Station] = useState('Is it a Gas Station?');
    const [charging_stationFilter, setCharging_Station] = useState('Is it a Charging Station?');
    const [is_operationalFilter, setIs_Operational] = useState('Is it Operational?');
    const [pageNumber, setPageNumber] = useState(1);

    const [searchInputString, setSearchInputString] = useState('');
    const [stationLastPage, setStationLastPage] = useState(false);

    const [searchArr, setSearchArr] = useState([]);
    // var queryRE = new RegExp(/(?:shell)/i)
    var queryRE = null;
    var searchArray = null;


    const onChangeClick = (value) => {
        console.log("-------------onChangeClick-------------")
        setSortName(value)
        // console.log("sortName: ", sortName)
    };

    const prevButton = () => {
        if (pageNumber != 1) {
            setPageNumber(pageNumber-1)
        }
    }
    const nextButton = () => {
        if(!stationLastPage){
            setPageNumber(pageNumber+1)
        }
    } 

    useEffect(() => {
        fetch(baseUrl + pageNumber + '&count=10&sort=' + sortName
                + (nameFilter != 'Name'?'&name='+nameFilter: '') 
                + (open_nowFilter != 'Open/Closed'?'&open_now='+open_nowFilter: '')
                + (gas_stationFilter != 'Is it a Gas Station?'?'&gas_station='+gas_stationFilter: '')
                + (charging_stationFilter != 'Is it a Charging Station?'?'&charging_station='+charging_stationFilter: '')
                + (is_operationalFilter != 'Is it Operational?'?'&is_operational='+is_operationalFilter: '')
                + (searchInputString != ''?'&search='+ searchInputString: ''), {method: "GET", mode: 'cors'})
            .then(async (response) => await response.json())
            .then((data) => {
                console.log("searchInputString: ", searchInputString)
                console.log(data);
                // setPosts(data);
                setAllData(data.results);
                setFilteredData(data.results);
                setStationLastPage(data.last_page);
                console.log("page number", pageNumber)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [sortName, nameFilter, open_nowFilter, gas_stationFilter, charging_stationFilter, is_operationalFilter, pageNumber, searchInputString]);


    console.log(baseUrl + sortName
        + (nameFilter != 'Name'?'&name='+nameFilter: '') 
        + (open_nowFilter != 'Open/Closed'?'&open_now='+open_nowFilter: '')
        + (gas_stationFilter != 'Is it a Gas Station?'?'&gas_station='+gas_stationFilter: '')
        + (charging_stationFilter != 'Is it a Charging Station?'?'&charging_station='+charging_stationFilter: '')
        + (is_operationalFilter != 'Is it Operational?'?'&is_operational='+is_operationalFilter: ''))

    function handleClick() {
        console.log("click")
        console.log(inputRef.current.value)
        // setSearchInput(inputRef.current.value)
        const inputForSearch = inputRef.current.value
        setSearchInputString(inputForSearch)
        console.log("filteredDataFromSearch before", filteredDataFromSearch)
        console.log("queryReBefore: ", queryRE)
        console.log("searchArray: ", searchArray)
        console.log("searchInputString: ", searchInputString)
        // if (searchInput !== '') {
        if (inputForSearch !== '') {
            queryRE = new RegExp(`(?:${inputForSearch.replaceAll(" ", "|")})`, "i")
            
            console.log("queryReAfter: ", queryRE)
            filteredDataFromSearch = allData.filter((item) => {
                // return Object.values(item).join('').toLowerCase().includes(inputForSearch.toLowerCase())
                // const test2 = conditions.some(el => str2.includes(el));

                searchArray = inputForSearch.toLowerCase().split(' ')
                setSearchArr(searchArray)
                var flag = false;
                for(let i=0; i<searchArray.length; i++) {
                    if(Object.values(item).join('').toLowerCase().includes(searchArray[i])) {
                        flag = true;
                    }
                }
                if(flag) {
                    console.log("yes");
                }
                return flag;

                // console.log("item", item)
                // console.log("IDK", Object.values(item).join('').toLowerCase().includes(inputForSearch.toLowerCase()))

                // return Object.values(item).join('').toLowerCase().includes(inputForSearch.toLowerCase())
            })
            // console.log("filteredData before", filteredData)
            setFilteredData(filteredDataFromSearch)
            // console.log("filteredDataFromSearch", filteredDataFromSearch)
            // console.log("filteredData after:", filteredData)
        }
        else{
            setFilteredData(allData)
        }
        // console.log("filteredData: ", typeof(filteredData), filteredData)
        console.log("searchArray After: ", searchArray)
    }

    return (
        <div>
            <NavBar />
            <Row>
                <Col>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search here"
                        id="message"
                        name="message"
                        autoComplete="off"
                        onChange={handleClick}
                        // value={searchInput}
                        // onChange={onChangeClick}
                        // // onChange={(e) => searchItems(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleClick}>Search</Button>
                </Col>
                <h6>Press search twice to delete non-relevant results</h6>
                <Row>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {nameFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setNameFilter('Name')}>None</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Chevron')}>Chevron</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Shell')}>Shell</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Gulf')}>Gulf</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('7-11')}>7-11</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Exxon')}>Exxon</Dropdown.Item>
                                {/* <Dropdown.Item onClick={()=>setNameFilter("Dev's Shell")}>Dev's Shell</Dropdown.Item> */}
                                <Dropdown.Item onClick={()=>setNameFilter('CitGo Gas Station')}>CitGo Gas Station</Dropdown.Item>
                                {/* <Dropdown.Item onClick={()=>setNameFilter('Hyw 969 Foodmart & Gas Station')}>Hyw 969 Foodmart & Gas Station</Dropdown.Item> */}
                                <Dropdown.Item onClick={()=>setNameFilter('Signature Austin Valero')}>Signature Austin Valero</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Valero')}>Valero</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('76')}>76</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Grubbys Valero')}>Grubbys Valero</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('The Cornerstore')}>The Cornerstore</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Valero Gas Station')}>Valero Gas Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Texaco')}>Texaco</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Around the Corner Store')}>Around the Corner Store</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('H‑E‑B Fuel')}>H‑E‑B Fuel</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Fiesta Gas Station')}>Fiesta Gas Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Leos Gas Station')}>Leos Gas Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Texan Market')}>Texan Market</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Food Mart Sunoco Gas Station')}>Food Mart Sunoco Gas Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Tcm Gas Station')}>Tcm Gas Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('ChargePoint Charging Station')}>ChargePoint Charging Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Tesla Destination Charger')}>Tesla Destination Charger</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Electric Vehicle Charging Station')}>Electric Vehicle Charging Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('SemaConnect Charging Station')}>SemaConnect Charging Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('EVgo Charging Station')}>EVgo Charging Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Blink Charging Station')}>Blink Charging Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Smart Charge America')}>Smart Charge America</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setNameFilter('Tesla Supercharger')}>Tesla Supercharger</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {open_nowFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setOpen_NowFilter('Open/Closed')}>Default</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setOpen_NowFilter('True')}>Open</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setOpen_NowFilter('False')}>Closed</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {gas_stationFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setGas_Station('Is it a Gas Station?')}>Default</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setGas_Station('True')}>Gas Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setGas_Station('False')}>Not a Gas Station</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {charging_stationFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setCharging_Station('Is it a Charging Station?')}>Default</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setCharging_Station('True')}>Charging Station</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setCharging_Station('False')}>Not a Charging Station</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {is_operationalFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setIs_Operational('Is it Operational?')}>Default</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setIs_Operational('True')}>Operational</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setIs_Operational('False')}>Not Operational</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>


                <Dropdown>
                    <Dropdown.Toggle variant="Success" id="dropdown-basic">
                        Sort Results
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-3" onClick={() => onChangeClick('id')}>Default</Dropdown.Item>
                        <Dropdown.Item href="#"onClick={() => onChangeClick('rating')}>Rating</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => onChangeClick('user_ratings_total')}>User Ratings Total</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => onChangeClick('name')}>Name</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => onChangeClick('location&lat_lng=30.288516%20-97.748265')}>Location</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => onChangeClick('address')}>Address</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <div data-testid="M1cards" className="cards">
                {(filteredData.map((item, index) => {                   
                    return <Model1Card key={index} information={item} wordArr={searchArr}/>
                }))}
            </div>
            <div>
                <Button onClick={prevButton}>
                    Previous
                </Button>
                Current Page: {pageNumber}
                <Button onClick={nextButton}>
                    Next
                </Button>
            </div>
        </div>
    )
}