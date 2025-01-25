## Database Documentation

MongoDB is the document-oriented database program that OpenGym used to store timestamps and the occupancy of specified gyms and information relating to a gym.

### Data Access Layer

The database is OpenGym's data access layer. All interactions with database must be done through functions in the database interface in ```server/src/models/database-interface.ts```. Why? Accessing the database through this API will prevent the database implementation from being exposed to the rest of the application. 

Append to the database API by adding the function to the database interface and implementing the function in the ```db``` object.

### Structure

MongoDB stores data as **documents** and documents are grouped into **collections**. A document can be though of as a JavaScript object and there ```key: value``` pairs in that object are called **columns**. A collection can have a defined document schema which defines expected data format of the documents.

Current defined collections ```current```, ```aggregate```, ```forecast```, ```gymHours```, ```logRecords``` and ```sessions```. ```current```, ```aggregate``` and ```forecast``` are collections that store occupancies.

```logRecords``` contains the entries and exists ours data collection mechanism detected within the mechanism defined time interval.
```current``` contains records of gym occupancy stored every 5 minutes for the current day.
```aggregate``` contains past records of gym occupancy, aggregated over an hour, (not data of the current day).
```forecast``` contains records of predicted gym occupancies.
```gymHours``` contains manually adjusted special hours for each facility.
```sessions``` contains users cookie sessions, TTL of 1 day.

#### Occupancy Schema
```JavaScript
{
  gym: String,
  time: Date,
  occupancy: Number,
}
```

```current```, ```aggregate``` and ```forecast``` follow the occupancy schema.

#### Gym Hour Schema

**TODO**

#### Log Records Schema
```JavaScript
{
  gym: String,
  time: Date,
  entries: Number,
  exits: Number,
}
```

#### Sessions Schema
```JavaScript
{
  expires: Date,
  session: String,
}
```

Note: This schema is not defined by code.

### Size Limit

idk

### Future Planning

#### Granulating Past Data

Occupancy added to the database every 3 minutes. However the occupancy data will be granulated into storing the average occupancy for the entire hour. Why? We want to compress the amount of data stored in the database and we currently only support analytics by the hour.

#### Caching Model Prediction

We are training an ML model to make predictions on the occupancy of the gym. In our current ideation requests to the backend will be made directly to the ML model. 

However if this is proven to be too costly the ML model predictions will be cached in the database. With the database caching the ML prediction once the model is re-trained we must clear the cache. If a request results in a cache miss, we directly query the ML model and add the prediction to the cache. Once on future prediction time has pasted that cached data will flushed.