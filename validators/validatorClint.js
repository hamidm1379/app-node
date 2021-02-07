const validator = require('./validator');
const { body } = require('express-validator');

module.exports = new class clintValidator extends validator {
    signUpValidator() {
        return [
            body('name', 'نام نمی تواند خالی باشد').not().isEmpty(),
            body('email', 'ایمیل معتبر نیست').isEmail(),
            body('password', 'پسورد نباید کمتر از 5 کارکتر باشد').isLength({ min: 5 })
        ]
    }
    loginValidator(){
        return [
            body('email', 'ایمیل نباید خالی باشد').not().isEmpty(),
            body('password', 'پسورد نباید کمتر از 5 کارکتر باشد').isLength({ min: 5 })
        ]
    }
}