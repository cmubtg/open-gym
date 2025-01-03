const standardHours = {
  open: new Date(0, 0, 0, 9, 0), // 9 am
  close: new Date(0, 0, 0, 23, 0), // 11 pm
};

const alwaysOpen = {
  open: new Date(0, 0, 0, 0, 0), // 12 am
  close: new Date(0, 0, 0, 23, 59), // 11:59 pm
};
const testHours = {
  open: new Date(0, 0, 0, 15, 0), // 3 pm
  close: new Date(0, 0, 0, 17, 0), // 5 pm
};

const facilities = [
  {
    id: "cohonFC",
    name: "Cohon Fitness Center",
    address: "5000 Forbes Ave, Pittsburgh, PA 15213",
    description: `Two floors dedicated to cardio and weight equipment in
        the Cohon Univeristy Center.`,

    hours: Array.from({ length: 7 }, () => alwaysOpen), // 7 days a week standard hours
    image: process.env.PUBLIC_URL + "../images/uc.jpg",
    image2: process.env.PUBLIC_URL + "../images/uc2.jpg",
    image3: process.env.PUBLIC_URL + "../images/uc3.jpg",
    max_occupancy: 150,
  },
  {
    id: "tepperFC",
    name: "Tepper Fitness Center",
    address: "",
    description: ``,
    hours: Array.from({ length: 7 }, () => alwaysOpen),
    image: process.env.PUBLIC_URL + "./images/tepper.jpg",
    image2: process.env.PUBLIC_URL + "../images/tepper2.jpg",
    max_occupancy: 70,
  },
  {
    id: "fairfax",
    name: "Fairfax Gym",
    address: "",
    description: ``,
    hours: Array.from({ length: 7 }, () => testHours),
    image: process.env.PUBLIC_URL + "./images/uc.jpg",
    image2: process.env.PUBLIC_URL + "../images/fairfax2.jpg",
    max_occupancy: 30,
  },
  {
    id: "wiegand",
    name: "Wiegand Gym",
    address: "",
    description: ``,
    hours: Array.from({ length: 7 }, () => standardHours),
    image: process.env.PUBLIC_URL + "./images/wiegand.jpg",
    image2: process.env.PUBLIC_URL + "../images/wiegand.jpg",
    max_occupancy: 300,
  },
];

export const getFacilitiesMetadata = () => {
  return facilities;
  // TODO n/BPS-226 - Fetch facility metadata from API
  //   const fetchFacilitiesMetadata = async () => {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_API_URL}/metadata`);
  //       const data = await response.json();
  //       return data;
  //     } catch (error) {
  //       console.error("Error fetching facilities metadata:", error);
  //     }
  //   };

  //   const facilities = fetchFacilitiesMetadata();
  //   return facilities;
};
