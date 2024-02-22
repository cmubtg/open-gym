import React, { useState, useEffect } from 'react';

const standardHours = {
    open : new Date(0,0,0,9,0), // 9 am
    close : new Date(0,0,0,23,0) // 11 pm
}

const alwaysOpen = {
    open : new Date(0,0,0,0,0), // 12 am
    close : new Date(0,0,0,23,59) // 11:59 pm

}
const testHours = {
    open : new Date(0,0,0,15,0), // 3 pm
    close : new Date(0,0,0,17,0) // 5 pm
}


const facilities = [
    { 
        id: "cohonFC",
        name : "Cohon Fitness Center",
        address : "5000 Forbes Ave, Pittsburgh, PA 15213",
        description : `Two floors dedicated to cardio and weight equipment in
        the Cohon Univeristy Center.`,
        hours : 
            {
                data : Array.from({ length: 7 }, () => alwaysOpen), // 7 days a week standard hours
                specialHr : true,
            },
        image: process.env.PUBLIC_URL + "../images/uc.jpg",
        image2: process.env.PUBLIC_URL + "../images/uc2.jpg",
        image3: process.env.PUBLIC_URL + "../images/uc3.jpg",
        max_occupancy: 150
    }, 
    {
    id : "tepperFC",
        name : "Tepper Fitness Center",
        address : "",
        description : ``,
        hours : 
            {
                data : Array.from({ length: 7 }, () => alwaysOpen), // 7 days a week standard hours
                specialHr : true,
            },
        image: process.env.PUBLIC_URL + "./images/tepper.jpg",
        image2: process.env.PUBLIC_URL + "../images/tepper2.jpg",
        max_occupancy: 70
    }, 
    {
        id : "fairfax",
        name : "Fairfax Gym",
        address : "",
        description : ``,
        hours : 
            {
                data : Array.from({ length: 7 }, () => alwaysOpen), // 7 days a week standard hours
                specialHr : true,
            },
        image: process.env.PUBLIC_URL + "./images/uc.jpg",
        image2: process.env.PUBLIC_URL + "../images/fairfax2.jpg",
        max_occupancy: 30
    },
    {
        id : "wiegand",
        name : "Wiegand Gym",
        address : "",
        description : ``,
        hours : 
            {
                data : Array.from({ length: 7 }, () => alwaysOpen), // 7 days a week standard hours
                specialHr : true,
            }, 
        image: process.env.PUBLIC_URL + "./images/wiegand.jpg",
        image2: process.env.PUBLIC_URL + "../images/wiegand.jpg",
        max_occupancy: 300
    },
];

export const GetFacilities = () => {  
    const [facilities, setFacilities] = useState(null);
    useEffect(() => {
        // try {
        //     return facilities;
        //     // const res = await fetch(`/api/metadata`);
        //     // const data = await res.json();
        //     // if (res.ok) {
        //     //     return data;
        //     // }
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // } 
    }, []);
        
    return facilities;
};