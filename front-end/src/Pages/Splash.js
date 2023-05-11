import './Splash.css';
import NavBar from '../Components/NavBar';
import carPicture from '../Assets/splashpage.png';
import SplashCard1 from '../Components/SplashCard1'
import SplashCard2 from '../Components/SplashCard2'
import SplashCard3 from '../Components/SplashCard3'
import React from 'react';

export default function Splash() {
    return (
        <div>
            <NavBar />
            <div className = "head-text">
                <img src={carPicture} alt="Cover" className="Cover-photo"/>
                <h1 class='text-on-image'>
                    Welcome to Find a Car For Me!
                </h1>
                <p>
                    We are a website that helps you find the best car for you! <br/>
                    Click the buttons below to get started!
                </p>
            </div>
            <div data-testid="sCard1" className="cards">
                <SplashCard1/>
                <SplashCard2/>
                <SplashCard3/>
            </div>
        </div>
    );
}