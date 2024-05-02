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
    })
})

