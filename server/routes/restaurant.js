/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */
const restaurantController = require('../controllers/restaurantController');

/*
    @param req: request object
    @param res: response object
    function searchRestaurants: service that returns the restaurants based on parameters
*/
const searchRestaurants = (req, res) => {
    try {
        const country = parseInt(req.query.country, 10);
        const max = parseInt(req.query.max || 50, 10);
        const offset = parseInt(req.query.offset || 0, 10);
        const fields = req.query.fields || 'name,topCategories,rating,ratingScore,logo,deliveryTimeMaxMinutes,link,opened,coordinates';
        const point = req.query.point.split(',');

        if (typeof country !== 'number' || isNaN(country) || country < 0) throw new Error('Invalid country');
        if (typeof max !== 'number' || isNaN(max) || max < 0) throw new Error('Invalid max');
        if (typeof offset !== 'number' || isNaN(offset) || offset < 0) throw new Error('Invalid offset');
        if (typeof fields !== 'string') throw new Error('Invalid offset');
        if (!Array.isArray(point) || point.length !== 2) throw new Error('Invalid point');

        restaurantController.search(country, point, max, offset, fields)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                console.log(error.message);
                res.status(500).send(error.message);
            })
        ;
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
};

/*
Route of searchRestaurants service
Example of use:
    method: GET
    url: "http://localhost:3000/restaurant/search?country=1&point=1,1"
*/
router.get("/search", searchRestaurants);

module.exports = router;