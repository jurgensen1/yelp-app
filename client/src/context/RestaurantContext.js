import React, { createContext, useState } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
    const [restauants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelecetedRestaurants] = useState([]);

    return (
        <RestaurantsContext.Provider value={{restauants, setRestaurants, selectedRestaurant}}>
            {props.childern}
        </RestaurantsContext.Provider>
        );
};