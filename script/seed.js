'use strict'

const db = require('../server/db')
const {
  Diver,
  DiveShop,
  Certification,
  OfferedDive,
  Log,
  Badge,
  EarnedBadge,
  Observation,
  Sighting
} = require('../server/db/models')
async function seed() {
  await db.sync({force: true})
  await db.query('SELECT postgis_full_version();')
  await db.query('CREATE EXTENSION postgis;')
  console.log('db synced!')
  await db.query('SELECT postgis_full_version();')

  await db.query('ALTER TABLE logs ADD COLUMN geog geography(Point);')

  const diveShop = await Promise.all([
    DiveShop.create({
      email: 'hawaii@email.com',
      name: 'Hawaii',
      location: 'Honolulu Street, Hawaii',
      storeFrontImgUrl: 'public/pictures/diveshop/hawaiiShop.jpg',
      stampImgUrl: 'public/pictures/diveshop/hawaiiSymbol.png'
    }),
    DiveShop.create({
      email: 'maldives@email.com',
      name: 'Maldives',
      location: 'Maldives Street, Maldives',
      storeFrontImgUrl: 'public/pictures/diveshop/maldivesShop.jpeg',
      stampImgUrl: 'public/pictures/diveshop/maldivesShopSymbol.jpg'
    })
  ])

  const divers = await Promise.all([
    Diver.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'De Coder',
      diveshopId: 1
    }),
    Diver.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Law'
    })
  ])

  const certification = await Promise.all([
    Certification.create({
      certId: '001PADI',
      provider: 'PADI',
      date: '2019-05-01',
      level: 'Advanced Skills Diver',
      instructorId: 'James9999',
      diverId: 1
    }),
    Certification.create({
      certId: '002SSI',
      provider: 'SSI',
      date: '2016-10-01',
      level: 'Underwater Navigation',
      instructorId: 'Dan8888',
      diverId: 1
    })
  ])

  const offereddive = await Promise.all([
    OfferedDive.create({
      name: 'Barracuda Point',
      description:
        'Sipadan is a world-class destination, long attracting divers from around the world. Barracuda Point is one of the standout dive sites among many.',
      diveshopId: 1,
      location: 'Sipadan Island, Malaysia',
      imageURL: 'BarracudaPoint.jpg'
    }),
    OfferedDive.create({
      name: 'Blue Corner Wall',
      description:
        'Blue Corner Palau is one of the most action-packed scuba dive sites in the world and up to 13 different species of sharks circling just beyond the plummeting reef wall.',
      diveshopId: 1,
      location: 'Palau, Micronesia',
      imageURL: 'BlueCornerWall.jpg'
    }),
    OfferedDive.create({
      name: 'The Great Blue Hole',
      description:
        'The Great Blue Hole is a giant marine sinkhole off the coast of Belize. It lies near the center of Lighthouse Reef.',
      diveshopId: 2,
      location: 'Belize City, Belize',
      imageURL: 'TheGreatBlueHole.jpg'
    })
  ])

  const badges = await Promise.all([
    Badge.create({name: 'Juvenile', description: 'Logged at least 10 dives'}),
    Badge.create({name: 'Aquaman', description: 'Dived beyond 30 meters'}),
    Badge.create({name: 'Discoverer', description: 'Made 40 observations'}),
    Badge.create({name: 'Voyager', description: 'Dived in over 10 places'})
  ])

  const logs = await Promise.all([
    Log.create({
      diveName: `Barracuda Point`,
      offeredDiveId: 1,
      diveshopId: 1,
      location: `Sipadan Island, Malaysia`,
      isVerified: true,
      diverId: 1 /* Cody */,
      timeIn: `08:00`,
      timeOut: `09:00:00`,
      date: `2019-05-01`,
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
    }),

    Log.create({
      diveName: `Barracuda Point`,
      offeredDiveId: 1,
      diveshopId: 1,
      location: `Sipadan Island, Malaysia`,
      isVerified: true,
      diverId: 2 /* Murphy */,
      timeIn: `08:00:00`,
      timeOut: `09:00:00`,
      date: `2019-05-01`,
      maxDepth: 100,
      tankPressureStart: 260,
      tankPressureEnd: 30,
      tankType: `Steel`,
      beltWeight: 30,
      airMixture: `Hydreliox`,
      description: `Lol I almost fainted`,
      wetSuitType: `The Full Wetsuit`,
      wetSuitThickness: 3 /*mm*/,
      hasStrongCurrent: false,
      visibility: 15
    }),

    Log.create({
      diveName: `Blue Corner Wall`,
      offeredDiveId: 2,
      diveshopId: 1,
      location: `Palau, Micronesia`,
      isVerified: true,
      diverId: 1 /* Cody */,
      timeIn: `10:00:00`,
      timeOut: `11:15:00`,
      date: `2019-04-29`,
      maxDepth: 80,
      tankPressureStart: 220,
      tankPressureEnd: 60,
      tankType: `Aluminum`,
      beltWeight: 25,
      airMixture: `Oxygen`,
      description: `Heavenly`,
      wetSuitType: `The Spring Wetsuit`,
      wetSuitThickness: 3 /*mm*/,
      hasStrongCurrent: false,
      visibility: 20
    }),

    Log.create({
      diveName: `The Great Blue Hole`,
      offeredDiveId: 3,
      diveshopId: 2,
      location: `Belize City, Belize`,
      isVerified: true,
      diverId: 1 /* Cody */,
      timeIn: `15:00:00`,
      timeOut: `15:45:00`,
      date: `2019-04-28`,
      maxDepth: 85,
      tankPressureStart: 250,
      tankPressureEnd: 40,
      tankType: `Steel`,
      beltWeight: 25,
      airMixture: `Oxygen`,
      description: `This is one massive sink hole!`,
      wetSuitType: `The Spring Wetsuit`,
      wetSuitThickness: 3 /*mm*/,
      hasStrongCurrent: false,
      visibility: 23
    }),
    Log.create({
      diveName: `The Great Barrier Reef`,
      offeredDiveId: 3,
      diveshopId: 2,
      location: `Carins, Australia`,
      isVerified: true,
      diverId: 1 /* Cody */,
      timeIn: `15:00:00`,
      timeOut: `15:45:00`,
      date: `2019-04-28`,
      maxDepth: 85,
      tankPressureStart: 250,
      tankPressureEnd: 40,
      tankType: `Steel`,
      beltWeight: 25,
      airMixture: `Oxygen`,
      description: `This is one massive sink hole!`,
      wetSuitType: `The Spring Wetsuit`,
      wetSuitThickness: 3 /*mm*/,
      hasStrongCurrent: false,
      visibility: 23
    })
  ])
  // 1 = 0101000020E61000008BD4C5B7C164444099DF1FA5C87D52C0

  // 4 = 0101000020E61000009529E620E850314021CB82893FE255C0
  await Promise.all([
    db.query(
      'UPDATE logs set geog = ST_MakePoint(118.6287,4.1150) where id = 1'
    ),
    db.query(
      'UPDATE logs set geog = ST_MakePoint(-73.9653714,40.7871618) where id = 2'
    ),
    db.query(
      'UPDATE logs set geog = ST_MakePoint(134.485756,7.353442) where id = 3'
    ),
    db.query(
      'UPDATE logs set geog = ST_MakePoint(-87.535128,17.316042) where id = 4'
    ),
    db.query(
      'UPDATE logs set geog = ST_MakePoint(151.022436,-20.865115) where id = 5'
    )
  ])

  const observations = await Promise.all([
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
    }),
    Observation.create({
      name: 'Psychedelic Frogfish',
      category: 'fish',
      description: 'Small, short, stocky, and masters of camoflage',
      color: 'orange'
    }),
    Observation.create({
      name: 'Seahorse',
      category: 'fish',
      description: 'Lives exclusively on coral. Masters of camoflage',
      color: 'yellow'
    }),
    Observation.create({
      name: 'Manta Ray',
      category: 'fish',
      description: 'Majestic creatures with a wingspan of 23 feet',
      color: 'gray',
      shape: 'diamond'
    }),
    Observation.create({
      name: 'Caribbean Reef Shark',
      category: 'fish',
      description: 'Shark! Scary!',
      color: 'gray'
    }),
    Observation.create({
      name: 'Moray Eel',
      category: 'fish',
      description: 'Mostly seen in brackish water.',
      color: 'green'
    }),
    Observation.create({
      name: 'Cuttlefish',
      category: 'mollusks',
      description: 'Shape-shifting, color-changing, beast',
      color: 'multicolored'
    }),
    Observation.create({
      name: 'Barrel Sponge',
      category: 'sponges',
      description: 'barrel-shaped sponge',
      color: 'pink'
    }),
    Observation.create({
      name: 'whip coral',
      category: 'coral',
      description: 'vine-shaped coral',
      color: 'white'
    }),
    Observation.create({
      name: 'HMCS Yukon',
      category: 'inanimate objects',
      description: 'Ship off of San Diego, California.',
      shape: 'shiplike'
    })
  ])

  // Relationships

  const badgesEarned = await Promise.all([
    EarnedBadge.create({
      diverId: 1,
      badgeId: 1
    }),
    EarnedBadge.create({
      diverId: 1,
      badgeId: 4
    }),
    EarnedBadge.create({
      diverId: 2,
      badgeId: 3
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
    }),
    Sighting.create({
      logId: 1,
      observationId: 3
    }),
    Sighting.create({
      logId: 2,
      observationId: 4
    }),
    Sighting.create({
      logId: 2,
      observationId: 5
    }),
    Sighting.create({
      logId: 3,
      observationId: 6
    }),
    Sighting.create({
      logId: 3,
      observationId: 1
    })
  ])

  console.log(`seeded ${divers.length} users`)
  console.log(`seeded ${offereddive.length} offered dives`)
  console.log(`seeded ${logs.length} divers`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
