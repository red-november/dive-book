/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {
  Log,
  Diver,
  Observation,
  Badge,
  Sighting,
  EarnedBadge
} = require('../models')

async function before() {
  await db.sync({force: true})
  await Diver.create({
    email: 'cody@puppybook.com',
    password: 'bones'
  })

  await Promise.all([
    Badge.create({name: 'Juvenile', description: 'Logged at least 10 dives'}),
    Badge.create({name: 'Aquaman', description: 'Dived beyond 30 meters'}),
    Badge.create({name: 'Discoverer', description: 'Made 40 observations'}),
    Badge.create({name: 'Voyager', description: 'Dived in over 10 countries'})
  ])

  // await EarnedBadge.create({
  //   diverId: 1,
  //   badgeId: 2
  // })

  await Log.create({
    diveName: `Barracuda Point`,
    location: `Sipadan Island, Malaysia`,
    diverId: 1 /* Cody */,
    timeIn: `2019-05-01 08:00:00`,
    timeOut: `2019-05-01 09:00:00`,
    maxDepth: 100,
    tankPressureStart: 200,
    tankPressureEnd: 50,
    tankType: `Steel`,
    beltWeight: 30,
    airMixture: `Hydreliox`,
    description: `Best dive ever!!!`,
    wetSuitType: `The Full Wetsuit`,
    wetSuitThickness: 2 /*mm*/,
    hasStrongCurrent: false,
    visibility: 15
  })

  await Log.create({
    diveName: `Great Big Hole`,
    location: `Sipadan Island, Malaysia`,
    diverId: 1 /* Cody */,
    timeIn: `2019-05-01 08:00:00`,
    timeOut: `2019-05-01 09:00:00`,
    maxDepth: 20,
    tankPressureStart: 200,
    tankPressureEnd: 50,
    tankType: `Steel`,
    beltWeight: 30,
    airMixture: `Hydreliox`,
    description: `Best dive ever!!!`,
    wetSuitType: `The Full Wetsuit`,
    wetSuitThickness: 2 /*mm*/,
    hasStrongCurrent: false,
    visibility: 15
  })

  await Promise.all([
    Observation.create({
      name: 'Whale Shark',
      category: 'fish',
      description:
        'slow-moving, filter-feeding carpet shark. the biggest fish in the sea!',
      color: 'blue',
      shape: 'bulbous'
    }),
    Observation.create({
      name: 'Nudibranch',
      category: 'mollusks',
      description: 'Sea slug. Lives on coral. Can grow to 4 inches.',
      color: 'red',
      shape: 'oblong'
    })
  ])

  await Promise.all([
    Sighting.create({
      logId: 1,
      observationId: 1
    }),
    Sighting.create({
      logId: 1,
      observationId: 2
    })
  ])
}

describe('Log model', () => {
  describe('classMethods', () => {
    beforeEach(async () => {
      await before()
    })
    describe('getAllObservations', () => {
      it('returns an object with observations if there are observations', () => {
        return Log.getAllObservations(1).then(data =>
          expect(data.length).to.equal(2)
        )
      })

      it('returns an empty array if there are no observations', () => {
        return Log.getAllObservations(2).then(data =>
          expect(data).to.deep.equal([])
        )
      })
    }) // end describe('getAllObservations')

    describe('findDiverLogs', () => {
      it('returns an array of logs given a diverId', () => {
        return Log.findDiverLogs(1).then(data =>
          expect(data[0].diveName).to.equal('Barracuda Point')
        )
      })
      it('returns an empty array if diver has no logs', () => {
        return Log.findDiverLogs(2).then(data => expect(data).to.deep.equal([]))
      })
    }) //end describe('findDiverLogs')
  }) // end describe('classMethods')
  describe('instanceMethods', () => {
    let log
    beforeEach(async () => {
      await before()
      log = await Log.findByPk(1)
    })
    describe('getDiverBadges', () => {
      it('returns an array of badges(id only) for a given log instance', () => {
        return log
          .getDiverBadges(1)
          .then(data => expect(data[0].badgeId).to.equal(2))
      })
      it('returns an empty array if user has no badges', () => {
        return log
          .getDiverBadges(2)
          .then(data => expect(data).to.deep.equal([]))
      })
    }) //end describe('getDiverBadges')
  }) //end describe('instanceMethods')
}) // end describe('Log model')
