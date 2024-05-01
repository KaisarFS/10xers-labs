const router = require('express').Router();
const ProductController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);

// Admin Routes
router.use(authorization(['Admin']));
router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

router.use(authorization(['Customer']));
router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductById);

module.exports = router;