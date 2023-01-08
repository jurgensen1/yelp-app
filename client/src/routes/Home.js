import React from 'react';
import AddResaurant from '../components/AddResaurant';
import Header from '../components/Header';
import RestaurantList from '../components/RestaurantList';
import RestaurantDetailPage from './RestaurantDetailPage';


export const Home = () => {
    return (
        <div>
            <Header />
            <AddResaurant />
            <RestaurantList />
            <RestaurantDetailPage />
        </div>
    );
};
export default Home;