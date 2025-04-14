// MongoDB Playground
// Calculate weighted average entry times for gym occupancy data

// Connect to the database
use("openGymProdDB");

// Configuration
const gymName = "cohonFC"; // Change this to analyze different gyms
const startDate = new Date("2025-03-31"); // Set your desired date range start
const endDate = new Date("2025-04-12"); // Set your desired date range end

// Query to get all log records for the specified gym within date range
const logRecords = db.logs
  .find({
    gym: gymName,
    time: { $gte: startDate, $lte: endDate },
    // Uncomment to filter by specific notes
    // notes: { $exists: true }
  })
  .sort({ time: 1 })
  .toArray();

// Display count of returned records
print(
  `Found ${
    logRecords.length
  } records for ${gymName} between ${startDate.toISOString()} and ${endDate.toISOString()}`
);

// Helper function to extract hour from timestamp
const getHour = (timestamp) => {
  const date = new Date(timestamp);
  return date.getHours() + date.getMinutes() / 60; // Returns hour with decimal for minutes
};

// Initialize data structures for analysis
const hourlyEntries = {};
const dayOfWeekEntries = {
  0: { total: 0, count: 0 }, // Sunday
  1: { total: 0, count: 0 }, // Monday
  2: { total: 0, count: 0 }, // Tuesday
  3: { total: 0, count: 0 }, // Wednesday
  4: { total: 0, count: 0 }, // Thursday
  5: { total: 0, count: 0 }, // Friday
  6: { total: 0, count: 0 }, // Saturday
};

// Analyze the data
let totalEntries = 0;
let totalExits = 0;
let weightedHourSumEntries = 0;
let weightedHourSumExits = 0;

logRecords.forEach((record) => {
  const hour = getHour(record.time);
  const dayOfWeek = new Date(record.time).getDay();
  const entries = record.entries || 0;
  const exits = record.exits || 0;

  // Accumulate entries by hour
  if (!hourlyEntries[hour]) {
    hourlyEntries[hour] = 0;
  }
  hourlyEntries[hour] += entries;

  // Accumulate entries by day of week
  dayOfWeekEntries[dayOfWeek].total += entries;
  dayOfWeekEntries[dayOfWeek].count += entries > 0 ? 1 : 0;

  // Calculate weighted hour sum for average entry time
  weightedHourSumEntries += hour * entries;
  totalEntries += entries;
  totalExits += exits || 0;
  weightedHourSumExits += hour * exits;
});

// Calculate the weighted average entry time
const averageEntryTime =
  totalEntries > 0 ? weightedHourSumEntries / totalEntries : 0;
const averageExitTime = totalExits > 0 ? weightedHourSumExits / totalExits : 0;

// Convert decimal hour back to hours and minutes
const averageEntryHour = Math.floor(averageEntryTime);
const averageEntryMinute = Math.round(
  (averageEntryTime - averageEntryHour) * 60
);
const averageExitHour = Math.floor(averageExitTime);
const averageExitMinute = Math.round((averageExitTime - averageExitHour) * 60);

// Format the result nicely
const formattedEntryTime = `${averageEntryHour}:${averageEntryMinute
  .toString()
  .padStart(2, "0")}`;
const formattedExitTime = `${averageExitHour}:${averageExitMinute
  .toString()
  .padStart(2, "0")}`;

// Results
print("\n==== ANALYSIS RESULTS ====");
print(`Total entries: ${totalEntries}`);
print(`Total exits: ${totalExits}`);
print(`Net occupancy: ${totalEntries - totalExits}`);
print(
  `Average entry time: ${formattedEntryTime} (${averageEntryTime.toFixed(
    2
  )} hours)`
);
print(
  `Average exit time: ${formattedExitTime} (${averageExitTime.toFixed(
    2
  )} hours)`
);
print(
  `Average time spent: ${(averageExitTime - averageEntryTime).toFixed(2)} hours`
);
