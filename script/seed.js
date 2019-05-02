'use strict'

const db = require('../server/db')
const { User, DiveShop, Certification, OfferedDive } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ])
  const diveShop = await Promise.all([
    DiveShop.create({
      email: 'hawaii@email.com',
      password: '123',
      name: 'Hawaii',
      location: 'Honolulu Street, Hawaii',
      storeFrontImgUrl: 'public/pictures/diveshop/hawaiiShop.jpg',
      stampImgUrl: 'public/pictures/diveshop/hawaiiSymbol.png',
    }),
    DiveShop.create({
      email: 'maldives@email.com',
      password: '123',
      name: 'Maldives',
      location: 'Maldives Street, Maldives',
      storeFrontImgUrl: 'public/pictures/diveshop/maldivesShop.jpeg',
      stampImgUrl: 'public/pictures/diveshop/maldivesShopSymbol.jpg',
    })
  ])

  const certification = await Promise.all([
    Certification.create({
      certId: '001PADI',
      provider: 'PADI',
      date: '2019-05-01',
      level: 'Advanced Skills Diver',
      instructorId: 'James9999'
    }),
    Certification.create({
      certId: '002SSI',
      provider: 'SSI',
      date: '2016-10-01',
      level: 'Underwater Navigation',
      instructorId: 'Dan8888'
    }),
  ])

  const offeredDive = await Promise.all([
    OfferedDive.create({
      name: 'Barracuda Point',
      description: 'Sipadan is a world-class destination, long attracting divers from around the world. Barracuda Point is one of the standout dive sites among many.'
    }),
    OfferedDive.create({
      name: 'Blue Corner Wall',
      description: 'Blue Corner Palau is one of the most action-packed scuba dive sites in the world and up to 13 different species of sharks circling just beyond the plummeting reef wall.'
    }),
  ])






  console.log(`seeded ${users.length} users`)
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
