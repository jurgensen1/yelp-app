import axios from "axios";
const baseURL = "https://mindlark.org/api/v1/restaurants";

export default axios.create({
    baseURL,
});
