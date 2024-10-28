import Navigation from "../components/Navigation";
import MapApi from "../components/MapApi";
import MapHeader from "../components/MapHeader";

const Map = () => {
  return (
    <div>
      <MapHeader />
      <MapApi />
      <Navigation />
    </div>
  );
};

export default Map;
