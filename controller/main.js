const RouteGuard = require('../utils/validation');
const Register = require('./sigin/register');
const router = require('express').Router();
const login = require('./sigin/login');
const to_do_app = require('./to-do_controller/to-do_controller');



//register api
router.route('/register').post(Register.register);

//login api

router.route('/login').post(login.login);
router.route('/login_token').get(RouteGuard,login.login_token);

// to_do api

router.route('/create').post(RouteGuard,to_do_app.create);
router.route('/getall').get(RouteGuard,to_do_app.getAll);
router.route('/get/:id').get(RouteGuard,to_do_app.getID);
router.route('/delete/:id').delete(RouteGuard,to_do_app.delete);
router.route('/create/:id').post(RouteGuard,to_do_app.createClone);
router.route('/put/:id').put(RouteGuard,to_do_app.update);

module.exports = router;