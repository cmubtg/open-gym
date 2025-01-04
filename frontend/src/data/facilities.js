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
      name : "UC Fitness Center Lower",
      address : "5000 Forbes Ave, Pittsburgh, PA 15213",
      description : `Two floors dedicated to cardio and weight equipment in
      the Cohon Univeristy Center.`,
    
      hours : Array.from({ length: 7 }, () => alwaysOpen), // 7 days a week standard hours
      image: process.env.PUBLIC_URL + "../images/uc.jpg",
      image2: process.env.PUBLIC_URL + "../images/uc2.jpg",
      image3: process.env.PUBLIC_URL + "../images/uc3.jpg",
      max_occupancy: 150,
      status: "established"
    }, 
    {
      id: "cohon2FC",
      name : "UC Fitness Center Upper",
      address : "5000 Forbes Ave, Pittsburgh, PA 15213",
      description : `Two floors dedicated to cardio and weight equipment in
      the Cohon Univeristy Center.`,
    
      hours : Array.from({ length: 7 }, () => alwaysOpen), // 7 days a week standard hours
      image: process.env.PUBLIC_URL + "../images/ucA1.jpg",
      image2: process.env.PUBLIC_URL + "../images/uc2.jpg",
      image3: process.env.PUBLIC_URL + "../images/uc3.jpg",
      max_occupancy: 150,
      status: "coming soon"
    }, 

    {
      id : "tepperFC",
      name : "Tepper Fitness Center",
      address : "",
      description : ``,
      hours : Array.from({ length: 7 }, () => alwaysOpen), 
      image: process.env.PUBLIC_URL + "./images/tepper.jpg",
      image2: process.env.PUBLIC_URL + "../images/tepper2.jpg",
      max_occupancy: 70,
      status: "coming soon"
    }, 
    // {
    //   id : "fairfax",
    //   name : "Fairfax Gym",
    //   address : "",
    //   description : ``,
    //   hours : Array.from({ length: 7 }, () => testHours), 
    //   image: process.env.PUBLIC_URL + "./images/uc.jpg",
    //   image2: process.env.PUBLIC_URL + "../images/fairfax2.jpg",
    //   max_occupancy: 30,
    //   status: "coming soon"
    // },
    {
      id : "wiegand",
      name : "Wiegand Gym",
      address : "",
      description : ``,
      hours : Array.from({ length: 7 }, () => standardHours), 
      image: process.env.PUBLIC_URL + "./images/wiegand.jpg",
      image2: process.env.PUBLIC_URL + "../images/wiegand.jpg",
      max_occupancy: 300,
      status: "coming soon"
    },

    {
      id : "highmark",
      name : "Highmark Gym",
      address : "",
      description : ``,
      hours : Array.from({ length: 7 }, () => standardHours), 
      image: process.env.PUBLIC_URL + "./images/highmark.jpg",
      image2: process.env.PUBLIC_URL + "../images/highmark.jpg",
      max_occupancy: 1000,
      status: "coming soon"
    }
];

export const getFacilities = () => {
    return facilities;
};