export default class Authentication {
    static storeToken(token) {
        if (typeof token !== 'string' || !token) throw new Error('Invalid token');

        localStorage.setItem('PedidosYa-token', token);
    }

    static isAuthenticated() {
        return !!localStorage.getItem('PedidosYa-token');
    }

    static getToken() {
        return localStorage.getItem('PedidosYa-token');
    }
}