export const facilities = [
    {
        id: 1,
        name : "Cohon Fitness Center",
        address : "5000 Forbes Ave, Pittsburgh, PA 15213",
        description : `The Cohon University Center (CUC) is the 
                        campus center for Carnegie Mellon University. 
                        The CUC hosts a variety of dining options, 
                        student organization offices, and meeting spaces.`,
       hours : "Monday - Friday : 7:00am - 12:00am",
       image: process.env.PUBLIC_URL + "./images/uc.jpg",
       max_occupancy: 150
    }, 
    {
        id : 2,
        name : "Tepper Fitness Center",
        address : "",
        description : ``,
        hours : "Monday - Friday : 7:00am - 12:00am", 
        image: process.env.PUBLIC_URL + "./images/tepper.jpg",
        max_occupancy: 70
    }, 
    {
        id : 3,
        name : "Fairfax Gym",
        address : "",
        description : ``,
        hours : "Monday - Friday : 7:00am - 12:00am", 
        image: process.env.PUBLIC_URL + "./images/uc.jpg",
        max_occupancy: 30
    },
    {
        id : 4,
        name : "Wiegand Gym",
        address : "",
        description : ``,
        hours : "Monday - Friday : 7:00am - 12:00am", 
        image: process.env.PUBLIC_URL + "./images/wiegand.jpg",
        max_occupancy: 300
    },
];