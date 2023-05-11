import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function EGMVisual2() {
    const [cityData, setCityData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const baseUrlFirst = 'https://api.exploreandgivemore.me/cities?page=';
    const baseUrlSecond = '&per_page=30&sort_field=elevation&asc=true&min_population=10000&max_population=300000';

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

    cityData.sort((a, b) => a.elevation - b.elevation);

    return (
        <div style={{margin: "auto"}}>
            <ScatterChart width={1460} height={500} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="elevation" name="Elevation" unit="" />
                <YAxis dataKey="population" name="Population" unit="" />
                <ZAxis dataKey="name" name="City" unit="" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Cities" data={cityData} fill="#8884d8" />
            </ScatterChart>
            <div className='page-button-wrapper'>
                <Button className='page-button' onClick={prevButton}>
                    Previous
                </Button>
                Current Page: {pageNumber}
                <Button className='page-button' onClick={nextButton}>
                    Next
                </Button>
            </div>
        </div>
    )

}