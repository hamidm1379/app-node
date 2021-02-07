const passport = require('passport');
const { validationResult } = require('express-validator');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const options = { 'hl': 'fa' };
const recaptcha = new Recaptcha('6Lfb9fwZAAAAAP66zF1F0IQYgyt1WMIVxbMMfVVx', '6Lfb9fwZAAAAAMaQ92uIEIwKBT1jkildkwPgW6EP', options);
const Product = require('../models/product');

exports.getIndex = async (req, res, next) => {
    let product = await Product.find({});
    res.render('./clint/index', {
        title: 'صفحه اصلی',
        product
    })
}
exports.getSignUp = (req, res, next) => {
    res.render('./clint/signup', {
        title: 'ثبت نام',
        error: req.flash('error'),
        recaptcha: recaptcha.render()
    })
}
exports.postSignUp = async (req, res, next) => {
    try {
        let recaptchaResult = await new Promise((resolve, reject) => {
            recaptcha.verify(req, (err, data) => {
                if (err) {
                    req.flash('error', 'تیک گزینه امنیتی را بزنید')
                    res.redirect('/signup')
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
        if (!recaptchaResult) {
            return;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let myErrors = errors.array().map(err => err.msg);
            req.flash("error", myErrors);
            return res.redirect("/signup");
        }
        passport.authenticate('local.signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
        })(req, res, next)
    } catch (err) {
        next(err);
    }
}

exports.getLogin = (req, res, next) => {
    res.render('./clint/login', {
        title: 'ورود',
        error: req.flash('error'),
        recaptcha: recaptcha.render()
    })
}
exports.postLogin = async (req, res, next) => {
    try {
        let recaptchaResult = await new Promise((resolve, reject) => {
            recaptcha.verify(req, (err, data) => {
                if (err) {
                    req.flash('error', 'تیک گزینه امنیتی را بزنید')
                    res.redirect('/login')
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
        if (!recaptchaResult) {
            return;
        }
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let myError = errors.array().map(err => err.msg)
            req.flash('error', myError)
            res.redirect('/login')
        }
        passport.authenticate('local.login', (err, user) => {
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, err => {
                return res.redirect('/');
            })
        })(req, res, next)
    } catch (error) {
        next(err);
    }
}

