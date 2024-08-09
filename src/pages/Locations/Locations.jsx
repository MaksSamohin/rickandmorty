import Nav from "../../components/Nav/Nav";
import "./Locations.css";
import TopPanelLocations from "../../components/TopPanelLocations/TopPanelLocations";
import Footer from "../../components/Footer/Footer";
import LocationsList from "../../components/LocationsList/LocationsList";

function Locations() {
  return (
    <>
      <Nav />
      <TopPanelLocations />
      <LocationsList />
      <Footer />
    </>
  );
}

export default Locations;
