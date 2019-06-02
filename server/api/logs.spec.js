const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Diver = db.model('diver')
const Log = db.model('log')

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

  await Log.create({
    diveName: `Barracuda Point`,
    location: `Sipadan Island, Malaysia`,
    diverId: 1 /* Fred */,
    timeIn: `08:00:00`,
    timeOut: `09:00:00`,
    date: '12-31-2009',
    maxDepth: 10,
    tankPressureStart: 200,
    tankPressureEnd: 50,
    tankType: `Steel`,
    beltWeight: 5,
    airMixture: `Hydreliox`,
    description: `Best dive ever!!!`,
    wetSuitType: `The Full Wetsuit`,
    wetSuitThickness: 2 /*mm*/,
    hasStrongCurrent: false,
    visibility: 15
  })
}

describe('log routes', () => {
  beforeEach(async () => {
    await before()
  })

  describe('GET routes', () => {
    it('GET /api/logs/', async () => {
      const res = await request(app)
        .get('/api/logs')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].diveName).to.equal('Barracuda Point')
    })
  })
})
