import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../App';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';

const RestaurantDetailPage = () => {
    let { id } = useParams();

    // let id = 14;
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
    if (id == undefined) {
        id = 16;
    }
    console.log("id: " + id);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await RestaurantFinder.get(`/${id}`);
                console.log("response:");
                console.log(response);
                setSelectedRestaurant(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <h1 className='text-center'>Restaurant Detail Page</h1>
            {selectedRestaurant 
            ? (
            <>
                <h1 className='text-center display-1'>
                </h1>
                    {selectedRestaurant.restaurant.name}
                <div className='text-center'>
                    <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
                    <span>
                    {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
                    </span>
                </div>
                <div className='mt-3'>
                    <Reviews reviews={selectedRestaurant.reviews}/>
                </div>
                <AddReview />
            </>
                )
            :
            <>
                Failed to Load Data
            </>
            }</div>
        // <div>{selectedRestaurant && selectedRestaurant.name}</div>
    );
};

export default RestaurantDetailPage;