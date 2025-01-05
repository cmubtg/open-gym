

const FacilityDetailInfo = ({facility}) => {
  return (
    <div className="btg_container flex justify-between 
    mt-2 lg:mt-8
    flex-col md:flex-row">
      <div className="flex flex-col w-auto h-full">
        <h1>{facility.name}</h1>
        <p className="">{facility.description}</p>
      </div>
      <FacilityDetailHours facility={facility}/>
    </div>
  );
};

const FacilityDetailHours = ({facility}) => {
  const convHoursToStr = (hours) => {
    const openHrs = hours.open.toLocaleTimeString("en-US", 
      {hour: "2-digit", minute: "2-digit"})
    const closedHrs = hours.close.toLocaleTimeString("en-US", 
    {hour: "2-digit", minute: "2-digit"})
    return `${openHrs} - ${closedHrs}`
  }

  const weekdayHours = facility.hours[0]
  const weekendHours = facility.hours[6]

  return (
    <div className="w-auto h-fit mt-4">
      <h3>Operating Hours</h3>

      <div className="flex flex-row mt-2 justify-between space-x-2">
        <div>
          <p className="">Monday - Friday:</p>
          <p className="">Saturday & Sunday:</p>
        </div>
        <div >
          <p className="font-light">{convHoursToStr(weekdayHours)}</p>
          <p className="font-light">{convHoursToStr(weekendHours)}</p>
        </div>
      </div>
    </div>
  );
}

export default FacilityDetailInfo;