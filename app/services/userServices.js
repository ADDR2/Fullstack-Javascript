/* Local libraries */
import AXIOS from "initServices";
import Authentication from "Authentication";

export const login = (userName, password) => {
    return AXIOS.post('user/login', {
        userName,
        password
    });
};

export const getAccount = () => {
    return AXIOS.get('user/myAccount', {
        headers: { 'Authorization': Authentication.getToken() }
    });
};