
const FacilityDetailCards = ({facility}) => {
    const count = 85
    const occupancy = Math.round((count / 100) * 100)
    return (
      <div className="w-full h-full 
            px-2 lg:px-8 xl:px-14 2xl:px-36
             mt-[-1rem]">
        {/* md:overflow-x-auto xl:overflow-visible  */}
        <div className="carousel w-full overflow-auto p-8 pt-0">
          {/* <div className="carousel_card w-10 shadow-none bg-btg-primary dark:bg-btg-primary-dark"></div> */}
          <div className="carousel_card">
            <div className="h-full flex flex-col justify-between ml-8">
              <p>Busiest Hours On Average</p>
              <h2 className="">5pm-8pm</h2>
              <p>About {count} people, {occupancy}% occupancy</p>
            </div>
          </div>
          <div className="carousel_card">
            <div className="h-full flex flex-col justify-between ml-8">
              <p>Least Busy Hours On Average</p>
              <h2 className="">6:30am-9am</h2>
              <p>About {count} people, {occupancy}% occupancy</p>
            </div>
          </div>
          <div className="carousel_card">
            <div className="h-full flex flex-col justify-between ml-8">
                <p>Least Busy Hours On Average</p>
                <h2>6:30am-9am</h2>
                <p>About {count} people, {occupancy}% occupancy</p>
            </div>
          </div>
          {/* <div className="carousel_card shadow-none bg-btg-primary dark:bg-btg-primary-dark"></div> */}
          {/* <div className="carousel_card w-[50px] bg-btg-primary dark:bg-btg-primary-dark"></div> */}
      </div>
    </div>
    );
  };

  export default FacilityDetailCards;