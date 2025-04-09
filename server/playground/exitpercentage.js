// MongoDB Playground
// Intended for experimenting with different exit percentages to consider
// and analyzing gym occupancy data.

use("openGymProdDB");

const startDate = new Date("2025-04-08T06:30:00Z");
const gymName = "cohonFC";
const exitPercentage = 0.94;

// Query to get all records after startDate, vary base on notes field
const logRecords = db.logs
  .find({
    gym: gymName,
    time: { $gte: startDate },
    // notes: { $exists: false },
  })
  .sort({ time: 1 })
  .toArray();

// Display count of returned records
print(
  `Found ${
    logRecords.length
  } records for ${gymName} after ${startDate.toISOString()}`
);

// Calculate total entries and exits
const totalEntries = logRecords.reduce(
  (sum, record) => sum + record.entries,
  0
);
const totalExits = logRecords.reduce((sum, record) => sum + record.exits, 0);
const actualOccupancy = totalEntries - totalExits;

// Calculate modified occupancy with reduced exit percentage
const modifiedExits = totalExits * exitPercentage;
const modifiedOccupancy = totalEntries - modifiedExits;

print("\n=== SUMMARY ===");
print(`Total Entries: ${totalEntries}`);
print(`Total Exits: ${totalExits}`);
print(`Actual Occupancy: ${actualOccupancy}`);
print(`\nWith ${exitPercentage * 100}% of exits counted:`);
print(`Modified Exits: ${modifiedExits.toFixed(2)}`);
print(`Modified Occupancy: ${modifiedOccupancy.toFixed(2)}`);


print("\n=== DAILY TOTALS ===");
const dailyData = {};

logRecords.forEach((record) => {
  const dateKey = record.time.toISOString().split("T")[0];

  if (!dailyData[dateKey]) {
    dailyData[dateKey] = { entries: 0, exits: 0 };
  }

  dailyData[dateKey].entries += record.entries;
  dailyData[dateKey].exits += record.exits;
});

// Print daily totals
Object.keys(dailyData)
  .sort()
  .forEach((date) => {
    const dayData = dailyData[date];
    const dayActualOcc = dayData.entries - dayData.exits;
    const dayModifiedOcc = dayData.entries - dayData.exits * exitPercentage;

    print(
      `${date}: Entries=${dayData.entries}, Exits=${
        dayData.exits
      }, Actual=${dayActualOcc}, Modified=${dayModifiedOcc.toFixed(2)}`
    );
  });

print("\n=== HOURLY PATTERNS ===");
const hourlyData = Array(24)
  .fill()
  .map(() => ({ entries: 0, exits: 0 }));

logRecords.forEach((record) => {
  const hour = record.time.getUTCHours();
  hourlyData[hour].entries += record.entries;
  hourlyData[hour].exits += record.exits;
});

hourlyData.forEach((data, hour) => {
  if (data.entries > 0 || data.exits > 0) {
    print(
      `Hour ${hour}: Entries=${data.entries}, Exits=${data.exits}, Net=${
        data.entries - data.exits
      }`
    );
  }
});

const aggregationResult = db.logs
  .aggregate([
    {
      $match: {
        gym: gymName,
        time: { $gte: startDate },
        notes: { $exists: false },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$time" },
          month: { $month: "$time" },
          day: { $dayOfMonth: "$time" },
        },
        totalEntries: { $sum: "$entries" },
        totalExits: { $sum: "$exits" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
    },
  ])
  .toArray();

print("\n=== AGGREGATION RESULTS ===");
aggregationResult.forEach((result) => {
  const actualOcc = result.totalEntries - result.totalExits;
  const modifiedOcc = result.totalEntries - result.totalExits * exitPercentage;

  print(
    `${result._id.year}-${result._id.month}-${result._id.day}: Entries=${
      result.totalEntries
    }, Exits=${
      result.totalExits
    }, Actual=${actualOcc}, Modified=${modifiedOcc.toFixed(2)}`
  );
});
