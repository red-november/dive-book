/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Diver = db.model('diver')

async function before() {
  await db.sync({force: true})
  await Diver.LoadData([
    {
      firstName: 'Fred',
      lastName: 'Astaire',
      email: 'fred@fred.com',
      password: 'dance',
      height: 60,
      weight: 150
    },
    {
      firstName: 'Rocky',
      lastName: 'Raccoon',
      email: 'rocky@fred.com',
      password: 'Gideon',
      height: 40,
      weight: 20
    }
  ])
}

describe('Diver routes', () => {
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
