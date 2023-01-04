import axios from "axios";
const baseURL = "http://mindlark.org/api/v1/restaurants";

export default axios.create({
    baseURL,
});
