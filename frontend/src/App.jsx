import React, { useState, useEffect } from 'react';

function App() {
  const [occupancy, setOccupancy] = useState(0);

  useEffect(() => {
    const fetchOccupancy = async () => 
    {
      const res = await fetch('/api/occupancy');
      const data = await res.json();
      if (res.ok){
        setOccupancy(data.count);
      }
    }
    fetchOccupancy();
  }, []);

  return (
    <div className="App">
      <h1>Current Occupancy: <span>{occupancy}%</span></h1>
    </div>
  );
}

export default App;
