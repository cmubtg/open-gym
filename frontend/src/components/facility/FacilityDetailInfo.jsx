
const FacilityDetailInfo = ({facility}) => {
    if (facility === null) {
      return (<></>);
    }
    return (
      <div className="btg_container flex justify-between 
      mt-2 lg:mt-8
      flex-col md:flex-row">
        <div className="flex flex-col w-auto h-full">
          <h1>{facility.name}</h1>
          <p className="text-gray-500 w-[90%]">{facility.description}</p>
        </div>
        <FacilityDetailHours facility={facility}/>
      </div>
    );
  };
  
  const FacilityDetailHours = ({facility}) => {
    return (
      <div className="w-52 h-fit mt-4">
        <h3>Operating Hours</h3>
  
        <div className="flex flex-row mt-2 justify-between">
          <div>
            <p className="text-gray-500">Monday - Friday</p>
            <p className="text-gray-500">Saturday & Sunday</p>
          </div>
          <div >
            <p className="font-light">6:30 - 11:30</p>
            <p className="font-light">9:00 - 10:00</p>
          </div>
        </div>
      </div>
    );
  }

  export default FacilityDetailInfo;