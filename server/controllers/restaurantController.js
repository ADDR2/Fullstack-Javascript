/* Local libraries */
const externalHttp = require('../services/externalHttp');
const externalDB = require('../services/externalDB');
const initController = require('./initController');

class RestaurantController {
    static async search(country, point, max, offset, fields) {
        let request =  false;
        const pointToPath = point.join().replace(/\./g, '+');
        try {
            const { date, data } = await externalDB.getLastSearchForUser(pointToPath);
            if ( (Date.now() - parseInt(date, 10)) <= initController.baseTime ) {
                console.log('Search already done not long ago :)');
                return data;
            }

            request = true;
        } catch(error) {
            request =  true;
        }

        if(request) {
            const data = await externalHttp.searchRestaurants(country, point, max, offset, fields);

            await externalDB.userSearchedRestaurants(pointToPath, { date: Date.now(), data });
            return data;
        }
    }
}

module.exports = RestaurantController;