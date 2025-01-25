## Routes Documentation

In a web application, routing is the mechanism that determines how the application responds to a client request to a particular endpoint (URL). Routes map specific URLs to controller actions.

### API URL
```https://backend-url/api``` hits the server's API

### Metadata
Get ```https://backend-url/api/metadata```
```JavaScript
[
  {
    name: String,
    description: String,
    maxOccupancy: Number, 
    hours: {
      ...
    }
  }...
]
```
Get ```https://backend-url/api/metadata/:gym```
```JavaScript
{
  name: String,
  description: String,
  maxOccupancy: Number, 
  hours: {
    ...
  }
}
```
### Occupancy Data
Get ```https://backend-url/api```
```JavaScript
[
  {
    gym: String,
    time: Date,
    occupancy: Number,
  }...
]
```
Get ```https://backend-url/api/:gym```
```JavaScript
[
  {
    gym: String,
    time: Date,
    occupancy: Number,
  }...
]
```
Get ```https://backend-url/api/occupancy```
```JavaScript
[
  {
    gym: String,
    time: Date,
    occupancy: Number,
  }
]
```
Get ```https://backend-url/api/occupancy/:gym```
```JavaScript
{
  occupancy: Number
}
```
Get ```https://backend-url/api/occupancy/:gym/:timestamp```
```JavaScript
{
  occupancy: Number
}
```
Post ```https://backend-url/api/:gym```
```JavaScript
{
  time: Date,
  occupancy: Number
}
```