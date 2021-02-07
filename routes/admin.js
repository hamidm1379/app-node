const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Cate = require('../models/categorys');
const adminController = require('../controllers/adminController');
const upload = require('../upload/upload-image');
const adminValdator = require('../validators/valdiatorAdmin');

router.use((req, res, next) => {
    res.locals.myalerts = req.flash('sweetalert');
    next()
})

/* index */
router.get('/', isAdmin, adminController.getIndex);

/* users */
router.get('/users', isAdmin, adminController.getUser);
router.put('/users/:id', isAdmin, adminController.editUser);
router.delete('/users/:id', isAdmin, adminController.delUser);

/* products */
router.get('/products', isAdmin, adminController.getProducts);
router.post('/products', isAdmin, adminValdator.cateValdiator(), adminController.postProducts);
router.post('/productsadd', isAdmin, adminValdator.productValidator(), upload.single('img'), adminController.postProductsAdd);

/* slider */
router.get('/slider', isAdmin, adminController.getSlider);
router.post('/slider', isAdmin, adminValdator.sliderValidator(), upload.single('image-slider'), adminController.postSlider);



module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.admin) {
        return next()
    }
    res.redirect('/')
}