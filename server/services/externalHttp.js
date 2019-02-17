/* Local libraries */
const { AXIOS } = require('../controllers/initController');

class ExternalHttp {
    static async login(user, pwd) {
        if (typeof user !== 'string' || !user) throw new Error('Not valid user');
        if (typeof pwd !== 'string' || !pwd) throw new Error('Not valid password');

        try {
            const { data: { access_token } } = await AXIOS.get(`tokens?userName=${user}&password=${pwd}`);
            return access_token;
        } catch(error) {
            throw new Error('Could not authenticate user');
        }
    }

    static async getAccount(access_token) {
        if (typeof access_token !== 'string' || !access_token) throw new Error('Not valid token');

        try {
            const { data } = await AXIOS.get(
                `myAccount`,
                { headers: { 'Authorization': access_token } }
            );
            return data;
        } catch(error) {
            throw new Error('Could not get user account');
        }
    }

    static async searchRestaurants(country, point, max, offset, fields) {
        if (typeof country !== 'number' || isNaN(country) || country < 0) throw new Error('Not valid country');
        if (!Array.isArray(point) || point.length !== 2) throw new Error('Not valid point');

        try {
            const { data } = await AXIOS.get(
                `search/restaurants?country=${country}&point=${point.join()}&max=${max}&offset=${offset}&fields=${fields}`
            );
            return data;
        } catch(error) {
            throw new Error('Could not get restaurants');
        }
    }
}

module.exports = ExternalHttp;