const standardHours = {
    open : "09:00",
    close : "22:00"
}

const alwaysOpen = {
    open : "00:00",
    close : "23:59"

}
const testHours = {
    open : "22:15",
    close : "23:00"
}

export const facilities = [
    {
        id: "cohonFC",
        name : "Cohon Fitness Center",
        address : "5000 Forbes Ave, Pittsburgh, PA 15213",
        description : `The Cohon University Center (CUC) is the 
                        campus center for Carnegie Mellon University. 
                        The CUC hosts a variety of dining options, 
                        student organization offices, and meeting spaces.`,
      
       hours : Array.from({ length: 7 }, () => alwaysOpen), // 7 days a week standard hours
       image: process.env.PUBLIC_URL + "./images/uc.jpg",
       max_occupancy: 150
    }, 
    {
        id : "tepperFC",
        name : "Tepper Fitness Center",
        address : "",
        description : ``,
        hours : Array.from({ length: 7 }, () => alwaysOpen), 
        image: process.env.PUBLIC_URL + "./images/tepper.jpg",
        max_occupancy: 70
    }, 
    {
        id : "fairfax",
        name : "Fairfax Gym",
        address : "",
        description : ``,
        hours : Array.from({ length: 7 }, () => testHours), 
        image: process.env.PUBLIC_URL + "./images/uc.jpg",
        max_occupancy: 30
    },
    {
        id : "wiegand",
        name : "Wiegand Gym",
        address : "",
        description : ``,
        hours : Array.from({ length: 7 }, () => standardHours), 
        image: process.env.PUBLIC_URL + "./images/wiegand.jpg",
        max_occupancy: 300
    },
];