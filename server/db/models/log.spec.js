/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const {Log, Diver, Observation, Sighting} = require('../models')

describe('Log model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('classMethods', () => {
    describe('getAllObservations', () => {
      let cody, log, observations, sightings

      beforeEach(async () => {
        cody = await Diver.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })

        log = await Log.create({
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

        observations = await Promise.all([
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

        const sightings = await Promise.all([
          Sighting.create({
            logId: 1,
            observationId: 1
          }),
          Sighting.create({
            logId: 1,
            observationId: 2
          })
        ])
      })

      it('returns an object with observations if there are observations', () => {
        return Log.getAllObservations(1).then(data =>
          expect(data[1].name).to.equal('Nudibranch')
        )
      })

      it('returns an empty array if there are no observations', () => {
        return Log.getAllObservations(2).then(data =>
          expect(data).to.deep.equal([])
        )
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
