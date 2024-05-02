const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')

beforeAll(async () => {
  try {
    const users = require('../users.json')
    users.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', users)

  } catch (error) {
    console.error(error);
  }
});

afterAll(async () => {
  await User.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true
  })
})

// USER REGISTER
describe('/users/register -  Register', () => {
  describe("SUCCESS CASE: ", () => {
    it('should return 201 - Register User', async () => {
      try {
        const res = await request(app)
          .post('/users/register')
          .send({
            username: 'testing1',
            password: '123123',
            role: 'Admin',
          })

        expect(res.status).toBe(201)
        expect(res.body).toBeInstanceOf(Object);
      } catch (error) {
        console.error(error);
      }
    });
  })

  describe('FAILED CASE: ', () => {
    it('should return 400 - Fail login Username is required', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          password: '123123'
        })
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toContain('Username is required');
    });
  });

  describe('FAILED CASE: ', () => {
    it('should return 400 - Fail login Password is required', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          username: 'admin1'
        })
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toContain('Password is required');
    });
  });
})

// USER LOGIN
describe('/users/login -  Login', () => {
  describe("SUCCESS CASE: ", () => {
    it('should return 200 - Login User', async () => {
      try {
        const res = await request(app)
          .post('/users/login')
          .send({
            username: "admin1",
            password: "123123",
          })

        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object);
      } catch (error) {
        console.log(error);
      }
    });
  })

  describe('FAILED CASE: ', () => {
    it('should return 400 - Fail login Username is required', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          password: '123123'
        })
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toContain('Username is required');
    });
  });

  describe('FAILED CASE: ', () => {
    it('should return 400 - Fail login Password is required', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          username: 'admin1'
        })
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toContain('Password is required');
    });
  });

  describe('FAILED CASE: ', () => {
    it('should return 404 - Fail login Account not found', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          username: 'xxxxx',
          password: '123123'
        })
      expect(res.status).toBe(404)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toContain('Account not found');
    });
  });
})