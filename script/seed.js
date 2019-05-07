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
const {DiveShopsData, OfferedDivesData, ObservationOddsByOfferedDiveData, ObservationsData, DiversData, Dice, ObservationHash} = require('../script/data')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const diveShop = await Promise.all([
  //   DiveShop.create({
  //     email: 'hawaii@email.com',
  //     password: '123',
  //     name: 'Hawaii',
  //     location: 'Honolulu Street, Hawaii',
  //     storeFrontImgUrl: 'public/pictures/diveshop/hawaiiShop.jpg',
  //     stampImgUrl: 'public/pictures/diveshop/hawaiiSymbol.png'
  //   }),
  //   DiveShop.create({
  //     email: 'maldives@email.com',
  //     password: '123',
  //     name: 'Maldives',
  //     location: 'Maldives Street, Maldives',
  //     storeFrontImgUrl: 'public/pictures/diveshop/maldivesShop.jpeg',
  //     stampImgUrl: 'public/pictures/diveshop/maldivesShopSymbol.jpg'
  //   })
  // ])

  await DiveShop.LoadData(DiveShopsData)
  await Diver.LoadData(DiversData)

  // const divers = await Promise.all([
  //   Diver.create({
  //     email: 'cody@email.com',
  //     password: '123',
  //     firstName: 'Cody',
  //     lastName: 'De Coder',
  //     diveshopId: 1
  //   }),
  //   Diver.create({
  //     email: 'murphy@email.com',
  //     password: '123',
  //     firstName: 'Murphy',
  //     lastName: 'Law'
  //   })
  // ])

  // const offereddive = await Promise.all([
  //   OfferedDive.create({
  //     name: 'Barracuda Point',
  //     description:
  //       'Sipadan is a world-class destination, long attracting divers from around the world. Barracuda Point is one of the standout dive sites among many.',
  //     diveshopId: 1
  //   }),
  //   OfferedDive.create({
  //     name: 'Blue Corner Wall',
  //     description:
  //       'Blue Corner Palau is one of the most action-packed scuba dive sites in the world and up to 13 different species of sharks circling just beyond the plummeting reef wall.',
  //     diveshopId: 1
  //   }),
  //   OfferedDive.create({
  //     name: 'The Great Blue Hole',
  //     description:
  //       'The Great Blue Hole is a giant marine sinkhole off the coast of Belize. It lies near the center of Lighthouse Reef.',
  //     diveshopId: 2
  //   })
  // ])

  await OfferedDive.LoadData(OfferedDivesData)
  await Observation.LoadData(ObservationsData)
  // await Log.LoadData(LogsData)

  // const LogLoadData = async function(dataArray) {
  //   try {
  //     await dataArray.map(async data => {
  //     let {diveName,	isVerified,	timeIn,	timeOut,	maxDepth,	tankPressureStart,	tankPressureEnd,	tankType,	beltWeight,	wetSuitType,	wetSuitThickness,	airMixture,	description,	hasStrongCurrent,	visibility,	diverId,	offeredDiveId,	diveshopId, location} = data
  //     console.log(data)
  //     const newLog = await Log.create({
  //       diveName,
  //       offeredDiveId,
  //       diveshopId,
  //       location,
  //       isVerified,
  //       diverId,
  //       timeIn,
  //       timeOut,
  //       maxDepth,
  //       tankPressureStart,
  //       tankPressureEnd,
  //       tankType,
  //       beltWeight,
  //       airMixture,
  //       description,
  //       wetSuitType,
  //       wetSuitThickness,
  //       hasStrongCurrent,
  //       visibility
  //       })
  //       console.log(newLog)
  //     })
  //     console.log("Log Load Success!")
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // await LogLoadData(LogsData)


  const badges = await Promise.all([
    Badge.create({name: 'Juvenile', description: 'Logged at least 10 dives'}),
    Badge.create({name: 'Aquaman', description: 'Dived beyond 30 meters'}),
    Badge.create({name: 'Discoverer', description: 'Made 40 observations'}),
    Badge.create({name: 'Voyager', description: 'Dived in over 10 places'})
  ])

  // await Log.create(
  // {		diveName: "Yongala", 	isVerified: true, 	timeIn: "2016-01-02 03:28:00", 	timeOut: "2016-01-02 04:06:00", 	maxDepth: 32, 	tankPressureStart: 233, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 1, 	offeredDiveId: 4, 	diveshopId: 3	}
  // )

  // await Log.create(
  // {		diveName: "Palawan", 	isVerified: true, 	timeIn: "2016-01-02 21:13:00", 	timeOut: "2016-01-02 21:56:00", 	maxDepth: 22, 	tankPressureStart: 225, 	tankPressureEnd: 52, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 13, 	diverId: 7, 	offeredDiveId: 12, 	diveshopId: 1	}
  // )

  // await Log.create(
  // {		diveName: "Wreck Valley", 	isVerified: true, 	timeIn: "2016-01-14 03:24:00", 	timeOut: "2016-01-14 03:58:00", 	maxDepth: 24, 	tankPressureStart: 220, 	tankPressureEnd: 53, 	tankType: "Steel", 	beltWeight: 2, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 5, 	offeredDiveId: 20, 	diveshopId: 9	}
  // )


  const DiveBook = await Promise.all([			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2016-01-02 03:28:00", 	timeOut: "2016-01-02 04:22:00", 	maxDepth: 15, 	tankPressureStart: 215, 	tankPressureEnd: 40, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 3, 	diverId: 10, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	timeIn: "2016-01-02 21:13:00", 	timeOut: "2016-01-02 21:53:00", 	maxDepth: 13, 	tankPressureStart: 211, 	tankPressureEnd: 56, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 14, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	timeIn: "2016-01-14 03:24:00", 	timeOut: "2016-01-14 03:35:00", 	maxDepth: 30, 	tankPressureStart: 225, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 5, 	diverId: 9, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2016-01-14 20:39:00", 	timeOut: "2016-01-14 21:45:00", 	maxDepth: 34, 	tankPressureStart: 219, 	tankPressureEnd: 13, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 5, 	diverId: 5, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2016-01-18 16:22:00", 	timeOut: "2016-01-18 16:51:00", 	maxDepth: 28, 	tankPressureStart: 223, 	tankPressureEnd: 57, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 14, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2016-01-25 18:12:00", 	timeOut: "2016-01-25 18:36:00", 	maxDepth: 24, 	tankPressureStart: 213, 	tankPressureEnd: 57, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 15, 	diverId: 11, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	timeIn: "2016-01-30 13:05:00", 	timeOut: "2016-01-30 13:31:00", 	maxDepth: 18, 	tankPressureStart: 215, 	tankPressureEnd: 25, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 1, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2016-02-04 17:45:00", 	timeOut: "2016-02-04 18:59:00", 	maxDepth: 21, 	tankPressureStart: 227, 	tankPressureEnd: 40, 	tankType: "Steel", 	beltWeight: 19, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 16, 	diverId: 2, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	timeIn: "2016-02-06 12:03:00", 	timeOut: "2016-02-06 12:47:00", 	maxDepth: 21, 	tankPressureStart: 210, 	tankPressureEnd: 54, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 1, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	timeIn: "2016-02-18 02:22:00", 	timeOut: "2016-02-18 02:47:00", 	maxDepth: 28, 	tankPressureStart: 223, 	tankPressureEnd: 55, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 10, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2016-02-23 13:26:00", 	timeOut: "2016-02-23 13:46:00", 	maxDepth: 22, 	tankPressureStart: 203, 	tankPressureEnd: 56, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 12, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	timeIn: "2016-02-27 07:50:00", 	timeOut: "2016-02-27 08:26:00", 	maxDepth: 17, 	tankPressureStart: 218, 	tankPressureEnd: 34, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 1, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	timeIn: "2016-02-29 19:32:00", 	timeOut: "2016-02-29 20:07:00", 	maxDepth: 28, 	tankPressureStart: 218, 	tankPressureEnd: 43, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 6, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	timeIn: "2016-03-23 01:48:00", 	timeOut: "2016-03-23 02:30:00", 	maxDepth: 35, 	tankPressureStart: 219, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 5, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	timeIn: "2016-03-25 03:08:00", 	timeOut: "2016-03-25 03:19:00", 	maxDepth: 24, 	tankPressureStart: 203, 	tankPressureEnd: 55, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 10, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	timeIn: "2016-03-30 08:19:00", 	timeOut: "2016-03-30 08:44:00", 	maxDepth: 35, 	tankPressureStart: 226, 	tankPressureEnd: 34, 	tankType: "Steel", 	beltWeight: 15, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 26, 	diverId: 2, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	timeIn: "2016-04-13 07:08:00", 	timeOut: "2016-04-13 07:49:00", 	maxDepth: 24, 	tankPressureStart: 215, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 14, 	diverId: 11, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2016-04-26 06:04:00", 	timeOut: "2016-04-26 06:33:00", 	maxDepth: 16, 	tankPressureStart: 221, 	tankPressureEnd: 40, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 8, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2016-04-27 13:21:00", 	timeOut: "2016-04-27 14:02:00", 	maxDepth: 24, 	tankPressureStart: 233, 	tankPressureEnd: 35, 	tankType: "Steel", 	beltWeight: 18, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 7, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 10, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2016-04-28 19:26:00", 	timeOut: "2016-04-28 20:01:00", 	maxDepth: 20, 	tankPressureStart: 237, 	tankPressureEnd: 21, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Other", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 4, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2016-05-03 18:16:00", 	timeOut: "2016-05-03 18:52:00", 	maxDepth: 28, 	tankPressureStart: 229, 	tankPressureEnd: 33, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 11, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2016-05-07 17:36:00", 	timeOut: "2016-05-07 18:21:00", 	maxDepth: 15, 	tankPressureStart: 212, 	tankPressureEnd: 31, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 8, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	timeIn: "2016-05-08 18:35:00", 	timeOut: "2016-05-08 19:39:00", 	maxDepth: 34, 	tankPressureStart: 227, 	tankPressureEnd: 37, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Other", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 20, 	diverId: 14, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	timeIn: "2016-05-16 04:42:00", 	timeOut: "2016-05-16 05:14:00", 	maxDepth: 19, 	tankPressureStart: 224, 	tankPressureEnd: 32, 	tankType: "Steel", 	beltWeight: 17, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 4, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	timeIn: "2016-05-23 03:23:00", 	timeOut: "2016-05-23 04:06:00", 	maxDepth: 26, 	tankPressureStart: 231, 	tankPressureEnd: 12, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 3, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2016-06-01 02:21:00", 	timeOut: "2016-06-01 03:14:00", 	maxDepth: 14, 	tankPressureStart: 226, 	tankPressureEnd: 41, 	tankType: "Steel", 	beltWeight: 17, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 8, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	timeIn: "2016-06-06 10:26:00", 	timeOut: "2016-06-06 11:22:00", 	maxDepth: 19, 	tankPressureStart: 213, 	tankPressureEnd: 11, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 15, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	timeIn: "2016-07-02 03:19:00", 	timeOut: "2016-07-02 04:02:00", 	maxDepth: 38, 	tankPressureStart: 216, 	tankPressureEnd: 51, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 5, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	timeIn: "2016-07-15 21:20:00", 	timeOut: "2016-07-15 21:49:00", 	maxDepth: 32, 	tankPressureStart: 212, 	tankPressureEnd: 22, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 11, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	timeIn: "2016-07-30 13:43:00", 	timeOut: "2016-07-30 13:59:00", 	maxDepth: 13, 	tankPressureStart: 231, 	tankPressureEnd: 60, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 9, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	timeIn: "2016-08-12 10:08:00", 	timeOut: "2016-08-12 10:47:00", 	maxDepth: 25, 	tankPressureStart: 228, 	tankPressureEnd: 48, 	tankType: "Aluminum", 	beltWeight: 7, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 4, 	diverId: 12, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	timeIn: "2016-08-18 12:28:00", 	timeOut: "2016-08-18 13:06:00", 	maxDepth: 26, 	tankPressureStart: 225, 	tankPressureEnd: 35, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 14, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	timeIn: "2016-08-21 16:25:00", 	timeOut: "2016-08-21 16:41:00", 	maxDepth: 36, 	tankPressureStart: 223, 	tankPressureEnd: 39, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 13, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	timeIn: "2016-08-24 04:35:00", 	timeOut: "2016-08-24 05:23:00", 	maxDepth: 19, 	tankPressureStart: 212, 	tankPressureEnd: 14, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 10, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2016-09-11 01:02:00", 	timeOut: "2016-09-11 01:45:00", 	maxDepth: 36, 	tankPressureStart: 234, 	tankPressureEnd: 48, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 10, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	timeIn: "2016-09-15 08:51:00", 	timeOut: "2016-09-15 09:24:00", 	maxDepth: 36, 	tankPressureStart: 212, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Other", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 15, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	timeIn: "2016-10-03 02:31:00", 	timeOut: "2016-10-03 03:13:00", 	maxDepth: 28, 	tankPressureStart: 219, 	tankPressureEnd: 25, 	tankType: "Aluminum", 	beltWeight: 20, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 17, 	diverId: 5, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2016-10-09 09:04:00", 	timeOut: "2016-10-09 09:50:00", 	maxDepth: 18, 	tankPressureStart: 217, 	tankPressureEnd: 33, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 22, 	diverId: 12, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2016-10-17 00:33:00", 	timeOut: "2016-10-17 01:03:00", 	maxDepth: 25, 	tankPressureStart: 230, 	tankPressureEnd: 19, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 7, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	timeIn: "2016-10-27 06:07:00", 	timeOut: "2016-10-27 07:03:00", 	maxDepth: 29, 	tankPressureStart: 223, 	tankPressureEnd: 36, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 2, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2016-11-28 12:36:00", 	timeOut: "2016-11-28 13:28:00", 	maxDepth: 37, 	tankPressureStart: 219, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 6, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2016-11-30 15:31:00", 	timeOut: "2016-11-30 16:18:00", 	maxDepth: 8, 	tankPressureStart: 217, 	tankPressureEnd: 35, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 4, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2016-12-09 04:30:00", 	timeOut: "2016-12-09 04:55:00", 	maxDepth: 12, 	tankPressureStart: 218, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 12, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	timeIn: "2016-12-14 01:07:00", 	timeOut: "2016-12-14 02:01:00", 	maxDepth: 2, 	tankPressureStart: 231, 	tankPressureEnd: 10, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 29, 	diverId: 5, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2016-12-31 23:31:00", 	timeOut: "2016-12-31 23:53:00", 	maxDepth: 25, 	tankPressureStart: 224, 	tankPressureEnd: 37, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 6, 	diverId: 2, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2017-01-30 01:19:00", 	timeOut: "2017-01-30 01:49:00", 	maxDepth: 19, 	tankPressureStart: 233, 	tankPressureEnd: 42, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 13, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	timeIn: "2017-02-07 19:52:00", 	timeOut: "2017-02-07 20:46:00", 	maxDepth: 17, 	tankPressureStart: 219, 	tankPressureEnd: 28, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 3, 	diverId: 6, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2017-02-12 01:49:00", 	timeOut: "2017-02-12 02:30:00", 	maxDepth: 38, 	tankPressureStart: 239, 	tankPressureEnd: 53, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 13, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2017-02-23 16:24:00", 	timeOut: "2017-02-23 17:04:00", 	maxDepth: 23, 	tankPressureStart: 227, 	tankPressureEnd: 33, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 12, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	timeIn: "2017-03-01 09:24:00", 	timeOut: "2017-03-01 09:54:00", 	maxDepth: 16, 	tankPressureStart: 227, 	tankPressureEnd: 38, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 7, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	timeIn: "2017-03-04 06:58:00", 	timeOut: "2017-03-04 08:03:00", 	maxDepth: 26, 	tankPressureStart: 235, 	tankPressureEnd: 37, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 7, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2017-03-06 15:54:00", 	timeOut: "2017-03-06 17:08:00", 	maxDepth: 26, 	tankPressureStart: 217, 	tankPressureEnd: 37, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 10, 	diverId: 14, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	timeIn: "2017-03-08 16:19:00", 	timeOut: "2017-03-08 17:01:00", 	maxDepth: 26, 	tankPressureStart: 234, 	tankPressureEnd: 13, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 13, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	timeIn: "2017-04-10 02:56:00", 	timeOut: "2017-04-10 03:27:00", 	maxDepth: 22, 	tankPressureStart: 210, 	tankPressureEnd: 56, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Other", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 12, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	timeIn: "2017-04-18 01:56:00", 	timeOut: "2017-04-18 02:47:00", 	maxDepth: 27, 	tankPressureStart: 212, 	tankPressureEnd: 36, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 11, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	timeIn: "2017-04-26 01:28:00", 	timeOut: "2017-04-26 02:28:00", 	maxDepth: 18, 	tankPressureStart: 217, 	tankPressureEnd: 27, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 10, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	timeIn: "2017-04-28 00:23:00", 	timeOut: "2017-04-28 01:20:00", 	maxDepth: 23, 	tankPressureStart: 227, 	tankPressureEnd: 32, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 1, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2017-05-04 05:47:00", 	timeOut: "2017-05-04 06:21:00", 	maxDepth: 20, 	tankPressureStart: 220, 	tankPressureEnd: 58, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 1, 	diverId: 1, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	timeIn: "2017-05-06 13:22:00", 	timeOut: "2017-05-06 13:34:00", 	maxDepth: 28, 	tankPressureStart: 219, 	tankPressureEnd: 39, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 13, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2017-05-31 17:16:00", 	timeOut: "2017-05-31 17:53:00", 	maxDepth: 30, 	tankPressureStart: 209, 	tankPressureEnd: 49, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 5, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	timeIn: "2017-06-07 11:46:00", 	timeOut: "2017-06-07 12:09:00", 	maxDepth: 13, 	tankPressureStart: 224, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 19, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 16, 	diverId: 15, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2017-06-16 14:41:00", 	timeOut: "2017-06-16 15:01:00", 	maxDepth: 34, 	tankPressureStart: 225, 	tankPressureEnd: 37, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 5, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	timeIn: "2017-06-18 09:07:00", 	timeOut: "2017-06-18 09:27:00", 	maxDepth: 13, 	tankPressureStart: 214, 	tankPressureEnd: 24, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 10, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	timeIn: "2017-06-29 11:35:00", 	timeOut: "2017-06-29 12:26:00", 	maxDepth: 32, 	tankPressureStart: 224, 	tankPressureEnd: 49, 	tankType: "Steel", 	beltWeight: 23, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 11, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	timeIn: "2017-07-15 22:19:00", 	timeOut: "2017-07-15 23:03:00", 	maxDepth: 24, 	tankPressureStart: 216, 	tankPressureEnd: 14, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 13, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2017-07-16 02:31:00", 	timeOut: "2017-07-16 03:16:00", 	maxDepth: 26, 	tankPressureStart: 229, 	tankPressureEnd: 38, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 15, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	timeIn: "2017-07-16 14:58:00", 	timeOut: "2017-07-16 15:20:00", 	maxDepth: 12, 	tankPressureStart: 215, 	tankPressureEnd: 30, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 4, 	diverId: 1, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	timeIn: "2017-07-17 05:23:00", 	timeOut: "2017-07-17 06:18:00", 	maxDepth: 24, 	tankPressureStart: 207, 	tankPressureEnd: 36, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 1, 	diverId: 2, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2017-08-05 17:25:00", 	timeOut: "2017-08-05 18:10:00", 	maxDepth: 16, 	tankPressureStart: 220, 	tankPressureEnd: 35, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 2, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2017-08-15 09:25:00", 	timeOut: "2017-08-15 10:19:00", 	maxDepth: 33, 	tankPressureStart: 222, 	tankPressureEnd: 54, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 8, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	timeIn: "2017-08-15 12:01:00", 	timeOut: "2017-08-15 12:43:00", 	maxDepth: 21, 	tankPressureStart: 207, 	tankPressureEnd: 34, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 1, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	timeIn: "2017-08-24 17:42:00", 	timeOut: "2017-08-24 18:23:00", 	maxDepth: 31, 	tankPressureStart: 208, 	tankPressureEnd: 36, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 9, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2017-09-09 01:02:00", 	timeOut: "2017-09-09 01:34:00", 	maxDepth: 21, 	tankPressureStart: 211, 	tankPressureEnd: 52, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 13, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2017-09-15 04:06:00", 	timeOut: "2017-09-15 04:49:00", 	maxDepth: 29, 	tankPressureStart: 222, 	tankPressureEnd: 32, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Other", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 1, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	timeIn: "2017-09-29 07:49:00", 	timeOut: "2017-09-29 08:02:00", 	maxDepth: 21, 	tankPressureStart: 223, 	tankPressureEnd: 53, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 9, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	timeIn: "2017-10-05 12:09:00", 	timeOut: "2017-10-05 13:08:00", 	maxDepth: 38, 	tankPressureStart: 215, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 31, 	wetSuitType: "Shortie", 	wetSuitThickness: 7, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 11, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	timeIn: "2017-10-23 13:05:00", 	timeOut: "2017-10-23 13:30:00", 	maxDepth: 11, 	tankPressureStart: 208, 	tankPressureEnd: 20, 	tankType: "Aluminum", 	beltWeight: 20, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 2, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2017-11-01 06:45:00", 	timeOut: "2017-11-01 07:30:00", 	maxDepth: 20, 	tankPressureStart: 213, 	tankPressureEnd: 25, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 1, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2017-11-04 21:08:00", 	timeOut: "2017-11-04 21:42:00", 	maxDepth: 14, 	tankPressureStart: 217, 	tankPressureEnd: 34, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 2, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2017-12-04 12:15:00", 	timeOut: "2017-12-04 12:37:00", 	maxDepth: 17, 	tankPressureStart: 219, 	tankPressureEnd: 33, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 26, 	diverId: 2, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	timeIn: "2017-12-05 06:35:00", 	timeOut: "2017-12-05 06:54:00", 	maxDepth: 19, 	tankPressureStart: 207, 	tankPressureEnd: 58, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 14, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2017-12-21 16:25:00", 	timeOut: "2017-12-21 16:51:00", 	maxDepth: 19, 	tankPressureStart: 224, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 15, 	diverId: 4, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2017-12-31 12:50:00", 	timeOut: "2017-12-31 13:31:00", 	maxDepth: 30, 	tankPressureStart: 222, 	tankPressureEnd: 14, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 29, 	diverId: 7, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2018-01-20 01:16:00", 	timeOut: "2018-01-20 01:42:00", 	maxDepth: 31, 	tankPressureStart: 229, 	tankPressureEnd: 54, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 3, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	timeIn: "2018-02-04 18:07:00", 	timeOut: "2018-02-04 18:29:00", 	maxDepth: 16, 	tankPressureStart: 218, 	tankPressureEnd: 20, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 11, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	timeIn: "2018-02-06 17:59:00", 	timeOut: "2018-02-06 18:58:00", 	maxDepth: 32, 	tankPressureStart: 227, 	tankPressureEnd: 59, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 3, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	timeIn: "2018-02-11 20:47:00", 	timeOut: "2018-02-11 21:10:00", 	maxDepth: 35, 	tankPressureStart: 222, 	tankPressureEnd: 28, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 1, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2018-02-15 18:13:00", 	timeOut: "2018-02-15 19:05:00", 	maxDepth: 34, 	tankPressureStart: 216, 	tankPressureEnd: 4, 	tankType: "Steel", 	beltWeight: 3, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 29, 	diverId: 8, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2018-02-17 07:35:00", 	timeOut: "2018-02-17 07:54:00", 	maxDepth: 32, 	tankPressureStart: 210, 	tankPressureEnd: 27, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 7, 	diverId: 12, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	timeIn: "2018-03-17 18:49:00", 	timeOut: "2018-03-17 19:37:00", 	maxDepth: 14, 	tankPressureStart: 241, 	tankPressureEnd: 54, 	tankType: "Steel", 	beltWeight: 24, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 6, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2018-03-26 21:59:00", 	timeOut: "2018-03-26 23:01:00", 	maxDepth: 23, 	tankPressureStart: 209, 	tankPressureEnd: 32, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 5, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	timeIn: "2018-04-24 05:45:00", 	timeOut: "2018-04-24 06:31:00", 	maxDepth: 31, 	tankPressureStart: 222, 	tankPressureEnd: 25, 	tankType: "Steel", 	beltWeight: 2, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 12, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	timeIn: "2018-05-03 23:28:00", 	timeOut: "2018-05-04 00:49:00", 	maxDepth: 22, 	tankPressureStart: 222, 	tankPressureEnd: 43, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 7, 	diverId: 14, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2018-05-06 02:29:00", 	timeOut: "2018-05-06 02:48:00", 	maxDepth: 32, 	tankPressureStart: 214, 	tankPressureEnd: 48, 	tankType: "Steel", 	beltWeight: 17, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 12, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2018-05-11 23:31:00", 	timeOut: "2018-05-12 00:31:00", 	maxDepth: 33, 	tankPressureStart: 223, 	tankPressureEnd: 13, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 4, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2018-05-21 20:24:00", 	timeOut: "2018-05-21 21:18:00", 	maxDepth: 31, 	tankPressureStart: 203, 	tankPressureEnd: 27, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 5, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2018-05-23 23:27:00", 	timeOut: "2018-05-23 23:54:00", 	maxDepth: 38, 	tankPressureStart: 212, 	tankPressureEnd: 21, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 2, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2018-05-28 08:22:00", 	timeOut: "2018-05-28 08:42:00", 	maxDepth: 27, 	tankPressureStart: 232, 	tankPressureEnd: 26, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 11, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2018-06-02 01:42:00", 	timeOut: "2018-06-02 02:27:00", 	maxDepth: 23, 	tankPressureStart: 229, 	tankPressureEnd: 29, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 10, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	timeIn: "2018-06-08 18:04:00", 	timeOut: "2018-06-08 18:39:00", 	maxDepth: 28, 	tankPressureStart: 231, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 13, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	timeIn: "2018-06-24 10:00:00", 	timeOut: "2018-06-24 10:32:00", 	maxDepth: 33, 	tankPressureStart: 232, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 6, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2018-06-26 20:55:00", 	timeOut: "2018-06-26 21:32:00", 	maxDepth: 21, 	tankPressureStart: 215, 	tankPressureEnd: 12, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 15, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	timeIn: "2018-06-27 08:41:00", 	timeOut: "2018-06-27 09:10:00", 	maxDepth: 31, 	tankPressureStart: 217, 	tankPressureEnd: 32, 	tankType: "Aluminum", 	beltWeight: 18, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 13, 	diverId: 9, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	timeIn: "2018-07-07 12:09:00", 	timeOut: "2018-07-07 12:57:00", 	maxDepth: 24, 	tankPressureStart: 226, 	tankPressureEnd: 38, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 11, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2018-07-16 09:15:00", 	timeOut: "2018-07-16 09:57:00", 	maxDepth: 16, 	tankPressureStart: 220, 	tankPressureEnd: 9, 	tankType: "Aluminum", 	beltWeight: 18, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 12, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	timeIn: "2018-07-27 11:22:00", 	timeOut: "2018-07-27 12:01:00", 	maxDepth: 38, 	tankPressureStart: 225, 	tankPressureEnd: 40, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 5, 	diverId: 9, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2018-08-21 05:45:00", 	timeOut: "2018-08-21 06:12:00", 	maxDepth: 26, 	tankPressureStart: 219, 	tankPressureEnd: 19, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Other", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 14, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	timeIn: "2018-08-21 06:15:00", 	timeOut: "2018-08-21 07:05:00", 	maxDepth: 21, 	tankPressureStart: 215, 	tankPressureEnd: 3, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 7, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 3, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	timeIn: "2018-08-24 11:39:00", 	timeOut: "2018-08-24 12:01:00", 	maxDepth: 22, 	tankPressureStart: 218, 	tankPressureEnd: 47, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 7, 	diverId: 11, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	timeIn: "2018-08-24 21:32:00", 	timeOut: "2018-08-24 21:43:00", 	maxDepth: 18, 	tankPressureStart: 216, 	tankPressureEnd: 49, 	tankType: "Steel", 	beltWeight: 18, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 7, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 2, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2018-09-14 17:14:00", 	timeOut: "2018-09-14 17:56:00", 	maxDepth: 23, 	tankPressureStart: 226, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 9, 	diverId: 14, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2018-09-18 13:08:00", 	timeOut: "2018-09-18 13:43:00", 	maxDepth: 33, 	tankPressureStart: 235, 	tankPressureEnd: 51, 	tankType: "Steel", 	beltWeight: 3, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 15, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	timeIn: "2018-09-21 00:30:00", 	timeOut: "2018-09-21 00:56:00", 	maxDepth: 33, 	tankPressureStart: 229, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Other", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 4, 	diverId: 7, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2018-09-22 18:39:00", 	timeOut: "2018-09-22 19:33:00", 	maxDepth: 26, 	tankPressureStart: 217, 	tankPressureEnd: 58, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 1, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	timeIn: "2018-11-02 08:25:00", 	timeOut: "2018-11-02 09:15:00", 	maxDepth: 29, 	tankPressureStart: 225, 	tankPressureEnd: 27, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 1, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2018-11-19 11:13:00", 	timeOut: "2018-11-19 11:43:00", 	maxDepth: 32, 	tankPressureStart: 227, 	tankPressureEnd: 22, 	tankType: "Steel", 	beltWeight: 2, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 15, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	timeIn: "2018-11-20 07:14:00", 	timeOut: "2018-11-20 07:53:00", 	maxDepth: 17, 	tankPressureStart: 215, 	tankPressureEnd: 32, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 7, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2018-11-20 09:48:00", 	timeOut: "2018-11-20 11:00:00", 	maxDepth: 20, 	tankPressureStart: 222, 	tankPressureEnd: 30, 	tankType: "Steel", 	beltWeight: 18, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 11, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2018-11-22 03:46:00", 	timeOut: "2018-11-22 04:38:00", 	maxDepth: 16, 	tankPressureStart: 211, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 26, 	diverId: 9, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	timeIn: "2018-11-29 03:43:00", 	timeOut: "2018-11-29 04:28:00", 	maxDepth: 26, 	tankPressureStart: 217, 	tankPressureEnd: 51, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 13, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	timeIn: "2018-12-08 15:34:00", 	timeOut: "2018-12-08 15:47:00", 	maxDepth: 32, 	tankPressureStart: 239, 	tankPressureEnd: 59, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 24, 	diverId: 7, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2018-12-16 10:25:00", 	timeOut: "2018-12-16 11:00:00", 	maxDepth: 20, 	tankPressureStart: 215, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 7, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	timeIn: "2018-12-25 12:30:00", 	timeOut: "2018-12-25 12:48:00", 	maxDepth: 28, 	tankPressureStart: 222, 	tankPressureEnd: 42, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 15, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	timeIn: "2018-12-30 23:29:00", 	timeOut: "2018-12-31 00:09:00", 	maxDepth: 32, 	tankPressureStart: 215, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 6, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2019-01-01 09:01:00", 	timeOut: "2019-01-01 09:20:00", 	maxDepth: 26, 	tankPressureStart: 208, 	tankPressureEnd: 47, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 1, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	timeIn: "2019-01-10 02:01:00", 	timeOut: "2019-01-10 02:43:00", 	maxDepth: 21, 	tankPressureStart: 224, 	tankPressureEnd: 58, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 4, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	timeIn: "2019-01-14 01:46:00", 	timeOut: "2019-01-14 02:07:00", 	maxDepth: 29, 	tankPressureStart: 212, 	tankPressureEnd: 60, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 14, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2019-01-14 12:06:00", 	timeOut: "2019-01-14 12:34:00", 	maxDepth: 20, 	tankPressureStart: 210, 	tankPressureEnd: 54, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 2, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2019-01-23 05:37:00", 	timeOut: "2019-01-23 05:49:00", 	maxDepth: 24, 	tankPressureStart: 211, 	tankPressureEnd: 42, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 6, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	timeIn: "2019-01-27 18:39:00", 	timeOut: "2019-01-27 19:18:00", 	maxDepth: 37, 	tankPressureStart: 228, 	tankPressureEnd: 39, 	tankType: "Aluminum", 	beltWeight: 17, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 1, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	timeIn: "2019-01-28 22:11:00", 	timeOut: "2019-01-28 22:44:00", 	maxDepth: 25, 	tankPressureStart: 237, 	tankPressureEnd: 46, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 15, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	timeIn: "2019-02-14 07:48:00", 	timeOut: "2019-02-14 08:29:00", 	maxDepth: 26, 	tankPressureStart: 234, 	tankPressureEnd: 41, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 8, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	timeIn: "2019-02-17 22:58:00", 	timeOut: "2019-02-17 23:53:00", 	maxDepth: 31, 	tankPressureStart: 221, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 7, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 11, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	timeIn: "2019-02-22 20:03:00", 	timeOut: "2019-02-22 20:34:00", 	maxDepth: 18, 	tankPressureStart: 221, 	tankPressureEnd: 58, 	tankType: "Steel", 	beltWeight: 30, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 7, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	timeIn: "2019-03-09 11:13:00", 	timeOut: "2019-03-09 12:16:00", 	maxDepth: 27, 	tankPressureStart: 216, 	tankPressureEnd: 36, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 15, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2019-03-19 08:42:00", 	timeOut: "2019-03-19 09:37:00", 	maxDepth: 21, 	tankPressureStart: 224, 	tankPressureEnd: 40, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 5, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	timeIn: "2019-03-28 05:56:00", 	timeOut: "2019-03-28 06:43:00", 	maxDepth: 7, 	tankPressureStart: 220, 	tankPressureEnd: 22, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 15, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	timeIn: "2019-04-12 02:46:00", 	timeOut: "2019-04-12 03:25:00", 	maxDepth: 30, 	tankPressureStart: 224, 	tankPressureEnd: 37, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 6, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	timeIn: "2019-04-23 15:51:00", 	timeOut: "2019-04-23 16:49:00", 	maxDepth: 29, 	tankPressureStart: 225, 	tankPressureEnd: 56, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 11, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	timeIn: "2019-04-28 04:12:00", 	timeOut: "2019-04-28 04:48:00", 	maxDepth: 28, 	tankPressureStart: 216, 	tankPressureEnd: 50, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 9, 	offeredDiveId: 20, 	diveshopId: 9	})])


  // console.log(DiveBook)

  let counter = 0
  let fail =0
  for(let i = 0; i < DiveBook.length; i++) {
    let {id, offeredDiveId} = DiveBook[i]
    console.log("Log Id ------------> ",id)
    console.log("Offered Dive Id ---> ",offeredDiveId)

    let seen = Dice(ObservationOddsByOfferedDiveData[offeredDiveId - 1])
    console.log("Observations ------> ",seen)
    for(let j = 0; j < seen.length; ) {
      let seeing = seen.splice(0,1)[0]
      if(seen.indexOf(seeing) === -1) {
        console.log('Seen this dive ------>',seeing)
        counter++
        console.log('counter ------------->',counter)
        try {
          await Sighting.create({
            logId: id,
            observationId: ObservationHash[seeing]
          })
        } catch (error) {
          console.log(error)
          fail++
          console.log('fail ------------->',fail)
        }
      }
      else {
        console.log('Seen already ------>',seeing)
      }
    }
  }
  
  console.log("Total Counter ------> ",counter)
  console.log("Total Fail ------> ",fail)



  // const logs = await Promise.all([

    // Log.create({		diveName: "Yongala", 	isVerified: true, 	timeIn: "2016-01-02 03:28:00", 	timeOut: "2016-01-02 04:06:00", 	maxDepth: 32, 	tankPressureStart: 233, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 1, 	offeredDiveId: 4, 	diveshopId: 3	}),

    // Log.create({
    //   diveName: `Blue Corner Wall`,
    //   offeredDiveId: 2,
    //   diveshopId: 1,
    //   location: `Palau, Micronesia`,
    //   isVerified: true,
    //   diverId: 1 /* Cody */,
    //   timeIn: `2019-04-29 10:00:00`,
    //   timeOut: `2019-04-29 11:15:00`,
    //   maxDepth: 80,
    //   tankPressureStart: 220,
    //   tankPressureEnd: 60,
    //   tankType: `Aluminum`,
    //   beltWeight: 25,
    //   airMixture: `Oxygen`,
    //   description: `Heavenly`,
    //   wetSuitType: `The Spring Wetsuit`,
    //   wetSuitThickness: 3 /*mm*/,
    //   hasStrongCurrent: false,
    //   visibility: 20
    // }),

    // Log.create({
    //   diveName: `The Great Blue Hole`,
    //   offeredDiveId: 3,
    //   diveshopId: 2,
    //   location: `Belize City, Belize`,
    //   isVerified: true,
    //   diverId: 1 /* Cody */,
    //   timeIn: `2019-04-28 15:00:00`,
    //   timeOut: `2019-04-29 15:45:00`,
    //   maxDepth: 85,
    //   tankPressureStart: 250,
    //   tankPressureEnd: 40,
    //   tankType: `Steel`,
    //   beltWeight: 25,
    //   airMixture: `Oxygen`,
    //   description: `This is one massive sink hole!`,
    //   wetSuitType: `The Spring Wetsuit`,
    //   wetSuitThickness: 3 /*mm*/,
    //   hasStrongCurrent: false,
    //   visibility: 23
    // })
  // ])



  // const observations = await Promise.all([
  //   Observation.create({
  //     name: 'Whale Shark',
  //     category: 'fish',
  //     description:
  //       'slow-moving, filter-feeding carpet shark. the biggest fish in the sea!',
  //     color: 'blue',
  //     shape: 'bulbous'
  //   }),
  //   Observation.create({
  //     name: 'Nudibranch',
  //     category: 'mollusks',
  //     description: 'Sea slug. Lives on coral. Can grow to 4 inches.',
  //     color: 'red',
  //     shape: 'oblong'
  //   }),
  //   Observation.create({
  //     name: 'Psychedelic Frogfish',
  //     category: 'fish',
  //     description: 'Small, short, stocky, and masters of camoflage',
  //     color: 'orange'
  //   }),
  //   Observation.create({
  //     name: 'Seahorse',
  //     category: 'fish',
  //     description: 'Lives exclusively on coral. Masters of camoflage',
  //     color: 'yellow'
  //   }),
  //   Observation.create({
  //     name: 'Manta Ray',
  //     category: 'fish',
  //     description: 'Majestic creatures with a wingspan of 23 feet',
  //     color: 'gray',
  //     shape: 'diamond'
  //   }),
  //   Observation.create({
  //     name: 'Caribbean Reef Shark',
  //     category: 'fish',
  //     description: 'Shark! Scary!',
  //     color: 'gray'
  //   }),
  //   Observation.create({
  //     name: 'Moray Eel',
  //     category: 'fish',
  //     description: 'Mostly seen in brackish water.',
  //     color: 'green'
  //   }),
  //   Observation.create({
  //     name: 'Cuttlefish',
  //     category: 'mollusks',
  //     description: 'Shape-shifting, color-changing, beast',
  //     color: 'multicolored'
  //   }),
  //   Observation.create({
  //     name: 'Barrel Sponge',
  //     category: 'sponges',
  //     description: 'barrel-shaped sponge',
  //     color: 'pink'
  //   }),
  //   Observation.create({
  //     name: 'whip coral',
  //     category: 'coral',
  //     description: 'vine-shaped coral',
  //     color: 'white'
  //   }),
  //   Observation.create({
  //     name: 'HMCS Yukon',
  //     category: 'inanimate objects',
  //     description: 'Ship off of San Diego, California.',
  //     shape: 'shiplike'
  //   })
  // ])

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

  // Relationships

  // const badgesEarned = await Promise.all([
  //   EarnedBadge.create({
  //     diverId: 1,
  //     badgeId: 1
  //   }),
  //   EarnedBadge.create({
  //     diverId: 1,
  //     badgeId: 4
  //   }),
  //   EarnedBadge.create({
  //     diverId: 2,
  //     badgeId: 3
  //   })
  // ])

  // const sightings = await Promise.all([
  //   Sighting.create({
  //     logId: 1,
  //     observationId: 1
  //   }),
  //   Sighting.create({
  //     logId: 1,
  //     observationId: 2
  //   }),
  //   Sighting.create({
  //     logId: 1,
  //     observationId: 3
  //   }),
  //   Sighting.create({
  //     logId: 2,
  //     observationId: 4
  //   }),
  //   Sighting.create({
  //     logId: 2,
  //     observationId: 5
  //   }),
  //   Sighting.create({
  //     logId: 3,
  //     observationId: 6
  //   }),
  //   Sighting.create({
  //     logId: 3,
  //     observationId: 1
  //   })
  // ])

  // console.log(`seeded ${divers.length} users`)
  // console.log(`seeded ${offereddive.length} offered dives`)
  // console.log(`seeded ${logs.length} divers`)
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
