import axios from "axios";
const baseURL = "http://localhost:3001/api/v1/restaurants";

export default axios.create({
    baseURL,
});