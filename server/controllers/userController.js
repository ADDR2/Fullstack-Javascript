/* Local libraries */
const externalHttp = require('../services/externalHttp');

class UserController {
    static login(user, pwd) {
        return externalHttp.login(user, pwd);
    }

    static getAccount(access_token) {
        return externalHttp.getAccount(access_token);
    }
}

module.exports = UserController;