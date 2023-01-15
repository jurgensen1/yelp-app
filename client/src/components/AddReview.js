import React, { useCallback, useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../App';


const AddReview = () => {
    let { id } = useParams();

    const [name, setName] = useState('');
    const [rating, setRating] = useState('Rating');
    const [reviewText, setReviewText] = useState('');
    
    const {setSelectedRestaurant } = useContext(RestaurantsContext);
    // let id = 14;
    if (id == undefined) {
        id = 16;
    }
    const handleSubmitReview = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name: name,
                review: reviewText,
                rating: rating
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }, [name, reviewText, rating, id]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                setSelectedRestaurant(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='mb-2'>
            <form action=''>
                <div className="row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            className='form-contol'
                            placeholder='name'
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="custom-select"
                        >
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        id="Review"
                        className='form-contol'
                    >
                    </textarea>
                </div>
                <button
                    type="submit"
                    className='btn btn-primary'
                    onClick={handleSubmitReview}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddReview