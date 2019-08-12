'use strict'

const db = require('../server/db')

const {
    Diver,
    DiveShop,
    // Certification,
    OfferedDive,
    // Log,
    Badge,
    Observation,
  } = require('../server/db/models')

  const {
    DiveShopsData,
    OfferedDivesData,
    // ObservationOddsByOfferedDiveData,
    ObservationsData,
    DiversData,
    // ObservationHash,
    // TourGuide
} = require('./data')
  

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await db.query(
    'ALTER TABLE logs ADD COLUMN geog geography(Point,4326);'
  )
  await db.query(
    'ALTER TABLE diveshops ADD COLUMN geog geography(Point,4326);'
  )
  await db.query(
    'ALTER TABLE "offeredDives" ADD COLUMN geog geography(Point,4326);'
  )

  await DiveShop.LoadData(DiveShopsData)
  await Diver.LoadData(DiversData)
  await OfferedDive.LoadData(OfferedDivesData)
  await Observation.LoadData(ObservationsData)

  const badges = await Promise.all([
    Badge.create({name: 'Juvenile', description: 'Logged at least 10 dives'}),
    Badge.create({name: 'Aquaman', description: 'Dived beyond 30 meters'}),
    Badge.create({name: 'Discoverer', description: 'Made 40 observations'}),
    Badge.create({name: 'Voyager', description: 'Dived in over 10 places'})
  ])

  console.log(`Badges Load Success! Created ${badges.length} badges`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = {seed}
