/* 3rd party libraries */
const { create, get } = require('axios');
const Emitter = require('events');

class InitController extends Emitter {
    constructor() {
        super();

        this.clientId = process.env.clientId || 'test';
        this.clientSecret = process.env.clientSecret || 'PeY@@Tr1v1@943';
        this.baseURL = process.env.baseURL || 'http://stg-api.pedidosya.com/public/v1/';

        get(`${this.baseURL}tokens?clientId=${this.clientId}&clientSecret=${this.clientSecret}`)
            .then(({ data: { access_token } }) => {
                this.access_token = access_token;
                this.AXIOS = create({
                    baseURL: this.baseURL,
                    headers: { 'Authorization': this.access_token }
                });

                this.emit('start');
            })
            .catch(error => {
                try {
                    const { response: { data: { messages } } } = error;
                    console.log(messages);
                } catch(err) {
                    console.log(error);
                } finally {
                    this.emit('end');
                }
            })
        ;
    }
}

module.exports = new InitController();