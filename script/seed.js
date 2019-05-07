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
const {DiveShopsData, OfferedDivesData, ObservationOddsByOfferedDiveData, ObservationsData, DiversData, Dice, ObservationHash, TourGuide} = require('../script/data')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

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

  const DiveBook = await Promise.all([			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-01-17", 	timeIn: "12:46:00", 	timeOut: "13:26:00", 	maxDepth: 22, 	tankPressureStart: 229, 	tankPressureEnd: 39, 	tankType: "Steel", 	beltWeight: 20, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 10, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-01-22", 	timeIn: "17:34:00", 	timeOut: "18:06:00", 	maxDepth: 35, 	tankPressureStart: 223, 	tankPressureEnd: 38, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 13, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2016-02-13", 	timeIn: "21:36:00", 	timeOut: "22:18:00", 	maxDepth: 11, 	tankPressureStart: 231, 	tankPressureEnd: 39, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 14, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2016-03-18", 	timeIn: "19:43:00", 	timeOut: "20:28:00", 	maxDepth: 22, 	tankPressureStart: 213, 	tankPressureEnd: 23, 	tankType: "Aluminum", 	beltWeight: 18, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 10, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2016-04-07", 	timeIn: "07:01:00", 	timeOut: "07:51:00", 	maxDepth: 32, 	tankPressureStart: 216, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 25, 	diverId: 12, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2016-04-12", 	timeIn: "15:17:00", 	timeOut: "15:38:00", 	maxDepth: 36, 	tankPressureStart: 225, 	tankPressureEnd: 6, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 4, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2016-04-21", 	timeIn: "00:58:00", 	timeOut: "01:31:00", 	maxDepth: 23, 	tankPressureStart: 221, 	tankPressureEnd: 42, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 2, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-04-23", 	timeIn: "21:31:00", 	timeOut: "22:03:00", 	maxDepth: 27, 	tankPressureStart: 214, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 1, 	diverId: 7, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2016-04-26", 	timeIn: "08:15:00", 	timeOut: "08:30:00", 	maxDepth: 27, 	tankPressureStart: 227, 	tankPressureEnd: 39, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 16, 	diverId: 11, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2016-04-27", 	timeIn: "03:26:00", 	timeOut: "03:54:00", 	maxDepth: 23, 	tankPressureStart: 231, 	tankPressureEnd: 33, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 28, 	diverId: 3, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2016-05-12", 	timeIn: "08:15:00", 	timeOut: "08:30:00", 	maxDepth: 22, 	tankPressureStart: 211, 	tankPressureEnd: 20, 	tankType: "Steel", 	beltWeight: 20, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 7, 	diverId: 10, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	date: "2016-05-17", 	timeIn: "19:56:00", 	timeOut: "20:46:00", 	maxDepth: 33, 	tankPressureStart: 218, 	tankPressureEnd: 49, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 10, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2016-05-18", 	timeIn: "23:52:00", 	timeOut: "00:29:00", 	maxDepth: 24, 	tankPressureStart: 221, 	tankPressureEnd: 16, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 23, 	diverId: 10, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2016-05-21", 	timeIn: "04:40:00", 	timeOut: "04:51:00", 	maxDepth: 26, 	tankPressureStart: 213, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Shortie", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 15, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2016-05-30", 	timeIn: "08:00:00", 	timeOut: "08:39:00", 	maxDepth: 29, 	tankPressureStart: 229, 	tankPressureEnd: 1, 	tankType: "Steel", 	beltWeight: 7, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 2, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2016-06-09", 	timeIn: "21:21:00", 	timeOut: "22:01:00", 	maxDepth: 35, 	tankPressureStart: 224, 	tankPressureEnd: 58, 	tankType: "Steel", 	beltWeight: 3, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 9, 	diverId: 1, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2016-06-11", 	timeIn: "11:54:00", 	timeOut: "12:27:00", 	maxDepth: 38, 	tankPressureStart: 225, 	tankPressureEnd: 45, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 12, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2016-06-15", 	timeIn: "13:01:00", 	timeOut: "13:43:00", 	maxDepth: 24, 	tankPressureStart: 221, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 13, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-06-23", 	timeIn: "02:58:00", 	timeOut: "03:36:00", 	maxDepth: 26, 	tankPressureStart: 226, 	tankPressureEnd: 32, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 5, 	diverId: 10, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2016-07-06", 	timeIn: "01:51:00", 	timeOut: "02:02:00", 	maxDepth: 21, 	tankPressureStart: 209, 	tankPressureEnd: 17, 	tankType: "Steel", 	beltWeight: 15, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 8, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2016-07-11", 	timeIn: "23:18:00", 	timeOut: "00:01:00", 	maxDepth: 28, 	tankPressureStart: 226, 	tankPressureEnd: 23, 	tankType: "Aluminum", 	beltWeight: 17, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 23, 	diverId: 15, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2016-07-25", 	timeIn: "10:06:00", 	timeOut: "10:51:00", 	maxDepth: 22, 	tankPressureStart: 224, 	tankPressureEnd: 57, 	tankType: "Aluminum", 	beltWeight: 7, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 11, 	diverId: 11, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2016-07-29", 	timeIn: "10:08:00", 	timeOut: "10:54:00", 	maxDepth: 33, 	tankPressureStart: 217, 	tankPressureEnd: 27, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 10, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-08-03", 	timeIn: "10:34:00", 	timeOut: "11:01:00", 	maxDepth: 32, 	tankPressureStart: 219, 	tankPressureEnd: 28, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 1, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2016-08-06", 	timeIn: "17:48:00", 	timeOut: "18:20:00", 	maxDepth: 20, 	tankPressureStart: 205, 	tankPressureEnd: 41, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 6, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2016-08-27", 	timeIn: "08:55:00", 	timeOut: "09:15:00", 	maxDepth: 23, 	tankPressureStart: 220, 	tankPressureEnd: 53, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 8, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2016-09-07", 	timeIn: "06:39:00", 	timeOut: "06:52:00", 	maxDepth: 33, 	tankPressureStart: 227, 	tankPressureEnd: 50, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 15, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2016-09-10", 	timeIn: "19:49:00", 	timeOut: "20:05:00", 	maxDepth: 7, 	tankPressureStart: 222, 	tankPressureEnd: 21, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 27, 	diverId: 4, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2016-10-09", 	timeIn: "05:37:00", 	timeOut: "06:39:00", 	maxDepth: 15, 	tankPressureStart: 208, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 20, 	diverId: 10, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2016-10-14", 	timeIn: "04:31:00", 	timeOut: "05:10:00", 	maxDepth: 36, 	tankPressureStart: 239, 	tankPressureEnd: 52, 	tankType: "Aluminum", 	beltWeight: 7, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 4, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2016-10-15", 	timeIn: "18:19:00", 	timeOut: "18:50:00", 	maxDepth: 29, 	tankPressureStart: 228, 	tankPressureEnd: 52, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 11, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2016-10-15", 	timeIn: "07:18:00", 	timeOut: "07:33:00", 	maxDepth: 24, 	tankPressureStart: 213, 	tankPressureEnd: 56, 	tankType: "Aluminum", 	beltWeight: 20, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 12, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2016-10-23", 	timeIn: "02:29:00", 	timeOut: "03:22:00", 	maxDepth: 35, 	tankPressureStart: 215, 	tankPressureEnd: 47, 	tankType: "Steel", 	beltWeight: 18, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 12, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2016-10-30", 	timeIn: "22:07:00", 	timeOut: "23:06:00", 	maxDepth: 32, 	tankPressureStart: 232, 	tankPressureEnd: 47, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 14, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Molokini Crater Wall", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2016-10-31", 	timeIn: "06:54:00", 	timeOut: "07:43:00", 	maxDepth: 37, 	tankPressureStart: 226, 	tankPressureEnd: 47, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 10, 	offeredDiveId: 14, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2016-11-06", 	timeIn: "21:21:00", 	timeOut: "21:40:00", 	maxDepth: 21, 	tankPressureStart: 235, 	tankPressureEnd: 26, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 7, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2016-11-08", 	timeIn: "17:26:00", 	timeOut: "18:27:00", 	maxDepth: 26, 	tankPressureStart: 217, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 6, 	diverId: 12, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2016-11-26", 	timeIn: "07:51:00", 	timeOut: "08:22:00", 	maxDepth: 37, 	tankPressureStart: 218, 	tankPressureEnd: 47, 	tankType: "Steel", 	beltWeight: 3, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 8, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2016-11-28", 	timeIn: "04:11:00", 	timeOut: "04:37:00", 	maxDepth: 19, 	tankPressureStart: 217, 	tankPressureEnd: 8, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 7, 	diverId: 9, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2016-12-01", 	timeIn: "10:57:00", 	timeOut: "11:44:00", 	maxDepth: 21, 	tankPressureStart: 214, 	tankPressureEnd: 25, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 2, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2016-12-28", 	timeIn: "07:15:00", 	timeOut: "07:41:00", 	maxDepth: 27, 	tankPressureStart: 224, 	tankPressureEnd: 60, 	tankType: "Steel", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 12, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2016-12-28", 	timeIn: "12:51:00", 	timeOut: "13:25:00", 	maxDepth: 23, 	tankPressureStart: 222, 	tankPressureEnd: 10, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 12, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2017-01-01", 	timeIn: "21:13:00", 	timeOut: "21:49:00", 	maxDepth: 26, 	tankPressureStart: 216, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 11, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-01-04", 	timeIn: "23:11:00", 	timeOut: "23:26:00", 	maxDepth: 29, 	tankPressureStart: 227, 	tankPressureEnd: 25, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 11, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2017-01-07", 	timeIn: "15:33:00", 	timeOut: "16:15:00", 	maxDepth: 26, 	tankPressureStart: 228, 	tankPressureEnd: 41, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 12, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2017-01-14", 	timeIn: "23:34:00", 	timeOut: "23:56:00", 	maxDepth: 12, 	tankPressureStart: 212, 	tankPressureEnd: 33, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 10, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2017-01-20", 	timeIn: "06:54:00", 	timeOut: "07:56:00", 	maxDepth: 34, 	tankPressureStart: 227, 	tankPressureEnd: 48, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 5, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2017-02-05", 	timeIn: "17:03:00", 	timeOut: "17:35:00", 	maxDepth: 19, 	tankPressureStart: 226, 	tankPressureEnd: 22, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 13, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-02-24", 	timeIn: "20:47:00", 	timeOut: "21:14:00", 	maxDepth: 31, 	tankPressureStart: 222, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 7, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2017-02-25", 	timeIn: "16:55:00", 	timeOut: "17:19:00", 	maxDepth: 36, 	tankPressureStart: 233, 	tankPressureEnd: 47, 	tankType: "Steel", 	beltWeight: 15, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 3, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-03-01", 	timeIn: "21:32:00", 	timeOut: "21:51:00", 	maxDepth: 22, 	tankPressureStart: 206, 	tankPressureEnd: 21, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 6, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2017-03-20", 	timeIn: "17:09:00", 	timeOut: "18:05:00", 	maxDepth: 26, 	tankPressureStart: 214, 	tankPressureEnd: 36, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 9, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-03-21", 	timeIn: "06:16:00", 	timeOut: "06:48:00", 	maxDepth: 21, 	tankPressureStart: 223, 	tankPressureEnd: 26, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 3, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2017-03-24", 	timeIn: "23:07:00", 	timeOut: "23:41:00", 	maxDepth: 26, 	tankPressureStart: 222, 	tankPressureEnd: 35, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 14, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2017-04-05", 	timeIn: "02:28:00", 	timeOut: "03:20:00", 	maxDepth: 34, 	tankPressureStart: 222, 	tankPressureEnd: 54, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 6, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2017-04-10", 	timeIn: "22:33:00", 	timeOut: "23:07:00", 	maxDepth: 26, 	tankPressureStart: 205, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 13, 	diverId: 15, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Barracuda Point", 	location: "Sipadan Island, Malaysia", 	isVerified: true, 	date: "2017-04-14", 	timeIn: "08:47:00", 	timeOut: "09:42:00", 	maxDepth: 33, 	tankPressureStart: 211, 	tankPressureEnd: 45, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 13, 	diverId: 4, 	offeredDiveId: 1, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-04-29", 	timeIn: "01:40:00", 	timeOut: "02:35:00", 	maxDepth: 36, 	tankPressureStart: 216, 	tankPressureEnd: 40, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 25, 	diverId: 1, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2017-05-15", 	timeIn: "01:23:00", 	timeOut: "02:08:00", 	maxDepth: 31, 	tankPressureStart: 221, 	tankPressureEnd: 47, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 6, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2017-05-24", 	timeIn: "21:26:00", 	timeOut: "21:44:00", 	maxDepth: 29, 	tankPressureStart: 201, 	tankPressureEnd: 49, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 13, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2017-05-25", 	timeIn: "11:43:00", 	timeOut: "12:09:00", 	maxDepth: 22, 	tankPressureStart: 237, 	tankPressureEnd: 14, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 1, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2017-06-02", 	timeIn: "16:03:00", 	timeOut: "16:49:00", 	maxDepth: 20, 	tankPressureStart: 218, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 2, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 11, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2017-07-06", 	timeIn: "06:01:00", 	timeOut: "06:52:00", 	maxDepth: 18, 	tankPressureStart: 223, 	tankPressureEnd: 25, 	tankType: "Steel", 	beltWeight: 21, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 6, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-07-18", 	timeIn: "19:12:00", 	timeOut: "19:52:00", 	maxDepth: 31, 	tankPressureStart: 215, 	tankPressureEnd: 54, 	tankType: "Steel", 	beltWeight: 9, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 16, 	diverId: 3, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-07-25", 	timeIn: "13:50:00", 	timeOut: "14:17:00", 	maxDepth: 21, 	tankPressureStart: 222, 	tankPressureEnd: 17, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 1, 	diverId: 1, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2017-07-27", 	timeIn: "13:08:00", 	timeOut: "13:37:00", 	maxDepth: 28, 	tankPressureStart: 211, 	tankPressureEnd: 40, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 15, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2017-08-02", 	timeIn: "01:26:00", 	timeOut: "02:04:00", 	maxDepth: 30, 	tankPressureStart: 224, 	tankPressureEnd: 50, 	tankType: "Steel", 	beltWeight: 11, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 3, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2017-08-10", 	timeIn: "16:29:00", 	timeOut: "17:35:00", 	maxDepth: 27, 	tankPressureStart: 218, 	tankPressureEnd: 15, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 7, 	diverId: 4, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-09-02", 	timeIn: "17:04:00", 	timeOut: "17:47:00", 	maxDepth: 34, 	tankPressureStart: 223, 	tankPressureEnd: 38, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 20, 	diverId: 13, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2017-09-04", 	timeIn: "01:42:00", 	timeOut: "02:24:00", 	maxDepth: 28, 	tankPressureStart: 212, 	tankPressureEnd: 30, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 28, 	diverId: 4, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2017-09-15", 	timeIn: "13:26:00", 	timeOut: "14:07:00", 	maxDepth: 15, 	tankPressureStart: 216, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 11, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2017-09-16", 	timeIn: "15:01:00", 	timeOut: "15:47:00", 	maxDepth: 28, 	tankPressureStart: 219, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 12, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2017-09-17", 	timeIn: "01:07:00", 	timeOut: "02:18:00", 	maxDepth: 18, 	tankPressureStart: 236, 	tankPressureEnd: 44, 	tankType: "Steel", 	beltWeight: 3, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 22, 	diverId: 14, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2017-09-21", 	timeIn: "16:39:00", 	timeOut: "17:06:00", 	maxDepth: 25, 	tankPressureStart: 207, 	tankPressureEnd: 38, 	tankType: "Aluminum", 	beltWeight: 17, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 7, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 5, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2017-10-01", 	timeIn: "07:00:00", 	timeOut: "07:42:00", 	maxDepth: 31, 	tankPressureStart: 223, 	tankPressureEnd: 39, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 5, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2017-10-02", 	timeIn: "05:58:00", 	timeOut: "06:50:00", 	maxDepth: 27, 	tankPressureStart: 220, 	tankPressureEnd: 23, 	tankType: "Aluminum", 	beltWeight: 2, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 1, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2017-10-18", 	timeIn: "06:39:00", 	timeOut: "07:18:00", 	maxDepth: 25, 	tankPressureStart: 229, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 12, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2017-10-27", 	timeIn: "04:02:00", 	timeOut: "04:36:00", 	maxDepth: 36, 	tankPressureStart: 219, 	tankPressureEnd: 41, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 9, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-11-07", 	timeIn: "09:06:00", 	timeOut: "09:46:00", 	maxDepth: 28, 	tankPressureStart: 216, 	tankPressureEnd: 22, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 7, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2017-11-13", 	timeIn: "03:15:00", 	timeOut: "04:06:00", 	maxDepth: 26, 	tankPressureStart: 213, 	tankPressureEnd: 45, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 9, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-11-21", 	timeIn: "01:16:00", 	timeOut: "02:01:00", 	maxDepth: 26, 	tankPressureStart: 206, 	tankPressureEnd: 55, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 12, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2017-11-30", 	timeIn: "00:34:00", 	timeOut: "01:38:00", 	maxDepth: 28, 	tankPressureStart: 232, 	tankPressureEnd: 45, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 24, 	diverId: 13, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2017-12-02", 	timeIn: "10:48:00", 	timeOut: "11:25:00", 	maxDepth: 32, 	tankPressureStart: 223, 	tankPressureEnd: 34, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 6, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2017-12-06", 	timeIn: "06:34:00", 	timeOut: "07:28:00", 	maxDepth: 14, 	tankPressureStart: 235, 	tankPressureEnd: 45, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 5, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2017-12-14", 	timeIn: "12:00:00", 	timeOut: "12:33:00", 	maxDepth: 38, 	tankPressureStart: 226, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 11, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2017-12-27", 	timeIn: "22:32:00", 	timeOut: "23:01:00", 	maxDepth: 17, 	tankPressureStart: 214, 	tankPressureEnd: 19, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 7, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2017-12-28", 	timeIn: "00:53:00", 	timeOut: "01:32:00", 	maxDepth: 26, 	tankPressureStart: 231, 	tankPressureEnd: 29, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 11, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "The Great Blue Hole", 	location: "Belize City, Belize", 	isVerified: true, 	date: "2017-12-30", 	timeIn: "23:08:00", 	timeOut: "23:51:00", 	maxDepth: 23, 	tankPressureStart: 234, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 1, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 26, 	diverId: 1, 	offeredDiveId: 3, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2018-01-04", 	timeIn: "14:40:00", 	timeOut: "15:06:00", 	maxDepth: 33, 	tankPressureStart: 220, 	tankPressureEnd: 57, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 11, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2018-01-09", 	timeIn: "15:00:00", 	timeOut: "15:48:00", 	maxDepth: 20, 	tankPressureStart: 216, 	tankPressureEnd: 31, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 8, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2018-01-18", 	timeIn: "17:07:00", 	timeOut: "17:49:00", 	maxDepth: 30, 	tankPressureStart: 226, 	tankPressureEnd: 44, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 21, 	diverId: 1, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2018-01-20", 	timeIn: "18:37:00", 	timeOut: "18:48:00", 	maxDepth: 24, 	tankPressureStart: 221, 	tankPressureEnd: 20, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 19, 	diverId: 14, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-01-25", 	timeIn: "07:02:00", 	timeOut: "07:32:00", 	maxDepth: 26, 	tankPressureStart: 218, 	tankPressureEnd: 31, 	tankType: "Steel", 	beltWeight: 12, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 7, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-02-02", 	timeIn: "16:04:00", 	timeOut: "16:35:00", 	maxDepth: 38, 	tankPressureStart: 217, 	tankPressureEnd: 19, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 22, 	diverId: 13, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Verde Islands", 	location: "Verde Island, Philippines", 	isVerified: true, 	date: "2018-02-10", 	timeIn: "16:20:00", 	timeOut: "17:05:00", 	maxDepth: 33, 	tankPressureStart: 223, 	tankPressureEnd: 23, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 14, 	offeredDiveId: 15, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2018-02-15", 	timeIn: "00:50:00", 	timeOut: "01:18:00", 	maxDepth: 30, 	tankPressureStart: 217, 	tankPressureEnd: 28, 	tankType: "Aluminum", 	beltWeight: 20, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 7, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 15, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-03-05", 	timeIn: "23:58:00", 	timeOut: "00:52:00", 	maxDepth: 38, 	tankPressureStart: 225, 	tankPressureEnd: 14, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 12, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2018-03-11", 	timeIn: "07:17:00", 	timeOut: "07:56:00", 	maxDepth: 32, 	tankPressureStart: 222, 	tankPressureEnd: 43, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 29, 	diverId: 12, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2018-03-13", 	timeIn: "17:19:00", 	timeOut: "17:49:00", 	maxDepth: 26, 	tankPressureStart: 220, 	tankPressureEnd: 47, 	tankType: "Steel", 	beltWeight: 3, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 2, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2018-03-16", 	timeIn: "10:24:00", 	timeOut: "10:57:00", 	maxDepth: 27, 	tankPressureStart: 219, 	tankPressureEnd: 47, 	tankType: "Aluminum", 	beltWeight: 2, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 15, 	diverId: 9, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-03-23", 	timeIn: "21:21:00", 	timeOut: "21:40:00", 	maxDepth: 28, 	tankPressureStart: 227, 	tankPressureEnd: 38, 	tankType: "Steel", 	beltWeight: 19, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 11, 	diverId: 11, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2018-04-02", 	timeIn: "15:20:00", 	timeOut: "16:14:00", 	maxDepth: 28, 	tankPressureStart: 235, 	tankPressureEnd: 55, 	tankType: "Steel", 	beltWeight: 21, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 1, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2018-04-04", 	timeIn: "03:14:00", 	timeOut: "04:08:00", 	maxDepth: 32, 	tankPressureStart: 216, 	tankPressureEnd: 25, 	tankType: "Aluminum", 	beltWeight: 24, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 5, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2018-04-07", 	timeIn: "01:10:00", 	timeOut: "01:45:00", 	maxDepth: 18, 	tankPressureStart: 221, 	tankPressureEnd: 57, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 14, 	diverId: 7, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2018-04-22", 	timeIn: "05:40:00", 	timeOut: "06:22:00", 	maxDepth: 24, 	tankPressureStart: 205, 	tankPressureEnd: 60, 	tankType: "Aluminum", 	beltWeight: 12, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 13, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Darwin Arch", 	location: "Galapagos Islands, Ecuador", 	isVerified: true, 	date: "2018-04-22", 	timeIn: "22:30:00", 	timeOut: "23:19:00", 	maxDepth: 28, 	tankPressureStart: 229, 	tankPressureEnd: 61, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 14, 	offeredDiveId: 13, 	diveshopId: 2	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2018-04-25", 	timeIn: "16:56:00", 	timeOut: "17:50:00", 	maxDepth: 32, 	tankPressureStart: 212, 	tankPressureEnd: 42, 	tankType: "Steel", 	beltWeight: 8, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 27, 	diverId: 11, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2018-05-03", 	timeIn: "20:19:00", 	timeOut: "20:59:00", 	maxDepth: 21, 	tankPressureStart: 225, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 25, 	diverId: 3, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2018-05-04", 	timeIn: "04:06:00", 	timeOut: "04:51:00", 	maxDepth: 28, 	tankPressureStart: 221, 	tankPressureEnd: 36, 	tankType: "Aluminum", 	beltWeight: 3, 	wetSuitType: "Other", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 8, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2018-05-20", 	timeIn: "13:27:00", 	timeOut: "13:53:00", 	maxDepth: 21, 	tankPressureStart: 217, 	tankPressureEnd: 22, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 25, 	diverId: 12, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-05-21", 	timeIn: "20:18:00", 	timeOut: "20:59:00", 	maxDepth: 36, 	tankPressureStart: 220, 	tankPressureEnd: 44, 	tankType: "Steel", 	beltWeight: 15, 	wetSuitType: "Other", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 11, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Palawan", 	location: "Palawan, Philippines", 	isVerified: true, 	date: "2018-05-22", 	timeIn: "02:28:00", 	timeOut: "03:19:00", 	maxDepth: 23, 	tankPressureStart: 213, 	tankPressureEnd: 57, 	tankType: "Aluminum", 	beltWeight: 6, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 6, 	diverId: 6, 	offeredDiveId: 12, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2018-05-25", 	timeIn: "15:10:00", 	timeOut: "15:56:00", 	maxDepth: 31, 	tankPressureStart: 233, 	tankPressureEnd: 50, 	tankType: "Aluminum", 	beltWeight: 11, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 9, 	diverId: 8, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2018-06-06", 	timeIn: "16:28:00", 	timeOut: "17:27:00", 	maxDepth: 30, 	tankPressureStart: 223, 	tankPressureEnd: 37, 	tankType: "Steel", 	beltWeight: 5, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 10, 	diverId: 13, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2018-06-12", 	timeIn: "07:10:00", 	timeOut: "07:47:00", 	maxDepth: 32, 	tankPressureStart: 228, 	tankPressureEnd: 50, 	tankType: "Aluminum", 	beltWeight: 2, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 15, 	diverId: 8, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Ship Rock", 	location: "Santa Catalina Island, California", 	isVerified: true, 	date: "2018-06-22", 	timeIn: "17:18:00", 	timeOut: "17:56:00", 	maxDepth: 22, 	tankPressureStart: 228, 	tankPressureEnd: 34, 	tankType: "Steel", 	beltWeight: 4, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 2, 	offeredDiveId: 17, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2018-06-30", 	timeIn: "07:08:00", 	timeOut: "08:12:00", 	maxDepth: 28, 	tankPressureStart: 210, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 9, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 14, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-07-31", 	timeIn: "19:17:00", 	timeOut: "20:06:00", 	maxDepth: 38, 	tankPressureStart: 211, 	tankPressureEnd: 39, 	tankType: "Steel", 	beltWeight: 16, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 29, 	diverId: 14, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Shark And Yolanda Reefs", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-08-03", 	timeIn: "01:12:00", 	timeOut: "01:35:00", 	maxDepth: 29, 	tankPressureStart: 233, 	tankPressureEnd: 34, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 13, 	diverId: 4, 	offeredDiveId: 6, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2018-08-06", 	timeIn: "11:35:00", 	timeOut: "12:03:00", 	maxDepth: 16, 	tankPressureStart: 223, 	tankPressureEnd: 34, 	tankType: "Aluminum", 	beltWeight: 17, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 18, 	diverId: 14, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Monterey Bay National Marine Sanctuary", 	location: "Monterey Bay, California", 	isVerified: true, 	date: "2018-08-20", 	timeIn: "06:53:00", 	timeOut: "07:47:00", 	maxDepth: 34, 	tankPressureStart: 228, 	tankPressureEnd: 46, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 14, 	diverId: 14, 	offeredDiveId: 16, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2018-08-27", 	timeIn: "01:24:00", 	timeOut: "02:30:00", 	maxDepth: 19, 	tankPressureStart: 223, 	tankPressureEnd: 57, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 3, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 23, 	diverId: 12, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2018-10-04", 	timeIn: "14:22:00", 	timeOut: "15:03:00", 	maxDepth: 10, 	tankPressureStart: 213, 	tankPressureEnd: 26, 	tankType: "Steel", 	beltWeight: 14, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 24, 	diverId: 8, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-10-13", 	timeIn: "02:27:00", 	timeOut: "02:54:00", 	maxDepth: 17, 	tankPressureStart: 223, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 5, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 21, 	diverId: 11, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2018-10-26", 	timeIn: "15:24:00", 	timeOut: "15:50:00", 	maxDepth: 21, 	tankPressureStart: 224, 	tankPressureEnd: 40, 	tankType: "Steel", 	beltWeight: 24, 	wetSuitType: "Shortie", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 16, 	diverId: 8, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Liberty", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2018-12-01", 	timeIn: "04:13:00", 	timeOut: "04:53:00", 	maxDepth: 16, 	tankPressureStart: 225, 	tankPressureEnd: 61, 	tankType: "Aluminum", 	beltWeight: 13, 	wetSuitType: "Shortie", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 19, 	diverId: 6, 	offeredDiveId: 10, 	diveshopId: 6	}),
			Log.create(	{		diveName: "Navy Pier", 	location: "Navy Pier, Western Australia", 	isVerified: true, 	date: "2018-12-02", 	timeIn: "09:23:00", 	timeOut: "10:10:00", 	maxDepth: 27, 	tankPressureStart: 216, 	tankPressureEnd: 42, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 15, 	diverId: 12, 	offeredDiveId: 9, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Wreck Valley", 	location: "New York, NY", 	isVerified: true, 	date: "2019-01-03", 	timeIn: "18:32:00", 	timeOut: "19:28:00", 	maxDepth: 18, 	tankPressureStart: 218, 	tankPressureEnd: 23, 	tankType: "Steel", 	beltWeight: 10, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 22, 	diverId: 11, 	offeredDiveId: 20, 	diveshopId: 9	}),
			Log.create(	{		diveName: "Kormoran", 	location: "Ras Mohammed, Egypt", 	isVerified: true, 	date: "2019-01-22", 	timeIn: "15:36:00", 	timeOut: "16:29:00", 	maxDepth: 30, 	tankPressureStart: 237, 	tankPressureEnd: 25, 	tankType: "Steel", 	beltWeight: 2, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 10, 	diverId: 12, 	offeredDiveId: 7, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2019-01-25", 	timeIn: "02:52:00", 	timeOut: "03:37:00", 	maxDepth: 21, 	tankPressureStart: 216, 	tankPressureEnd: 38, 	tankType: "Steel", 	beltWeight: 1, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 11, 	diverId: 12, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2019-02-16", 	timeIn: "13:38:00", 	timeOut: "14:10:00", 	maxDepth: 26, 	tankPressureStart: 219, 	tankPressureEnd: 46, 	tankType: "Aluminum", 	beltWeight: 8, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 7, 	diverId: 1, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "Thistlegorm", 	location: "Sharm El-Sheikh, Egypt", 	isVerified: true, 	date: "2019-02-18", 	timeIn: "15:12:00", 	timeOut: "15:54:00", 	maxDepth: 20, 	tankPressureStart: 211, 	tankPressureEnd: 49, 	tankType: "Aluminum", 	beltWeight: 16, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 1, 	offeredDiveId: 5, 	diveshopId: 4	}),
			Log.create(	{		diveName: "Manta Ray Night Dive", 	location: "Honolulu, Hawaii", 	isVerified: true, 	date: "2019-02-21", 	timeIn: "06:46:00", 	timeOut: "07:34:00", 	maxDepth: 14, 	tankPressureStart: 228, 	tankPressureEnd: 50, 	tankType: "Aluminum", 	beltWeight: 2, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 1, 	offeredDiveId: 8, 	diveshopId: 5	}),
			Log.create(	{		diveName: "Blue Corner Wall", 	location: "Palau, Micronesia", 	isVerified: true, 	date: "2019-02-23", 	timeIn: "08:57:00", 	timeOut: "09:18:00", 	maxDepth: 29, 	tankPressureStart: 219, 	tankPressureEnd: 34, 	tankType: "Aluminum", 	beltWeight: 4, 	wetSuitType: "None", 	wetSuitThickness: 0, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 12, 	diverId: 10, 	offeredDiveId: 2, 	diveshopId: 1	}),
			Log.create(	{		diveName: "The Coral Garden", 	location: "Bali, Indonesia", 	isVerified: true, 	date: "2019-02-27", 	timeIn: "00:35:00", 	timeOut: "01:05:00", 	maxDepth: 26, 	tankPressureStart: 205, 	tankPressureEnd: 39, 	tankType: "Aluminum", 	beltWeight: 10, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 9, 	offeredDiveId: 11, 	diveshopId: 6	}),
			Log.create(	{		diveName: "USS Spiegel Grove", 	location: "Florida Keys, Florida", 	isVerified: true, 	date: "2019-03-19", 	timeIn: "14:28:00", 	timeOut: "15:02:00", 	maxDepth: 19, 	tankPressureStart: 222, 	tankPressureEnd: 32, 	tankType: "Steel", 	beltWeight: 19, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 1, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 18, 	diverId: 3, 	offeredDiveId: 19, 	diveshopId: 8	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2019-03-23", 	timeIn: "06:08:00", 	timeOut: "07:03:00", 	maxDepth: 23, 	tankPressureStart: 214, 	tankPressureEnd: 38, 	tankType: "Steel", 	beltWeight: 6, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 17, 	diverId: 1, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2019-03-31", 	timeIn: "11:56:00", 	timeOut: "12:33:00", 	maxDepth: 32, 	tankPressureStart: 227, 	tankPressureEnd: 4, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 1, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 16, 	diverId: 8, 	offeredDiveId: 18, 	diveshopId: 7	}),
			Log.create(	{		diveName: "Yongala", 	location: "Yongala, Australia", 	isVerified: true, 	date: "2019-04-14", 	timeIn: "01:42:00", 	timeOut: "02:28:00", 	maxDepth: 38, 	tankPressureStart: 225, 	tankPressureEnd: 24, 	tankType: "Aluminum", 	beltWeight: 20, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 7, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 8, 	diverId: 7, 	offeredDiveId: 4, 	diveshopId: 3	}),
			Log.create(	{		diveName: "Channel Islands National Park", 	location: "Channel Islands National Park", 	isVerified: true, 	date: "2019-04-23", 	timeIn: "18:13:00", 	timeOut: "18:57:00", 	maxDepth: 13, 	tankPressureStart: 232, 	tankPressureEnd: 23, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Dry Suit", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 12, 	offeredDiveId: 18, 	diveshopId: 7	})])

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

      await TourGuide(DiveBook, ObservationOddsByOfferedDiveData, ObservationHash)


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
  //     location: "Sipadan Island, Malaysia",
  //     description:
  //       'Sipadan is a world-class destination, long attracting divers from around the world. Barracuda Point is one of the standout dive sites among many.',
  //     diveshopId: 1,
  //     imageURL: "BarracudaPoint.jpg"
  //   }),
  //   OfferedDive.create({
  //     name: 'Blue Corner Wall',
  //     location: "Palau, Micronesia",
  //     description:
  //       'Blue Corner Palau is one of the most action-packed scuba dive sites in the world and up to 13 different species of sharks circling just beyond the plummeting reef wall.',
  //     diveshopId: 1,
  //     imageURL: "BlueCornerWall.jpg"
  //   }),
  //   OfferedDive.create({
  //     name: 'The Great Blue Hole',
  //     location: "Belize City, Belize",
  //     description:
  //       'The Great Blue Hole is a giant marine sinkhole off the coast of Belize. It lies near the center of Lighthouse Reef.',
  //     diveshopId: 2,
  //     imageURL: "TheGreatBlueHole.jpg"
  //   })
  // ])

  // const badges = await Promise.all([
  //   Badge.create({name: 'Juvenile', description: 'Logged at least 10 dives'}),
  //   Badge.create({name: 'Aquaman', description: 'Dived beyond 30 meters'}),
  //   Badge.create({name: 'Discoverer', description: 'Made 40 observations'}),
  //   Badge.create({name: 'Voyager', description: 'Dived in over 10 places'})
  // ])

  // await Log.create(
  // {		diveName: "Yongala", 	isVerified: true, 	timeIn: "2016-01-02 03:28:00", 	timeOut: "2016-01-02 04:06:00", 	maxDepth: 32, 	tankPressureStart: 233, 	tankPressureEnd: 35, 	tankType: "Aluminum", 	beltWeight: 15, 	wetSuitType: "Shortie", 	wetSuitThickness: 3, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 12, 	diverId: 1, 	offeredDiveId: 4, 	diveshopId: 3	}
  // )

  // await Log.create(
  // {		diveName: "Palawan", 	isVerified: true, 	timeIn: "2016-01-02 21:13:00", 	timeOut: "2016-01-02 21:56:00", 	maxDepth: 22, 	tankPressureStart: 225, 	tankPressureEnd: 52, 	tankType: "Aluminum", 	beltWeight: 14, 	wetSuitType: "Fulljohn", 	wetSuitThickness: 5, 	airMixture: "Nitrox", 	description: "Best dive ever!!!", 	hasStrongCurrent: true, 	visibility: 13, 	diverId: 7, 	offeredDiveId: 12, 	diveshopId: 1	}
  // )

  // await Log.create(
  // {		diveName: "Wreck Valley", 	isVerified: true, 	timeIn: "2016-01-14 03:24:00", 	timeOut: "2016-01-14 03:58:00", 	maxDepth: 24, 	tankPressureStart: 220, 	tankPressureEnd: 53, 	tankType: "Steel", 	beltWeight: 2, 	wetSuitType: "Shortie", 	wetSuitThickness: 5, 	airMixture: "Air", 	description: "Best dive ever!!!", 	hasStrongCurrent: false, 	visibility: 9, 	diverId: 5, 	offeredDiveId: 20, 	diveshopId: 9	}
  // )

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

  // const certification = await Promise.all([
  //   Certification.create({
  //     certId: '001PADI',
  //     provider: 'PADI',
  //     date: '2019-05-01',
  //     level: 'Advanced Skills Diver',
  //     instructorId: 'James9999',
  //     diverId: 1
  //   }),
  //   Certification.create({
  //     certId: '002SSI',
  //     provider: 'SSI',
  //     date: '2016-10-01',
  //     level: 'Underwater Navigation',
  //     instructorId: 'Dan8888',
  //     diverId: 1
  //   })
  // ])

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
