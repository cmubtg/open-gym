## Routes Documentation

In a web application, routing is the mechanism that determines how the application responds to a client request to a particular endpoint (URL). Routes map specific URLs to controller actions.

### API URL
```http://localhost/api/``` hits the server's API

### Metadata
Get ```http://localhost/api/metadata```
```JavaScript
[
  {
    collectionName: String
    name: String,
    description: String,
    maxOccupancy: Number, 
    hours: {
      ...
    }
  }...
]
```
Get ```http://localhost/api/metadata/:gym```
```JavaScript
{
  collectionName: String
  name: String,
  description: String,
  maxOccupancy: Number, 
  hours: {
    ...
  }
}
```

### Occupancy Data
Get ```http://localhost/api/occupancy```
```JavaScript
{
  gym: String
  data: [
    {
      time: Date,
      occupancy: Number
    }...
  ]
}
```
Get ```http://localhost/api/occupancy/:gym```
```JavaScript
{
  time: Date,
  occupancy: Number
}
```
Get ```http://localhost/api/occupancy/:gym/:timestamp```
```JavaScript
{
  occupancy: Number
}
```
Get ```http://localhost/api/:gym```
```JavaScript
[
  {
    time: Date,
    occupancy: Number
  }...
]
```
Post ```http://localhost/api/:gym```
```JavaScript
{
  time: Date,
  occupancy: Number
}
```