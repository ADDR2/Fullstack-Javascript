/* Local libraries */
const externalHttp = require('../services/externalHttp');
const externalDB = require('../services/externalDB');

class UserController {
    static async login(user, pwd) {
        const access_token = await externalHttp.login(user, pwd);
        await externalDB.userLoggedIn(user, pwd, access_token);
        return access_token;
    }

    static getAccount(access_token) {
        return externalHttp.getAccount(access_token);
    }
}

module.exports = UserController;