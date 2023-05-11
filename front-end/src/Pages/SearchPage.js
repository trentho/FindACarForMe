import React, { useState, useEffect, useRef} from 'react';
import NavBar from '../Components/NavBar';
import Model1Card from '../Components/Model1Card';
import Model2Card from '../Components/Model2Card';
import Model3Card from '../Components/Model3Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function SearchPage() {
    const inputRef = useRef(null);
    const [stationData, setStationData] = useState([]);
    const [specData, setSpecData] = useState([]);
    const [listingData, setListingData] = useState([]);
    const [stationFilteredData, setStationFilteredData] = useState([]);
    const [specFilteredData, setSpecFilteredData] = useState([]);
    const [listingFilteredData, setListingFilteredData] = useState([]);
    const [searchArr, setSearchArr] = useState([]);
    // const stationBaseUrl = 'https://api.findacarfor.me/fuel_stations?page=';
    // const specBaseUrl = 'https://api.findacarfor.me/specs?page=';
    // const listingBaseUrl = 'https://api.findacarfor.me/listings?page=';
    const stationBaseSearchUrl = 'https://api.findacarfor.me/fuel_stations?page='
    const specBaseSearchUrl = 'https://api.findacarfor.me/specs?page='
    const listingBaseSearchUrl = 'https://api.findacarfor.me/listings?page='
    const [stationPageNumber, setStationPageNumber] = useState(1);
    const [specPageNumber, setSpecPageNumber] = useState(1);
    const [listingPageNumber, setListingPageNumber] = useState(1);
    
    const [searchInputString, setSearchInputString] = useState('');

    const [stationLastPage, setStationLastPage] = useState(false);
    const [specLastPage, setSpecLastPage] = useState(false);
    const [listingLastPage, setListingLastPage] = useState(false);

    let stationFilteredDataFromSearch = stationFilteredData;
    let specFilteredDataFromSearch = specFilteredData;
    let listingsFilteredDataFromSearch = listingFilteredData;

    var searchArray = null;

    const prevStationButton = () => {
        if (stationPageNumber != 1) {
            setStationPageNumber(stationPageNumber-1)
        }
    }
    const nextStationButton = () => {
        if (!stationLastPage) {
            setStationPageNumber(stationPageNumber+1)
        }
    }

    const prevSpecButton = () => {
        if (specPageNumber != 1) {
            setSpecPageNumber(specPageNumber-1)
        }
    }
    const nextSpecButton = () => {
        if (!specLastPage){
            setSpecPageNumber(specPageNumber+1)
        }
    }

    const prevListingButton = () => {
        if (listingPageNumber != 1) {
            setListingPageNumber(listingPageNumber-1)
        }
    }
    const nextListingButton = () => {
        if (!listingLastPage){
            setListingPageNumber(listingPageNumber+1)
        }
    }

    useEffect(() => {
        // fetch(stationBaseUrl + stationPageNumber + '&count=10' , {method: "GET", mode: 'cors'})
        console.log("station url", stationBaseSearchUrl + stationPageNumber + '&count=10' + (searchInputString != ''?'&search='+ searchInputString: ''))
        fetch(stationBaseSearchUrl + stationPageNumber + '&count=10' + (searchInputString != ''?'&search='+ searchInputString: ''), {method: "GET", mode: 'cors'})
            .then(async (response) => await response.json())
            .then((data) => {
                console.log(data);
                setStationData(data.results);
                setStationFilteredData(data.results);
                setStationLastPage(data.last_page)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [stationPageNumber, searchInputString]);

    useEffect(() => {
        // fetch(specBaseUrl + specPageNumber + '&count=10', {method: "GET", mode: 'cors'})
        fetch(specBaseSearchUrl + specPageNumber + '&count=10' + (searchInputString != ''?'&search='+ searchInputString: ''), {method: "GET", mode: 'cors'})
            .then(async (response) => await response.json())
            .then((data) => {
                setSpecData(data.results);
                setSpecFilteredData(data.results);
                setSpecLastPage(data.last_page)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [specPageNumber, searchInputString]);

    useEffect(() => {
        // fetch(listingBaseUrl + listingPageNumber + '&count=10', {method: "GET", mode: 'cors'})
        fetch(listingBaseSearchUrl + listingPageNumber + '&count=10' + (searchInputString != ''?'&search='+ searchInputString: ''), {method: "GET", mode: 'cors'})
            .then(async (response) => await response.json())
            .then((data) => {
                setListingData(data.results);
                setListingFilteredData(data.results);
                setListingLastPage(data.last_page)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [listingPageNumber, searchInputString]);


    function handleClick() {
        const inputForSearch = inputRef.current.value
        setSearchInputString(inputForSearch)
        searchArray = inputForSearch.toLowerCase().split(' ')
        setSearchArr(searchArray)
        if (inputForSearch !== '') {
            setStationPageNumber(1);
            setSpecPageNumber(1);
            setListingPageNumber(1);

            stationFilteredDataFromSearch = stationData.filter((item) => {
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
            })
            setStationFilteredData(stationFilteredDataFromSearch)

            specFilteredDataFromSearch = specData.filter((item) => {
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
            })
            setSpecFilteredData(specFilteredDataFromSearch)

            listingsFilteredDataFromSearch = listingData.filter((item) => {
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
            })
            setListingFilteredData(listingsFilteredDataFromSearch)
        }
        else{
            setStationFilteredData(stationData)
            setSpecFilteredData(specData)
            setListingFilteredData(listingData)
        }

        console.log("searchArray After: ", searchArray)
    }

    return(
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
                        // value={searchInput}
                        // onChange={(e) => searchItems(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleClick}>Search</Button>
                </Col>
                <h6>Press search twice to delete non-relevant results</h6>
            </Row>
            <Row>
                <h1>Fuel Stations</h1>
            </Row>
            <Row>
                <div data-testid="M1cards" className="cards">
                    {(stationFilteredData.map((item, index) => {                   
                        return <Model1Card key={index} information={item} wordArr={searchArr}/>
                    }))}
                </div>
            </Row>
            <Row>
                <div>
                    <Button onClick={prevStationButton}>
                        Previous
                    </Button>
                    Current Page: {stationPageNumber}
                    <Button onClick={nextStationButton}>
                        Next
                    </Button>
                </div>
            </Row>
            <Row>
                <h1>Safety and Specifications</h1>
            </Row>
            <Row>
                <div data-testid="M2cards" className="cards">
                    {(specFilteredData.map((item, index) => {                   
                        return <Model2Card key={index} information={item} wordArr={searchArr}/>
                    }))}
                </div>
            </Row>
            <Row>
                <div>
                    <Button onClick={prevSpecButton}>
                        Previous
                    </Button>
                    Current Page: {specPageNumber}
                    <Button onClick={nextSpecButton}>
                        Next
                    </Button>
                </div>
            </Row>
            <Row>
                <h1>Listings</h1>
            </Row>
            <Row>
                <div data-testid="M3cards" className="cards">
                    {(listingFilteredData.map((item, index) => {                   
                            return <Model3Card key={index} information={item} genericInformation={item} wordArr={searchArr}/>
                    }))}
                </div>
            </Row>
            <Row>
                <div>
                    <Button onClick={prevListingButton}>
                        Previous
                    </Button>
                    Current Page: {listingPageNumber}
                    <Button onClick={nextListingButton}>
                        Next
                    </Button>
                </div>
            </Row>
        </div>
        
    )
}