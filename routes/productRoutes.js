const router = require('express').Router();
const ProductController = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductById);

// Admin Routes
router.use(authorization(['Admin']));
router.get('/', ProductController.getAllProduct);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;

// it('should return 404 - GET products By Id - Data not found', async () => {
//   const res = await request(app).get('/products/999').set("access_token", access_token)

//   expect(res.status).toBe(404)
//   expect(res.body).toBeInstanceOf(Object)
//   expect(res.body).toHaveProperty('message')
// })

// it('should return 400 - POST product - empty product name', async () => {
//   const res = await request(app)
//       .post('/products')
//       .set("access_token", access_token)
//       .send({
//           // name: 'test',
//           description: 'test',
//           imgUrl: 'test',
//           price: 10000,
//       })
//   expect(res.status).toBe(400)
//   expect(res.body).toBeInstanceOf(Object);
//   expect(res.body.message).toContain('Product Name is required');
// });

// it('should return 404 - PUT product By Id - Data not found', async () => {
//   const res = await request(app).put('/products/999').set("access_token", access_token)

//   expect(res.status).toBe(404)
//   expect(res.body).toBeInstanceOf(Object)
//   expect(res.body).toHaveProperty('message')
// })

// it('should return 404 - DELETE products By Id - Data not found', async () => {
//   const res = await request(app).delete('/products/999').set("access_token", access_token)

//   expect(res.status).toBe(404)
//   expect(res.body).toBeInstanceOf(Object)
//   expect(res.body).toHaveProperty('message')
// })