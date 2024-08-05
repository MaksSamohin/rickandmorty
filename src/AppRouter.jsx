import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Characters from "./components/pages/Characters/Characters";
import Episodes from "./components/pages/Episodes/Episodes";
import Locations from "./components/pages/Locations/Locations";

function AppRouter() {

    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={<Characters/>}
                    />
                <Route
                    path='/episodes'
                    element={<Episodes/>}/>
                <Route
                    path='/locations'
                    element={<Locations/>}/>
            </Routes>
        </Router>
    )
}

export default AppRouter;