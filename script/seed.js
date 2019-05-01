'use strict'

const db = require('../server/db')
const { DiveShop, Certification, OfferedDive } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const diveShop = await Promise.all([
    diveShop.create({
      email: 'hawaii@email.com',
      password: '123',
      Name: 'Hawaii',
      Location: 'Honolulu Street, Hawaii',
      StoreFrontImgUrl: 'public/pictures/diveshop/hawaiiShop.jpg',
      StampImgUrl: 'public/pictures/diveshop/hawaiiSymbol.png',
    }),
    diveShop.create({
      email: 'maldives@email.com',
      password: '123',
      Name: 'Maldives',
      Location: 'Maldives Street, Maldives',
      StoreFrontImgUrl: 'public/pictures/diveshop/maldivesShop.jpeg',
      StampImgUrl: 'public/pictures/diveshop/maldivesShopSymbol.jpg',
    })
  ])

  const certification = await Promise.all([
    certification.create({
      CertId: 001,
      Provider: 'PADI',
      Date: '2019-05-01',
      Level: 'Advance',
      InstructorId: '9999'
    })
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
