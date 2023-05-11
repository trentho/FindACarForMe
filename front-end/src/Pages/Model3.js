import React, { useState, useEffect, useRef } from 'react';
import './Model3.css';
import NavBar from '../Components/NavBar';
import Model3Card from '../Components/Model3Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function Model3() {
    // const [posts, setPosts] = useState({"results": "[mock data 0,mock data 1]"});
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const baseUrl = 'https://api.findacarfor.me/listings?page=';
    const [sortName, setSortName] = useState('id');
    let filteredDataFromSearch = filteredData;
    const inputRef = useRef(null);
    const [makeFilter, setMakeFilter] = useState('Make');
    const [modelFilter, setModelFilter] = useState('Model');
    const [yearFilter, setYearFilter] = useState('Year');
    const [is_newFilter, setIs_NewFilter] = useState('Condition');
    const [colorFilter, setColorFilter] = useState('Color');
    const [pageNumber, setPageNumber] = useState(1);

    const [searchArr, setSearchArr] = useState([]);
    const [searchInputString, setSearchInputString] = useState('');
    const [listingLastPage, setListingLastPage] = useState(false);

    const onChangeClick = (value) => {
        console.log("-------------onChangeClick-------------")
        setSortName(value)
        console.log("sortName: ", sortName)
    };

    const prevButton = () => {
        if (pageNumber != 1) {
            setPageNumber(pageNumber-1)
        }
    }
    const nextButton = () => {
        if (!listingLastPage){
            setPageNumber(pageNumber+1)
        }
    }

    useEffect(() => {
        fetch(baseUrl + pageNumber + '&count=10&sort=' + sortName 
                + (makeFilter != 'Make'?'&make='+makeFilter: '') 
                + (modelFilter != 'Model'?'&model='+modelFilter: '')
                + (yearFilter != 'Year'?'&year='+yearFilter: '')
                + (is_newFilter != 'Condition'?'&is_new='+is_newFilter: '')
                + (colorFilter != 'Color'?'&color='+colorFilter: '')
                + (searchInputString != ''?'&search='+ searchInputString: ''), {method: "GET", mode: 'cors'})
            .then(async (response) => await response.json())
            .then((data) => {
                setAllData(data.results);
                setFilteredData(data.results);
                setListingLastPage(data.last_page);
                // console.log("filteredData: ", typeof(filteredData), filteredData)
                // console.log("vin decode:", data.vin_decode)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, [sortName, makeFilter, modelFilter, yearFilter, is_newFilter, colorFilter, pageNumber, searchInputString]);

        

    function handleClick() {
        console.log(inputRef.current.value)
        // setSearchInput(inputRef.current.value)
        const inputForSearch = inputRef.current.value
        setSearchInputString(inputForSearch)
        console.log("filteredDataFromSearch before", filteredDataFromSearch)
        // if (searchInput !== '') {
        if (inputForSearch !== '') {
            filteredDataFromSearch = allData.filter((item) => {
                // return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())

                var searchArray = inputForSearch.toLowerCase().split(' ')
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
    }

    // const filterByCondition = (e) => {
    //     console.log(e.target.id)
    //     filteredDataFromSearch = filteredData.filter((item) => {
    //         // console.log("entries", Object.entries(item)[11].join('').includes({(e.target.id=='New')?true:false}))
    //         // return Object.values(item).join('').toLowerCase().includes(inputForSearch.toLowerCase())
    //     })
    //     // console.log("filteredData before", filteredData)
    //     // setFilteredData(filteredDataFromSearch)
    //     // console.log("filteredDataFromSearch", filteredDataFromSearch)
    //     // console.log("filteredData after:", filteredData)
    // }

        // console.log("typeof posts", typeof Array.from(posts))

    return (
        <div>
            <NavBar />
            <Row >
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
                        // onChange={(e) => searchItems(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleClick}>Search</Button>
                </Col>
                <h6>Press search twice to delete non-relevant results</h6>
                <Row>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {makeFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setMakeFilter('Make')}>None</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Acura')}>Acura</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Alfa Romeo')}>Alfa Romeo</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Audi')}>Audi</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('BMW')}>BMW</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Buick')}>Buick</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Chevrolet')}>Chevrolet</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Cadillac')}>Cadillac</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Chrysler')}>Chrysler</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Dodge')}>Dodge</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Ford')}>Ford</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Fiat')}>Fiat</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('GMC')}>GMC</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Genesis')}>Genesis</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Hyundai')}>Hyundai</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Honda')}>Honda</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Infiniti')}>Infiniti</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Jeep')}>Jeep</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Kia')}>Kia</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Land Rover')}>Land Rover</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Lincoln')}>Lincoln</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Lexus')}>Lexus</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Lucid')}>Lucid</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Mercedes-Benz')}>Mercedes-Benz</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Mazda')}>Mazda</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Mini')}>Mini</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Mitsubishi')}>Mitsubishi</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Nissan')}>Nissan</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Porsche')}>Porshe</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Polestar')}>Polestar</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Ram')}>Ram</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Subary')}>Subaru</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Tesla')}>Tesla</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Toyota')}>Toyota</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Volvo')}>Volvo</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setMakeFilter('Volkswagen')}>Volkswagen</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {modelFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setModelFilter('Model')}>None</Dropdown.Item>
                                <h4>Acura</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('ILX')}>ILX</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('MDX')}>MDX</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('RDX')}>RDX</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('TLX')}>TLX</Dropdown.Item>
                                <h4>Alfa Romeo</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Stelvio')}>Stelvio</Dropdown.Item>
                                <h4>Audi</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('A3')}>A3</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('A4')}>A4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('A4 allroad')}>A4 allroad</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('A5')}>A5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('A6')}>A6</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('A6 Allroad')}>A6 Allroad</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('A7')}>A7</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('A8')}>A8</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('A8 L')}>A8 L</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Cabriolet')}>Cabriolet</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Coupe')}>Coupe</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('e-tron')}>e-tron</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Q3')}>Q3</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Q5')}>Q5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Q5 e')}>Q5 e</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Q7')}>Q7</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Q8')}>Q8</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('S3')}>S3</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('S4')}>S4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('S5')}>S5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('S6')}>S6</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('S7')}>S7</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('S8')}>S8</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('SQ5')}>SQ5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('TT')}>TT</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('TT RS')}>TT RS</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('TTS')}>TTS</Dropdown.Item>
                                <h4>BMW</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('228i')}>228i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('230I')}>230I</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('330i')}>330i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('430i')}>430i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('440I')}>440I</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('530e')}>530e</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('530i')}>530i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('540i')}>540i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('740i')}>740i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('745e')}>745e</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('750i')}>750i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('840i')}>840i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M2')}>M2</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M235i')}>M235i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M240i')}>M240i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M340i')}>M340i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M4')}>M4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M5')}>M5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M550i')}>M550i</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M8')}>M8</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('M850I')}>M850I</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('X1')}>X1</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('X2')}>X2</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('X3')}>X3</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('X4')}>X4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('X5')}>X5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('X6')}>X6</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('X7')}>X7</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Z4')}>Z4</Dropdown.Item>
                                <h4>Buick</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Enclave')}>Enclave</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Encore')}>X4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Encore GX')}>Encore GX</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Envision')}>Envision</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('LaCrosse')}>LaCrosse</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Regal')}>Regal</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Regal TourX')}>Regal TourX</Dropdown.Item>
                                <h4>Cadillac</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('ATS')}>ATS</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('CT5')}>CT5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('ct6')}>CT6</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('CTS')}>CTS</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('escalade')}>Escalade</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('escalade esv')}>Escalade ESV</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('XT4')}>XT4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('XT5')}>XT5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('XT6')}>XT6</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('XTS')}>XTS</Dropdown.Item>
                                <h4>Chevrolet</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('3500')}>3500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('4500')}>4500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('4500HD')}>4500HD</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('5500HD')}>5500HD</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('5500XD')}>5500XD</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Blazer')}>Blazer</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Bolt EV')}>Bolt EV</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Camaro')}>Camaro</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Colorado')}>Colorado</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Corvette')}>Corvette</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Equinox')}>Equinox</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Malibu')}>Malibu</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Silverado')}>Silverado</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Spark')}>Spark</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Suburban')}>Suburban</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Tahoe')}>Tahoe</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Traverse')}>Traverse</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Trax')}>Trax</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Volt')}>Volt</Dropdown.Item>
                                <h4>Chrysler</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('300')}>300</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Pacifica')}>Pacifica</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Voyager')}>Voyager</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Caravan')}>Caravan</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Challenger')}>Challenger</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Charger')}>Charger</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Durango')}>Durango</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Grand Caravan')}>CamGrand Caravanaro</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Journey')}>Journey</Dropdown.Item>
                                <h4>Ford</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('500')}>500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('500L')}>500L</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('500X')}>500X</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('E-350')}>E-350</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('E-450')}>E-450</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Ecosport')}>Ecosport</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Edge')}>Edge</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Escape')}>Escape</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Expedition')}>Expedition</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Expedition Max')}>Expedition Max</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Explorer')}>Explorer</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('F-150')}>F-150</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('F-250')}>F-250</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('F-350')}>F-350</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('F-450')}>F-450</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('F-550')}>F-550</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('F-650')}>F-650</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('F-750')}>F-750</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('GT')}>GT</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Ranger')}>Ranger</Dropdown.Item>
                                <h4>Genesis</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('G70')}>G70</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('G80')}>G80</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('G90')}>G90</Dropdown.Item>
                                <h4>GMC</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Acadia')}>Acadia</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Canyon')}>Canyon</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Sierra')}>Sierra</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Terrain')}>Terrain</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Yukon')}>Yukon</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Yukon XL')}>Yukon XL</Dropdown.Item>
                                <h4>Honda</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Accord')}>Accord</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Civic')}>Civic</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Civic Si')}>Civic Si</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('CR-V')}>CR-V</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('HR-V')}>HR-V</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Odyssey')}>Odyssey</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Passport')}>Passport</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Pilot')}>HR-V</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Ridgeline')}>Ridgeline</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Passport')}>Passport</Dropdown.Item>
                                <h4>Hyundai</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Accent')}>Accent</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Elantra')}>Elantra</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Elantra GT')}>Elantra GT</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('IONIQ')}>IONIQ</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('KONA')}>KONA</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('NEXO')}>NEXO</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Palisade')}>Palisade</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Santa Fe')}>Santa Fe</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Ridgeline')}>Ridgeline</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Santa Fe Sport')}>Santa Fe Sport</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Santa Fe XL')}>Santa Fe XL</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Sonata')}>Sonata</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Veloster')}>Veloster</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Veloster N')}>Veloster N</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('VENUE')}>VENUE</Dropdown.Item>
                                <h4>Infiniti</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Q50')}>Q50</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Q60')}>Q60</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Q70L')}>Q70L</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('QX30')}>QX30</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('QX50')}>QX50</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('QX60')}>QX60</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('QX80')}>QX80</Dropdown.Item>
                                <h4>Jeep</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Cherokee')}>Cherokee</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Compass')}>Compass</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Gladiator')}>Gladiator</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Grand Cherokee')}>Grand Cherokee</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Renegade')}>Renegade</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Wrangler')}>Wrangler</Dropdown.Item>
                                <h4>Kia</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Cadenza')}>Cadenza</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Forte')}>Forte</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('K900')}>K900</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Grand Cherokee')}>Grand Cherokee</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Niro')}>Niro</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Optima')}>Optima</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Rio')}>Rio</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Seltos')}>Seltos</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Sorento')}>Sorento</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Soul')}>Soul</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Sportage')}>Sportage</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Stinger')}>Stinger</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Telluride')}>Telluride</Dropdown.Item>
                                <h4>Land Rover</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Discovery')}>Discovery</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Discovery Sport')}>Discovery Sport</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Range Rover')}>Range Rover</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Range Rover Evoque')}>Range Rover Evoque</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Range Rover Sport')}>Range Rover Sport</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Range Rover Velar')}>Range Rover Velar</Dropdown.Item>
                                <h4>Lexus</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('ES')}>ES</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('GS')}>GS</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('GX')}>GX</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('IS')}>IS</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('LC')}>LC</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('LS')}>LS</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('LX')}>LX</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('LX 570')}>LX 570</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('NX')}>NX</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('RC')}>RC</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('RC F')}>RC F</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('RX')}>RX</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Ux')}>UX</Dropdown.Item>
                                <h4>Lincoln</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Aviator')}>Aviator</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Corsair')}>Corsair</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('GNautilusX')}>Nautilus</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Navigator')}>Navigator</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Navigator L')}>Navigator L</Dropdown.Item>
                                <h4>Mazda</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('CX-30')}>CX-30</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('CX-5')}>CX-5</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('CX-9')}>CX-9</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Mazda3')}>Mazda3</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('MX-5')}>MX-5</Dropdown.Item>
                                <h4>Mini</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Clubman')}>Clubman</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Cooper')}>GCooperS</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Cooper S')}>Cooper S</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Cooper S Countryman')}>Cooper S Countryman</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Countryman')}>Countryman</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Hardtop')}>Hardtop</Dropdown.Item>
                                <h4>Mitsubishi</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Eclipse Cross')}>Eclipse Cross</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Mirage')}>Mirage</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Mirage G4')}>Mirage G4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Outlander')}>IS</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Outlander Sport')}>LC</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('SP')}>SP</Dropdown.Item>
                                <h4>Nissan</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Altima')}>Altima</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Armada')}>Armada</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Frontier')}>Frontier</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('GT-R')}>GT-R</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Kicks')}>Kicks</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('LEAF')}>LEAF</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Maxima')}>Maxima</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Murano')}>Murano</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Pathfinder')}>Pathfinder</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Rogue')}>Rogue</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Rogue Sport')}>Rogue Sport</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Sentra')}>Sentra</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Titan')}>Titan</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Versa')}>Versa</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('1500')}>1500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('2500')}>2500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('3500')}>3500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('4500')}>4500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('5500')}>5500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Cargo Van')}>Cargo Van</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('ProMaster 1500')}>ProMaster 1500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('ProMaster 2500')}>ProMaster 2500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('ProMaster 3500')}>ProMaster 3500</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('ProMaster City')}>ProMaster City</Dropdown.Item>
                                <h4>Subaru</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Ascent')}>Ascent</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('BRZ')}>BRZ</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Crosstrek')}>Crosstrek</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Forester')}>Forester</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Impreza')}>Impreza</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Legacy')}>Legacy</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Outback')}>Outback</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('WRX')}>WRX</Dropdown.Item>
                                <h4>Toyota</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('86')}>86</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Avalon')}>Avalon</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Camry')}>Camry</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('C-HR')}>C-HR</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Corolla')}>Corolla</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Highlander')}>Highlander</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Land Cruiser')}>Land Cruiser</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Mirai')}>Mirai</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Prius')}>Prius</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Prius Prime')}>Prius Prime</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Rav4')}>Rav4</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Sequoia')}>Sequoia</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Sienna')}>Sienna</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Supra')}>Supra</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Tacoma')}>Tacoma</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Tundra')}>Tundra</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Yaris')}>Yaris</Dropdown.Item>
                                <h4>Volkswagen</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('Arteon')}>Arteon</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Atlas')}>Atlas</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Atlas Cross Sport')}>Atlas Cross Sport</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Beetle')}>Beetle</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('e-Golf')}>e-Golf</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('GLI')}>GLI</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Golf')}>Golf</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Golf Alltrack')}>Golf Alltrack</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Golf GTI')}>Golf GTI</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Golf R')}>Golf R</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Golf Sportwagen')}>Golf Sportwagen</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('GTI')}>GTI</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Jetta')}>Jetta</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Jetta GLI')}>Jetta GLI</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Passat')}>Passat</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('Tiguan')}>Tiguan</Dropdown.Item>
                                <h4>Volvo</h4>
                                <Dropdown.Item onClick={()=>setModelFilter('S60')}>S60</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('S90')}>S90</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('V60')}>V60</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('V90')}>V90</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('XC40')}>XC40</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('XC60')}>XC60</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setModelFilter('XC90')}>XC90</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {yearFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setYearFilter('Year')}>None</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setYearFilter('2021')}>2021</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setYearFilter('2022')}>2022</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setYearFilter('2023')}>2023</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {is_newFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setIs_NewFilter('Condition')}>None</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setIs_NewFilter('New')}>New</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setIs_NewFilter('Used')}>Used</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                                {colorFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>setColorFilter('Color')}>None</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setColorFilter('White')}>White</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setColorFilter('Gray')}>Gray</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setColorFilter('Black')}>Black</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setColorFilter('Blue')}>Blue</Dropdown.Item>
                                <Dropdown.Item onClick={()=>setColorFilter('Red')}>Red</Dropdown.Item>
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
                        <Dropdown.Item href="#"onClick={() => onChangeClick('ask_price')}>Ask Price</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => onChangeClick('msrp')}>MSRP</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => onChangeClick('mileage')}>Mileage</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => onChangeClick('cylinders')}>Number of Cylinders</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => onChangeClick('horsepower')}>Horsepower</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => onChangeClick('engine_cc')}>Engine Displacement</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <div data-testid="M3cards" className="cards">
                {(filteredData.map((item, index) => {                   
                        return <Model3Card key={index} information={item} genericInformation={item} wordArr={searchArr}/>
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