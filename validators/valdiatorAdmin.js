const validator = require('./validator');
const { body } = require('express-validator');

module.exports = new class adminValdator extends validator {
    cateValdiator() {
        return [
            body('cate', 'فیلد دسته بندی نمی تواند خالی باشد').not().isEmpty(),
        ]
    }
    productValidator() {
        return [
            body('name', 'نام نمی تواند خالی باشد').not().isEmpty(),
            body('price', 'فیلد قیمت نمی تواند خالی باشد').notEmpty(),
            body('category', 'دسته بندی را انتخاب کنید').notEmpty(),
            body('des', 'توضیحات محصول رابنویسید').notEmpty()
        ]
    }
    sliderValidator(){
        return [
            body('name', 'نام نمی تواند خالی باشد').not().isEmpty(),
            body('url','آدرس را وارد کنید').notEmpty(),
            body('image-slider','یک تصویر آپلود کنید').notEmpty()
        ]
    }
}