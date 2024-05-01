const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1NjczNzYyfQ.3O3ksy45sn71X7eqqNIEA8rZnbRiQkq_J7u74MYKlsY'

beforeAll(async () => {
  try {
    const users = require('../users.json')
    users.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    console.log(users, "<=== users");
    await queryInterface.bulkInsert('Users', users)

  } catch (error) {
    console.log(error, "<=== waa error");
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
            name: 'testing1',
            password: '123123',
            role: 'Admin',
          })

        expect(res.status).toBe(201)
        expect(res.body).toBeInstanceOf(Object);
      } catch (error) {
        console.log(error, 'bro');
      }

    });
  })


})