import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./pages/Characters/Characters";
import Episodes from "./pages/Episodes/Episodes";
import Locations from "./pages/Locations/Locations";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetails";
import LocationDetails from "./pages/LocationDetails/LocationDetails";
import EpisodeDetails from "./pages/EpisodeDetails/EpisodeDetails";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/character/:id" element={<CharacterDetails />}></Route>
        <Route path="/location/:id" element={<LocationDetails />}></Route>
        <Route path="/episode/:id" element={<EpisodeDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
