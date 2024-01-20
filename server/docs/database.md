## Database Documentation

MongoDB is the document-oriented database program that OpenGym used to store timestamps and the occupancy of specified gyms and information relating to a gym.

### Data Access Layer

The database is OpenGym's data access layer. All interactions with database must be done through functions in the database interface in ```server/src/models/database.interface.ts```. Why? Accessing the database through this API will prevent the database implementation from being exposed to the rest of the application. 

Append to the database API by adding the function to the database interface and implementing the function in the ```db``` object.

### Structure

MongoDB stores data as **documents** and documents are grouped into **collections**. A document can be though of as a JavaScript object and there ```key: value``` pairs in that object are called **columns**. A collection can have a defined document schema which defines expected data format of the documents.

Current defined collections ```metadata```, ```cohonFC```, ```tepperFC```, ```wiegand```, and ```fairfax```. ```metadata``` contains static information about the gyms we are tracking. All the other collections contain information about the occupancy about it's corresponding gym.

#### Metadata Schema
```JavaScript
{
  collectionName: String,
  name: String,
  description: String,
  maxOccupancy: Number, 
  hours: {
    sunday: {
      open: String,
      close: String,
    },
    monday: {
      open: String,
      close: String,
    },
    tuesday: {
      open: String,
      close: String,
    },
    wednesday: {
      open: String,
      close: String,
    },
    thursday: {
      open: String,
      close: String,
    },
    friday: {
      open: String,
      close: String,
    },
    saturday: {
      open: String,
      close: String,
    }
  }
}
```

Although metadata static in sense the server won't dynamically update the data. Metadata will be updated through to Mongodb UI to reflect any changes the gym information such the week's gym schedule.

#### Gym Schema
```JavaScript
{
  time: Date,
  occupancy: Number,
  // TODO Add model input (boolean flags etc)
}
```

The gym schema is likely to be updated to hold addition information about the day such as weather or if it is a holiday to be provided to the ML model.

### Size Limit

idk

### Adding Locations

Additional locations must be stored in their own collections. The collection must be manually created from the Mongodb UI.

### Future Planning

#### Granulating Past Data

Occupancy added to the database every 3 minutes. However the occupancy data will be granulated into storing the average occupancy for the entire hour. Why? We want to compress the amount of data stored in the database and we currently only support analytics by the hour.

#### Caching Model Prediction

We are training an ML model to make predictions on the occupancy of the gym. In our current ideation requests to the backend will be made directly to the ML model. 

However if this is proven to be too costly the ML model predictions will be cached in the database. With the database caching the ML prediction once the model is re-trained we must clear the cache. If a request results in a cache miss, we directly query the ML model and add the prediction to the cache. Once on future prediction time has pasted that cached data will flushed.