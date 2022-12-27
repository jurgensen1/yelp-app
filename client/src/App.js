import React, {createContext, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
// import { RestaurantsContextProvider } from './context/RestaurantContext';

export const RestaurantsContext = createContext();

const App = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };
    return (
        // <RestaurantsContextProvider>
        <RestaurantsContext.Provider 
            value={{
                restaurants, 
                setRestaurants, 
                addRestaurants, 
                selectedRestaurant, 
                setSelectedRestaurant
            }}
        >
            <div className="container">
                <Router>
                    <Routes>
                        <Route
                            exact path="/"
                            element={<Home />}
                            // element={Home}
                        />
                        <Route
                            exact path="/restaurants/:id/update"
                            element={<UpdatePage />}
                            // element={UpdatePage}
                        />
                        <Route
                            exact path="/restaurants/:id"
                            element={<RestaurantDetailPage />}
                            // element={RestaurantDetailPage}
                        />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContext.Provider>
        // </RestaurantsContextProvider>
    );
};

export default App;
