const Session = require('../models/sessionModel');
const { writeToCSV } = require('../utils/writeToCSV');

const getAllData = async () => {
  return await Session.find({});
}

const deleteAllData = async () => {
  // *** Insert deletion code HERE ***
}

const moveAllData = async () => {
  const data = await getAllData();
  writeToCSV(data);
  deleteAllData();
}

module.exports = { 
  getAllData,
  deleteAllData,
  moveAllData
}