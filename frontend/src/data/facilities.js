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

const UCCarnivalHours1 = {
  open: new Date(0, 0, 0, 8, 0), // 8 am
  close: new Date(0, 0, 0, 20, 0), // 8 pm
};

const UCCarnivalHours2 = {
  open: new Date(0, 0, 0, 10, 0), // 10 am
  close: new Date(0, 0, 0, 18, 0), // 6 pm
};

// Hours Array
// 0 = Sunday, 6 = Saturday
const facilities = [
  {
    id: "cohonFC",
    name: "CUC Fitness Center Lower",
    address: "5000 Forbes Ave, Pittsburgh, PA 15213",
    description: `Two floors dedicated to cardio and weight equipment in
        the Cohon Univeristy Center.`,
    // Sunday, then M-F, then Saturday
    // hours: [
    //   standardWeekendHours,
    //   ...Array(5).fill(standardWeekdayHours),
    //   standardWeekendHours,
    // ],
    hours: [
      standardWeekendHours,
      ...Array(3).fill(standardWeekdayHours),
        UCCarnivalHours1, // Thu
        UCCarnivalHours1, // Fri
        UCCarnivalHours2, // Sat
    ],
    image: process.env.PUBLIC_URL + "../images/uc.jpg",
    image2: process.env.PUBLIC_URL + "../images/uc2.jpg",
    image3: process.env.PUBLIC_URL + "../images/uc3.jpg",
    max_occupancy: 94,
    status: "established",
  },
  {
    id: "cohon2FC",
    name: "CUC Fitness Center Upper",
    address: "5000 Forbes Ave, Pittsburgh, PA 15213",
    description: `Two floors dedicated to cardio and weight equipment in
        the Cohon Univeristy Center.`,
    hours: [
      standardWeekendHours,
      ...Array(5).fill(standardWeekdayHours),
      standardWeekendHours,
    ],
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
    hours: [
      tepperWeekendHours,
      ...Array(5).fill(tepperWeekdayHours),
      tepperWeekendHours,
    ],
    image: process.env.PUBLIC_URL + "./images/tepper.jpg",
    image2: process.env.PUBLIC_URL + "../images/tepper2.jpg",
    max_occupancy: 70,
    status: "coming soon",
  },
  {
    id: "wiegand",
    name: "Wiegand Gym",
    address: "",
    description: ``,
    hours: [
      wiegandWeekendHours,
      ...Array(5).fill(wiegandWeekdayHours),
      wiegandWeekendHours,
    ],
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
    hours: Array(7).fill(highmarkHours),
    image: process.env.PUBLIC_URL + "./images/highmark2.jpg",
    image2: process.env.PUBLIC_URL + "../images/highmark2.jpg",
    max_occupancy: 1000,
    status: "coming soon",
  },
];

export const getFacilitiesMetadata = () => {
  return facilities;
};
