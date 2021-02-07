const passport = require('passport');
const userAd = require('../models/userAdmin');
const User = require('../models/users');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//////////////////
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);
    if (user) done(null, user);
})

passport.use("local.signup", new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {
            let user = await User.findOne({ email: email });
            if (user) {
                return done(null, false, req.flash('error', "چنین کاربری با این ایمیل وجود دارد"));
            }
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(password, 10)
            });

            await newUser.save();
            done(null, newUser);
        } catch (error) {
            return done(error, false, { message: error })
        }
    }
))

passport.use('local.login', new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return done(null, false, req.flash('error', 'اطلاعات شما هماهنگی ندارد'));
            }
            done(null, user);
        } catch (error) {
            return done(error, false, { message: error })
        }

    }))



// passport.use('local.login.admin', new localStrategy(
//     {
//         usernameField: 'name',
//         passwordField: 'password',
//         passReqToCallback: true,
//     }, async (req, name, password, done) => {
//         try {
//             let user = await User.findOne({ name });
//             if (!user || !bcrypt.compareSync(password, user.password)) {
//                 return done(null, false, req.flash('error', 'اطلاعات شما هماهنگی ندارد'));
//             }
//             done(null, user);
//         } catch (error) {
//             return done(error, false, { message: error })
//         }

//     })
// )