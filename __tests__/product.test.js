const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Product } = require('../models')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE0NjIxMDk5fQ.IqvMHq3zqO_rJcWfdx0IVc0mWvV5H-0nqP88IgMCiyE'


beforeAll(async () => {
    try {
        let products = require('../products.json')
        products.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Products', products)

    } catch (error) {
        console.error(error);
    }
});

afterAll(async () => {
    await Product.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


// PRODUCT
describe('/products -  CRUD', () => {
    describe('SUCCESS CASE: ', () => {
        it('should return 200 - GET products', async () => {
            const res = await request(app).get('/products').set("access_token", access_token)

            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('description')
            expect(res.body[0]).toHaveProperty('price')
            expect(res.body[0]).toHaveProperty('stock')
        })

        it('should return 200 - GET product By Id', async () => {
            const res = await request(app).get('/products/2').set("access_token", access_token)

            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('stock')
        })

        it('should return 200 - GET product By query', async () => {
            const res = await request(app).get('/products?query=din').set("access_token", access_token)

            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body[0]).toHaveProperty('name')
        })

        it('should return 200 - DELETE product By Id', async () => {
            const res = await request(app)
                .delete('/products/1')
                .set("access_token", access_token)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 201 - POST product', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toBe('Product has been created');
        });

        it('should return 200 - PUT product', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    name: 'test2',
                    description: 'test2',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object);
            // expect(res.body).toHaveProperty('message');
            // expect(res.body.message).toBe('Product has been updated successfully');
        });
    })

    describe('FAILED CASE: ', () => {
        it('should return 401 - GET Product - Invalid token', async () => {
            const res = await request(app)
                .get('/products')
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - GET products By Id - Data not found', async () => {
            const res = await request(app).get('/products/999').set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 500 - GET products By Id - Internal Server Error', async () => {
            const res = await request(app).get('/products/xx').set("access_token", access_token)

            expect(res.status).toBe(500)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - POST product - empty product name', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    id: 5,
                    // name: 'test',
                    description: 'test',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Name is required');
        });

        it('should return 400 - POST product - empty product name', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    description: 'test',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Name is required');
        });

        it('should return 400 - POST product - empty description', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Description is required');
        });

        it('should return 400 - POST product - empty price', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    stock: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Price is required');
        });

        it('should return 400 - POST product - empty stock', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    price: 1200,
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Stock is required');
        });

        it('should return 400 - PUT product - empty name', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    // name: 'test',
                    description: 'test',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            // expect(res.body.message).toContain('Category Id is required');
        });

        it('should return 400 - PUT product - empty description', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    // description: 'test',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Description is required');
        });

        it('should return 400 - PUT product - empty price', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    // price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Price is required');
        });

        it('should return 400 - PUT product - empty stock', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    price: 1200,
                    // stock: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Stock is required');
        });

        it('should return 404 - PUT product - Data not found', async () => {
            const res = await request(app)
                .put('/products/999')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Data not found');
        });

        it('should return 500 - PUT product - Internal Server Error', async () => {
            const res = await request(app)
                .put('/products/xxx')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    price: 1200,
                    stock: 1
                })
            expect(res.status).toBe(500)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Internal Server Error');
        });

        it('should return 404 - DELETE products By Id - Data not found', async () => {
            const res = await request(app).delete('/products/999').set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 500 - DELETE products By Id - Internal Server Error', async () => {
            const res = await request(app).delete('/products/xx').set("access_token", access_token)

            expect(res.status).toBe(500)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })
    })
})

