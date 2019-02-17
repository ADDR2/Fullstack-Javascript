/* Local libraries */
const externalDB = require('../services/externalDB');

class AdminController {
    static async getStatistics() {
        const users = await externalDB.getUsers();
        const searchs = await externalDB.getSearchs();
        return { users, searchs };
    }
}

module.exports = AdminController;