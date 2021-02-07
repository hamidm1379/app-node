const express = require('express');
const app = express();
const adminRouter = require('./routes/admin');
const clintRouter = require('./routes/clint');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookiParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const methodeOveride = require('method-override');
mongoose.connect('mongodb://localhost:27017/web-shop', { useNewUrlParser: true, useUnifiedTopology: true });
require('./passport/passport-local');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodeOveride('method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookiParser('iadahdj89qy02e8ycn91ycecn7y12'));
app.use(session({
    secret: 'n8cy379yn479q3y4793b4b374634b6464vb6',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 2) },
})),
    app.use(flash());

//reqire passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/admin', adminRouter);
app.use('/', clintRouter);

app.listen('3000', console.log('runing port 3000'));