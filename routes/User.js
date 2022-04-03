const {Router} = require('express');
const UserControlles = require('../controllers/User');
const routes = Router();

routes.post('/api/auth/login',UserControlles.signInUser);
routes.post('/api/auth/register',UserControlles.signUpUser);
routes.post('/api/auth/account',UserControlles.getAccount);

module.exports = routes;