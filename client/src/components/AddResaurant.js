import React, {useState} from 'react'
import { useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../App';
const AddResaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name: name,
                location: location,
                price_range: priceRange
            });
            addRestaurants(response.data.data.restaurant);
            console.log(response);
        } catch (err) {}
    };
    return (
        <div className="mb-4">34
            <form action=''>
                <div className="row">
                    <div className="col">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="name"></input>
                    </div>
                    <div className="col">
                        <input value={location} onChange={(e) => setLocation(e.target.value)}  type="text" className="form-control" placeholder="location"></input>
                    </div>
                    <div className="col">
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
                    <div className="col">
                        <button onClick={handleSubmit} className="btn btn-primary col">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddResaurant