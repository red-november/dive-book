'use strict'

const db = require('../server/db')
const {
  Diver,
  DiveShop,
  Certification,
  OfferedDive,
  Log,
  DivesOfferedByShops,
  Badge,
  EarnedBadge
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const divers = await Promise.all([
    Diver.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'De Coder'
    }),
    Diver.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Law'
    })
  ])

  const diveShop = await Promise.all([
    DiveShop.create({
      email: 'hawaii@email.com',
      password: '123',
      name: 'Hawaii',
      location: 'Honolulu Street, Hawaii',
      storeFrontImgUrl: 'public/pictures/diveshop/hawaiiShop.jpg',
      stampImgUrl: 'public/pictures/diveshop/hawaiiSymbol.png'
    }),
    DiveShop.create({
      email: 'maldives@email.com',
      password: '123',
      name: 'Maldives',
      location: 'Maldives Street, Maldives',
      storeFrontImgUrl: 'public/pictures/diveshop/maldivesShop.jpeg',
      stampImgUrl: 'public/pictures/diveshop/maldivesShopSymbol.jpg'
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
        'Sipadan is a world-class destination, long attracting divers from around the world. Barracuda Point is one of the standout dive sites among many.'
    }),
    OfferedDive.create({
      name: 'Blue Corner Wall',
      description:
        'Blue Corner Palau is one of the most action-packed scuba dive sites in the world and up to 13 different species of sharks circling just beyond the plummeting reef wall.'
    }),
    OfferedDive.create({
      name: 'The Great Blue Hole',
      description:
        'The Great Blue Hole is a giant marine sinkhole off the coast of Belize. It lies near the center of Lighthouse Reef.'
    })
  ])

  const logs = await Promise.all([
    Log.create({
      diveName: `Barracuda Point`,
      offeredDiveId: 1,
      diveshopId: 1,
      location: `Sipadan Island, Malaysia`,
      isVerified: true,
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
    }),

    Log.create({
      diveName: `Blue Corner Wall`,
      offeredDiveId: 2,
      diveshopId: 1,
      location: `Palau, Micronesia`,
      isVerified: true,
      diverId: 1 /* Cody */,
      timeIn: `2019-04-29 10:00:00`,
      timeOut: `2019-04-29 11:15:00`,
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
      timeIn: `2019-04-28 15:00:00`,
      timeOut: `2019-04-29 15:45:00`,
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

  const badges = await Promise.all([
    Badge.create({name: 'Juvenile', description: 'Logged at least 10 dives'}),
    Badge.create({name: 'Aquaman', description: 'Dived beyond 30 meters'}),
    Badge.create({name: 'Discoverer', description: 'Made 40 observations'}),
    Badge.create({name: 'Voyager', description: 'Dived in over 10 countries'})
  ])

  // Relationships

  const badgesEarned = await Promise.all([
    EarnedBadge.create({
      diverId: 1,
      badgeId: 1
    }),
    EarnedBadge.create({
      diverId: 1,
      badgeId: 2
    }),
    EarnedBadge.create({
      diverId: 2,
      badgeId: 1
    })
  ])

  const divesofferedbyshops = await Promise.all([
    DivesOfferedByShops.create({
      diveshopId: 1,
      offeredDiveId: 1
    }),
    DivesOfferedByShops.create({
      diveshopId: 1,
      offeredDiveId: 2
    }),
    DivesOfferedByShops.create({
      diveshopId: 2,
      offeredDiveId: 2
    }),
    DivesOfferedByShops.create({
      diveshopId: 2,
      offeredDiveId: 3
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
