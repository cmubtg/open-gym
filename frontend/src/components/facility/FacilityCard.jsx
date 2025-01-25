import { FacilityProvider } from "context/FacilityContext";
import { FacilityCardDisplay, FacilityCardInfo } from "components";

const FacilityCard = ({ facility }) => {
  return (
    <FacilityProvider facility={facility}>
      <div className="w-full h-full">
        <FacilityCardDisplay />
        <FacilityCardInfo />
      </div>
    </FacilityProvider>
  );
};

export default FacilityCard;
