/* Local libraries */
const externalHttp = require('../services/externalHttp');

class RestaurantController {
    static search(...params) {
        return externalHttp.searchRestaurants(...params);
    }
}

module.exports = RestaurantController;