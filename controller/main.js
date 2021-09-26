const RouteGuard = require('../utils/validation');
const Register = require('./sigin/register');
const router = require('express').Router();
const login = require('./sigin/login');
const logout=require('./sigin/logout')
const to_do_app = require('./to-do_controller/to-do_controller');
// const { logout } = require('./sigin/logout');



//register api
router.route('/register').post(Register.register);

//login api

router.route('/login').post(login.login);
router.route('/login_token').get(RouteGuard,login.login_token);

router.route('/logout').delete(RouteGuard,logout.logout)

// to_do api

router.route('/create').post(RouteGuard,to_do_app.create);
router.route('/getall').get(RouteGuard,to_do_app.getAll);
router.route('/getByid').get(RouteGuard,to_do_app.getID);
router.route('/delete/:id').delete(RouteGuard,to_do_app.delete);
router.route('/create/:id').post(RouteGuard,to_do_app.createClone);
router.route('/put/:id').put(RouteGuard,to_do_app.update);
router.route('/logout').post(RouteGuard,to_do_app.logout);
module.exports = router;