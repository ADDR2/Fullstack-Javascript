/* Local libraries */
import AXIOS from "initServices";

export const getNearRestaurants = (point, country) => {
    return AXIOS.get(`restaurant/search?country=${country}&point=${point}`);
};