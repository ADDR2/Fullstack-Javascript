/* 3rd party libraries */
const { create, get } = require('axios');
const Emitter = require('events');
const { initializeApp } = require('firebase');

class InitController extends Emitter {
    constructor() {
        super();

        this.clientId = process.env.clientId || 'test';
        this.clientSecret = process.env.clientSecret || 'PeY@@Tr1v1@943';
        this.baseURL = process.env.baseURL || 'http://stg-api.pedidosya.com/public/v1/';
        this.baseTime = 60 * 1000;

        this.connectToFirebase() && this.connectToExternalServer();
    }

    connectToExternalServer() {
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

    connectToFirebase() {
        try {
            this.firebase = initializeApp({
                apiKey: "<YOUR_KEY>",
                authDomain: "<YOUR_KEY>",
                databaseURL: "<YOUR_KEY>",
                projectId: "<YOUR_KEY>",
                storageBucket: "<YOUR_KEY>",
                messagingSenderId: "<YOUR_KEY>"
            }).database();
            console.log('Connected to Firebase :)');
            return true;
        } catch(error) {
            this.emit('end');
            return false;
        }
    }
}

module.exports = new InitController();