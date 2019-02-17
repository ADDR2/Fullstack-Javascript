/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */
const initController = require('../controllers/initController');
const adminController = require('../controllers/adminController');

/*
    @param req: request object
    @param res: response object
    function changeTimer: service that changes the default time to not request restaurants
*/
const changeTimer = (req, res) => {
    try {
        const { time } = req.body;
        if (typeof time !== 'number' || isNaN(time)) throw new Error('Not valid time');

        initController.baseTime = time;
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
};

/*
    @param req: request object
    @param res: response object
    function getStatistics: service that returns the users logged in and all the searchs
*/
const getStatistics = (_, res) => {
    try {
        adminController.getStatistics()
            .then(response => {
                res.status(200).send(response);
            })
            .catch(() => res.status(500).send('Something went wrong :/'))
        ;
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
};

/*
Route of changeTimer service
Example of use:
    method: POST
    url: "http://localhost:3000/admin/change-timer"
    body: { time: 5000 }
    That changes the time to 5 seconds
*/
router.post("/change-timer", changeTimer);

/*
Route of getStatistics service
Example of use:
    method: GET
    url: "http://localhost:3000/admin/statistics"
*/
router.get("/statistics", getStatistics);

module.exports = router;