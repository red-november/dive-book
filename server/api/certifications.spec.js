const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Diver = db.model('diver')
const Certification = db.model('certification')

async function before() {
  await db.sync({force: true})
  const fred = await Diver.create({
    firstName: 'Fred',
    lastName: 'Astaire',
    email: 'fred@fred.com',
    password: 'dance',
    height: 60,
    weight: 150
  })

  await Certification.create({
    provider: 'PADI',
    instructorId: 'harrison123',
    level: 'Advanced Open Water',
    date: '2015-01-13 19:00:00-05'
  })

  await fred.addCertification(1)
}

describe('certification routes', () => {
  beforeEach(async () => {
    await before()
  })
  describe('GET routes', () => {
    it('GET /api/certs/:id', async () => {
      const res = await request(app)
        .get('/api/certs/1')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.provider).to.equal('PADI')
    })
  }) //end describe GET routes
}) //end describe certification routes
