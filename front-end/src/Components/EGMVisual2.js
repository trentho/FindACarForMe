import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';


export default function EGMVisual2() {

    const [charityData, setCharityData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const baseUrlFirst = 'https://api.exploreandgivemore.me/charities?page=';
    const baseUrlSecond = '&per_page=85&sort_field=name&asc=true&query';

    const prevButton = () => {
        if (pageNumber != 1) {
            setPageNumber(pageNumber-1)
        }
    }
    const nextButton = () => {
        setPageNumber(pageNumber+1)
    }

    useEffect(() => {
        fetch(baseUrlFirst + 1 + baseUrlSecond,
            {
                method: 'GET',
                mode: 'cors'
            }
            )
            .then(async (response) => await response.json())
            .then((dataReceived) => {
                console.log(dataReceived.data.charities)
                setCharityData(dataReceived.data.charities);
            })
            .catch((err) => {
                console.log(err.message);
            });
        } , [pageNumber]);

    let states = new Map();
    let charityFreq = [];
    let id = 0;
    for (let i = 0; i < charityData.length; i++) {
        let State = charityData[i].state;
        if (states.has(State)) {
            charityFreq[states.get(State)].value++;
        } else {
            states.set(State, id);
            charityFreq[id] = {state: State, value: 1};
            id++;
        }
    }
    console.log(charityFreq);
  
    return (
        <div style={{marginTop: "25px", marginLeft: "auto", marginRight: "auto"}}>
            <PieChart width={2190} height={750}>
                <Pie data={charityFreq} dataKey="value" nameKey="state" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" isAnimationActive={true} />
                <Pie data={charityFreq} dataKey="value" nameKey="state" cx="50%" cy="50%" innerRadius={120} outerRadius={270} fill="#82ca9d" label />
                <Tooltip />
            </PieChart>
        </div>
    );
  }
  