/* Local libraries */
const { firebase } = require('../controllers/initController');

class ExternalDB {
    static userLoggedIn(username, pwd, access_token) {
        return firebase.ref(`users/${username.replace(/\./g, '+')}__${pwd}`).set({
            access_token
        });
    }

    static userSearchedRestaurants(point, data) {
        return firebase.ref(`searchs/${point}`).set(data);
    }

    static getLastSearchForUser(point) {
        return new Promise((resolve, reject) => {
            firebase.ref(`searchs/${point}`).once('value', snapshot => {
                try {
                    if (!snapshot.exists() || !snapshot.val())
                        reject('Not found');
                    else
                        resolve(snapshot.val());
                } catch(error) {
                    reject(error);
                }
            });
        });
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
            firebase.ref('users').once('value', snapshot => {
                if (snapshot.exists() && snapshot.val()) {
                    try {
                        resolve(
                            Object.entries(snapshot.val()).map(([ key, value ]) => {
                                return {
                                    key: key.replace(/\+/g, '.'),
                                    value
                                };
                            })
                        );
                    } catch(error) {
                        reject(error);
                    }
                } else reject('Not found');
            });
        });
    }

    static getSearchs() {
        return new Promise((resolve, reject) => {
            firebase.ref('searchs').once('value', snapshot => {
                if (snapshot.exists() && snapshot.val()) {
                    try {
                        resolve(
                            Object.entries(snapshot.val()).map(([ key, value ]) => ({
                                key: key.replace(/\+/g, '.'),
                                value
                            }))
                        );
                    } catch(error) {
                        reject(error);
                    }
                } else reject('Not found');
            });
        });
    }
}

module.exports = ExternalDB;