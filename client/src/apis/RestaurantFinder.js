import axios from "axios";

// NODE_ENV = 'development';
// NODE_ENV = 'production';



// const baseURL = "http://localhost:3001/api/v1/restaurants";

const baseURL = process.env.NODE_ENV === 'production' 
    ? "api/v1/restaurants" 
    : "https://mindlark.org/api/v1/restaurants";

export default axios.create({
    baseURL,
});