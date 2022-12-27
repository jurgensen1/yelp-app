import React from 'react';
import AddResaurant from '../components/AddResaurant';
import Header from '../components/Header';
import RestaurantList from '../components/RestaurantList';

export const Home = () => {
    return (
        <div>
            <Header />
            <AddResaurant />
            <RestaurantList />
        </div>
    );
};
export default Home;