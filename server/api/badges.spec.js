/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Diver = db.model('diver')
const Badge = db.model('badge')

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

  await Badge.create({name: 'Aquaman', description: 'dives beyond 30 meters'})

  await fred.addBadge(1)
}

describe('badge routes', () => {
  beforeEach(async () => {
    await before()
  })

  describe('/api/badges/diver/:diverId', () => {
    it('GET /api/badges/diver/:diverId', async () => {
      const res = await request(app)
        .get('/api/badges/diver/1')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.equal('Aquaman')
    })
  })
}) //end describe badge routes
