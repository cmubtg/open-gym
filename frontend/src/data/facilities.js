const standardWeekdayHours = {
  open: new Date(0, 0, 0, 6, 30), // 6:30 am
  close: new Date(0, 0, 0, 23, 0), // 11 pm
};

const standardWeekendHours = {
  open: new Date(0, 0, 0, 10, 0), // 10 am
  close: new Date(0, 0, 0, 21, 0), // 9 pm
};

const tepperWeekdayHours = {
  open: new Date(0, 0, 0, 8, 0), // 8 am
  close: new Date(0, 0, 0, 20, 0), // 8 pm
};

const tepperWeekendHours = {
  open: new Date(0, 0, 0, 0, 0), // not open on weekends
  close: new Date(0, 0, 0, 0, 0), // not open on weekends
};

const wiegandWeekdayHours = {
  open: new Date(0, 0, 0, 8, 0), // 8 am
  close: new Date(0, 0, 0, 23, 0), // 11 pm
};

const wiegandWeekendHours = {
  open: new Date(0, 0, 0, 9, 0), //  9 am
  close: new Date(0, 0, 0, 23, 0), // 11 pm
};

const highmarkHours = {
  open: new Date(0, 0, 0, 7, 0), // 7 am
  close: new Date(0, 0, 0, 19, 0), // 7 pm
};

const facilities = [
  {
    id: "cohonFC",
    name: "UC Fitness Center Lower",
    address: "5000 Forbes Ave, Pittsburgh, PA 15213",
    description: `Two floors dedicated to cardio and weight equipment in
      the Cohon Univeristy Center.`,

    hours: Array.from({ length: 5 }, () => standardWeekdayHours).concat(
      Array.from({ length: 2 }, () => standardWeekendHours)
    ),
    image: process.env.PUBLIC_URL + "../images/uc.jpg",
    image2: process.env.PUBLIC_URL + "../images/uc2.jpg",
    image3: process.env.PUBLIC_URL + "../images/uc3.jpg",
    max_occupancy: 150,
    status: "established",
  },
  {
    id: "cohon2FC",
    name: "UC Fitness Center Upper",
    address: "5000 Forbes Ave, Pittsburgh, PA 15213",
    description: `Two floors dedicated to cardio and weight equipment in
      the Cohon Univeristy Center.`,

    hours: Array.from({ length: 5 }, () => standardWeekdayHours).concat(
      Array.from({ length: 2 }, () => standardWeekendHours)
    ),
    image: process.env.PUBLIC_URL + "../images/ucA1.jpg",
    image2: process.env.PUBLIC_URL + "../images/uc2.jpg",
    image3: process.env.PUBLIC_URL + "../images/uc3.jpg",
    max_occupancy: 150,
    status: "coming soon",
  },

  {
    id: "tepperFC",
    name: "Tepper Fitness Center",
    address: "",
    description: ``,
    hours: Array.from({ length: 5 }, () => tepperWeekdayHours).concat(
      Array.from({ length: 2 }, () => tepperWeekendHours)
    ),
    image: process.env.PUBLIC_URL + "./images/tepper.jpg",
    image2: process.env.PUBLIC_URL + "../images/tepper2.jpg",
    max_occupancy: 70,
    status: "coming soon",
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
    id: "wiegand",
    name: "Wiegand Gym",
    address: "",
    description: ``,
    hours: Array.from({ length: 5 }, () => wiegandWeekdayHours).concat(
      Array.from({ length: 2 }, () => wiegandWeekendHours)
    ),
    image: process.env.PUBLIC_URL + "./images/wiegand.jpg",
    image2: process.env.PUBLIC_URL + "../images/wiegand.jpg",
    max_occupancy: 300,
    status: "coming soon",
  },

  {
    id: "highmark",
    name: "Highmark Gym",
    address: "",
    description: ``,
    hours: Array.from({ length: 7 }, () => highmarkHours),
    image: process.env.PUBLIC_URL + "./images/highmark.jpg",
    image2: process.env.PUBLIC_URL + "../images/highmark.jpg",
    max_occupancy: 1000,
    status: "coming soon",
  },
];

export const getFacilitiesMetadata = () => {
  return facilities;
};
