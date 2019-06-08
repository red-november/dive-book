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

    it('GET /api/certs/diver/:diverId', async () => {
      const res = await request(app)
        .get('/api/certs/diver/1')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].instructorId).to.equal('harrison123')
    })
  }) //end describe GET routes

  describe('non-GET routes', () => {
    const reqBody = {
      certId: 1,
      provider: 'NAUI',
      instructorId: 'harrison123',
      level: 'Advanced Open Water',
      date: '2015-01-13 19:00:00-05'
    }

    it('PUT /api/certs/:id', async () => {
      const res = await request(app)
        .put('/api/certs/1')
        .send(reqBody)
        .expect(200)

      await Certification.findByPk(1).then(data =>
        expect(data.provider).to.equal('NAUI')
      )
    })

    it('DELETE /api/certs/:id', async () => {
      const res = await request(app)
        .delete('/api/certs/1')
        .expect(200)

      await Certification.findByPk(1).then(data => expect(data).to.equal(null))
    })
  }) //end describe non-GET routes
}) //end describe certification routes
