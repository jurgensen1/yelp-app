import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../App';



const UpdateRestaurant = (props) => {
    let { id } = useParams();
    if (id === undefined) {
        id = 16;
    }
    const navigate = useNavigate();
    const { restaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`);
            console.log("response: ");
            console.log(response);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        navigate('/');
    }
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        className='form-contol'
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        id="location"
                        className="form-contol"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="form-select my-1 mr-sm-2"
                    >
                        <option disabled>Price Range</option>
                        <option value="1" >$</option>
                        <option value="2" >$$</option>
                        <option value="3" >$$$</option>
                        <option value="4" >$$$$</option>
                        <option value="5" >$$$$$</option>
                    </select>
                </div>
                <div className="form-group">
                    <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateRestaurant