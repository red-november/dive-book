'use strict'

const db = require('../server/db')

const {
    // Diver,
    // DiveShop,
    Certification,
    // OfferedDive,
    // Log,
    // Badge,
    // Observation,
  } = require('../server/db/models')

  const {
    // DiveShopsData,
    // OfferedDivesData,
    ObservationOddsByOfferedDiveData,
    // ObservationsData,
    // DiversData,
    ObservationHash,
    TourGuide
} = require('./data')
  
const Sequelize = require('sequelize')

async function seed() {
  await db.sync(/*{force: true}*/)
  console.log('db synced!')

  console.log(`Loading Certifications`)

  const CertificationsBook = await Promise.all(
    [	Certification.create({ provider: "SSI", level: "Open Water", certId: "368SSI", date: "2016-08-06", diverId: 1, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "927NAUI", date: "2019-01-05", diverId: 1, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "752NAUI", date: "2018-04-05", diverId: 1, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "903NAUI", date: "2018-11-30", diverId: 2, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "900NAUI", date: "2018-11-24", diverId: 2, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "228PADI", date: "2015-12-28", diverId: 2, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "084PADI", date: "2015-05-14", diverId: 3, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "583SSI", date: "2017-07-11", diverId: 3, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "285PADI", date: "2016-03-28", diverId: 3, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "SSI", level: "Open Water", certId: "369SSI", date: "2016-08-07", diverId: 4, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "558SSI", date: "2017-06-01", diverId: 4, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "071PADI", date: "2015-04-24", diverId: 4, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "845NAUI", date: "2018-08-29", diverId: 5, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "155PADI", date: "2015-09-03", diverId: 5, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "423SSI", date: "2016-10-31", diverId: 5, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "SSI", level: "Open Water", certId: "367SSI", date: "2016-08-04", diverId: 6, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "509SSI", date: "2017-03-16", diverId: 6, instructorId: "HCOLE1234"}),	Certification.create({ provider: "Other", level: "Rescue Diver", certId: "949Other", date: "2019-02-09", diverId: 6, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "649NAUI", date: "2017-10-23", diverId: 7, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "035PADI", date: "2015-02-26", diverId: 7, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "401SSI", date: "2016-09-26", diverId: 7, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "286PADI", date: "2016-03-28", diverId: 8, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "118PADI", date: "2015-07-06", diverId: 8, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "685NAUI", date: "2017-12-20", diverId: 8, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "297PADI", date: "2016-04-14", diverId: 9, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "455SSI", date: "2016-12-21", diverId: 9, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "458SSI", date: "2016-12-26", diverId: 9, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "304PADI", date: "2016-04-26", diverId: 10, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "386SSI", date: "2016-09-02", diverId: 10, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "448SSI", date: "2016-12-10", diverId: 10, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "751NAUI", date: "2018-04-03", diverId: 11, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "222PADI", date: "2015-12-18", diverId: 11, instructorId: "HCOLE1234"}),	Certification.create({ provider: "SSI", level: "Open Water", certId: "583SSI", date: "2017-07-12", diverId: 11, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "027PADI", date: "2015-02-13", diverId: 12, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "843NAUI", date: "2018-08-26", diverId: 12, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "835NAUI", date: "2018-08-13", diverId: 12, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "627NAUI", date: "2017-09-19", diverId: 13, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Advanced Open Water", certId: "766NAUI", date: "2018-04-27", diverId: 13, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "272PADI", date: "2016-03-07", diverId: 13, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "Other", level: "Deep Diver", certId: "974Other", date: "2019-03-21", diverId: 14, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "275PADI", date: "2016-03-11", diverId: 14, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "290PADI", date: "2016-04-04", diverId: 14, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "019PADI", date: "2015-02-01", diverId: 15, instructorId: "HCOLE1234"}),	Certification.create({ provider: "NAUI", level: "Rescue Diver", certId: "877NAUI", date: "2018-10-19", diverId: 15, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "261PADI", date: "2016-02-18", diverId: 15, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 16, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 16, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 16, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 17, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 17, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 17, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "283PADI", date: "2016-03-24", diverId: 18, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "046PADI", date: "2015-03-16", diverId: 18, instructorId: "HCOLE1234"}),	Certification.create({ provider: "Other", level: "Deep Diver", certId: "997Other", date: "2019-04-26", diverId: 18, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 19, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 19, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 19, instructorId: "HCOLE1234"}),
    Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 20, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 20, instructorId: "HCOLE1234"}),	Certification.create({ provider: "PADI", level: "Open Water", certId: "000PADI", date: "2015-01-01", diverId: 20, instructorId: "HCOLE1234"})
  ])

  console.log(`Certification Load Success! ${CertificationsBook.length} certs created`)
  console.log(`Loading Observations`)

  const DiveBook = await db.query('SELECT * FROM logs', {
    type: Sequelize.QueryTypes.SELECT
  })

  await TourGuide(DiveBook, ObservationOddsByOfferedDiveData, ObservationHash)

  console.log(`Observations Load Success!`)
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
