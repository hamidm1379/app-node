const moment = require('moment-jalaali');
const { validationResult } = require('express-validator');
const Cate = require('../models/categorys');
const User = require('../models/users');
const Product = require('../models/product');
const slider = require("../models/slider");

//moment-jalali
function data(time) {
    return moment(time)
}
//switAlert
function alert(req, data) {
    let title = data.title || '',
        text = data.text || '',
        icon = data.icon || 'info',
        timer = data.timer || 2000

    req.flash('sweetalert', { title, text, icon, timer });
}

exports.getIndex = async (req, res, next) => {
    res.render('./admin/index')
}

exports.getUser = async (req, res, next) => {
    let users = await User.find({})
    res.render('./admin/users', {
        users,
        data: data
    })
}

exports.editUser = async (req, res, next) => {
    await User.updateOne({ _id: req.params.id }, { $set: req.body })
    alert(req, {
        title: 'با موفقیت',
        text: 'با موفقیت ویرایش شد',
        icon: 'success'
    })
    return res.redirect('/admin/users')
}
exports.delUser = async (req, res, next) => {
    await User.deleteOne({ _id: req.params.id })
    alert(req, {
        title: 'با موفقیت',
        text: 'با موفقیت حذف شد',
        icon: 'success'
    })
    return res.redirect('/admin/users')
}
exports.getProducts = async (req, res, next) => {
    let cate = await Cate.find({});
    let product = await Product.find({});

    res.render('./admin/products', {
        error: req.flash('error'),
        massage: req.flash('massage'),
        cate,
        product
    })
}
exports.postProducts = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let myError = errors.array().map(err => err.msg);
        req.flash("error", myError);
        alert(req, {
            title: 'دقت کنید',
            text: myError,
            icon: 'error'
        })
        return res.redirect('/admin/products')
    }
    let newCate = new Cate({
        cate: req.body.cate
    })
    await newCate.save()
    alert(req, {
        title: ' موفقیت آمیز',
        text: 'دسته بندی با موفقیت ذخیره شد',
        icon: 'success'
    })
    res.redirect('/admin/products');
}
exports.postProductsAdd = async (req, res, next) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let myError = errors.array().map(err => err.msg);
            req.flash("error", myError);
            alert(req, {
                title: 'دقت کنید',
                text: 'تمام فیلدها را کامل کنید',
                icon: 'error'
            })
            console.log('erorrr')
            return res.redirect('/admin/products')
        }
        if (req.file) {
            var data = req.file.path.replace(/\\/g, '/').substring(6)
        }

        let newProduct = new Product({
            name: req.body.name,
            des: req.body.des,
            price: req.body.price,
            img: data,
            category: req.body.category
        })
        await newProduct.save()
        alert(req, {
            title: 'موفقیت آمیز',
            text: 'با موفقیت ذخیره شد',
            icon: 'success'
        })
        res.redirect('/admin/products');
    } catch (error) {
        console.log(error)
    }
}
exports.getSlider = (req, res, next) => {
    res.render('./admin/sldier')
}
exports.postSlider = async (req, res, next) => {
    try {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            let myError = errors.array().map(err => err.msg)
            alert(req, {
                title: 'دقت کنید',
                text: myError,
                icon: 'error'
            })
            console.log(req.body)
            return res.redirect('/admin/slider')
        }
        console.log('HELLO')
        if (req.file) {
            var data = req.file.path.replace(/\\/g, '/').substring(6)
        }
        let newSlider = new slider({
            name: req.body.name,
            title: req.body.title,
            url: req.body.url,
            imageSlider: data
        })
        await newSlider.save()
        alert(req, {
            title: 'با موفقیت',
            text: '',
            icon: 'success'
        })
        res.redirect('/admin/slider')
    } catch (error) {
        next(error)
    }
}