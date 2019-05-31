/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const Sighting = db.model('sighting')
const Diver = db.model('diver')
const Observation = db.model('observation')
const Log = db.model('log')

async function beforeAdd() {
  await db.sync({force: true})
  await Diver.create({
    email: 'cody@puppybook.com',
    password: 'bones'
  })
  await Log.create({
    diveName: "Harrison's cove",
    timeIn: '08:00:00',
    timeOut: '09:00:00',
    date: '2015-01-13 19:00:00-05',
    location: 'Cairns, Australia',
    maxDepth: 19,
    tankPressureStart: 190,
    tankPressureEnd: 30,
    beltWeight: 4,
    visibility: 20,
    diverId: 1
  })

  await Observation.create({
    name: 'Nudibranch',
    category: 'mollusks',
    color: 'blue'
  })

  await Observation.create({
    name: 'Barrel Sponge',
    category: 'fish',
    color: 'yellow'
  })
}

describe('sighting class methods', () => {
  before(async () => {
    await beforeAdd()
    await Sighting.addBulk([
      {logId: 1, observationId: 2},
      {logId: 1, observationId: 1}
    ])
  })
  describe('addBulk', () => {
    it('adds observations in bulk', () => {
      return Sighting.findAll({
        where: {
          logId: 1
        }
      }).then(data => expect(data.length).to.equal(2))
    })
  }) // end describe addBulk

  describe('destroyBulk', () => {
    before(async () => {
      await Sighting.destroyBulk([
        {logId: 1, observationId: 2},
        {logId: 1, observationId: 1}
      ])
    })
    it('removes observations in bulk', () => {
      return Sighting.findOne({
        where: {
          observationId: 2
        }
      }).then(data => expect(data).to.equal(null))
    })
  }) //end describe destroyBulk
}) //end describe class methods
