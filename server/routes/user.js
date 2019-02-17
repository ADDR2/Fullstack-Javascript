/* 3rd party libraries */
const router = require("express").Router();

/* Local libraries */
const userController = require('../controllers/userController');

/*
    @param req: request object
    @param res: response object
    function login: service that Authenticates a user and returns his/her access_token
*/
const login = (req, res) => {
    try {
        const { userName, password } = req.body;
        if (typeof userName !== 'string' || !userName) throw new Error('Invalid username');
        if (typeof password !== 'string' || !password) throw new Error('Invalid password');

        userController.login(userName, password)
            .then(access_token => {
                res.status(200).send({ access_token });
            })
            .catch(error => {
                console.log(error.message);
                res.status(500).send(error.message);
            })
        ;
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
};

/*
    @param req: request object
    @param res: response object
    function getAccount: service that returns the data of an Authenticated user
*/
const getAccount = (req, res) => {
    try {
        const access_token = req.get('Authorization');
        if (typeof access_token !== 'string' || !access_token) throw new Error('Invalid token');

        userController.getAccount(access_token)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                console.log(error.message);
                res.status(500).send(error.message);
            })
        ;
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
};

/*
Route of login service
Example of use:
    method: POST
    url: "http://localhost:3000/user/login?userName=test_automation_000@pedidosya.com&password=abc1234"
*/
router.post("/login", login);


/*
Route of getAccount service
Example of use:
    method: GET
    url: "http://localhost:3000/user/myAccount"
    set the Authorization header with your token
*/
router.get("/myAccount", getAccount);

module.exports = router;