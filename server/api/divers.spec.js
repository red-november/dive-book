/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Diver = db.model('diver')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/divers/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Diver.create({
        email: codysEmail
      })
    })

    it('GET /api/divers', async () => {
      const res = await request(app)
        .get('/api/divers')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
