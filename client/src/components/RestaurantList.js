import React, { useEffect, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../App';
import { useNavigate } from "react-router-dom";
import StarRating from './StarRating';

const RestaurantList = () => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let navigate = useNavigate();

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response);
                // console.log(response.data.data.restaurants);
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [setRestaurants]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await RestaurantFinder.delete(`/${id}`);
        } catch (err) {
            console.log(err);
        }
    };
    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    };

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    };

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return (
                <>
                    <StarRating rating={0} />
                    <span className="text-warning ml-1">(0)</span>
                </>
            )
        }
        return (
            <>
                <StarRating rating={restaurant.average_rating} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )
    }

    return (
        <div className='list list-group'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody className='table-dark'>
                    {restaurants && restaurants.map((restaurant) => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td>
                                    <button onClick={(e) => handleUpdate(e, restaurant.id)} className='btn btn-warning'>Update</button>
                                </td>
                                <td>
                                    <button onClick={(e) => handleDelete(e, restaurant.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                    {/* <tbody className='table-dark'>
                    <tr>
                        <td>mcdonalds</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className='btn btn-warning'>Update</button></td>
                        <td><button className='btn btn-danger'>Delete</button></td>
                    </tr>
                    <tr>
                        <td>mcdonalds</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className='btn btn-warning'>Update</button></td>
                        <td><button className='btn btn-danger'>Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div >
    )
}

export default RestaurantList