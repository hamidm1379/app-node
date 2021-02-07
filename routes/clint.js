const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');
const clintController = require('../controllers/clintController');
const userValidator=require('../validators/validatorClint');


router.use((req, res, next) => {
    res.locals.login = req.isAuthenticated()
    res.locals.myUser=req
    next()
})
//index page
router.get('/', clintController.getIndex)

//logout
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/')
})

//signup page
router.get('/signup', notLoggedIn,clintController.getSignUp);
router.post('/signup',userValidator.signUpValidator() , clintController.postSignUp)


//login page
router.get('/login', notLoggedIn,clintController.getLogin);
router.post('/login', userValidator.loginValidator(), clintController.postLogin);

//myProfile page
router.get('/myprofile', isLoggedIn, (req, res, next) => {
    res.render('./clint/myprofile', {
        title: 'پنل کاربری'
    })
})



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}
