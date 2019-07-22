'use strict'

const db = require('../server/db')

// const {
//     Diver,
//     DiveShop,
//     Certification,
//     OfferedDive,
//     Log,
//     Badge,
//     Observation,
//   } = require('../server/db/models')

//   const {
//     DiveShopsData,
//     OfferedDivesData,
//     ObservationOddsByOfferedDiveData,
//     ObservationsData,
//     DiversData,
//     ObservationHash,
//     TourGuide
// } = require('./data')
  

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  console.log(`Loading Locations for: Logs`)
 
  const AddressBook = await Promise.all([	db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 1'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 2'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 3'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 4'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 5'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 6'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 7'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 8'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 9'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 10'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 11'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 12'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 13'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 14'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 15'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 16'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 17'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 18'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 19'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 20'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 21'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 22'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 23'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 24'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 25'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 26'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 27'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 28'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 29'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 30'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 31'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 32'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 33'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 34'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 35'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 36'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 37'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 38'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 39'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 40'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 41'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 42'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 43'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 44'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 45'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(35.538056,-23.794722),4326) where id = 46'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 47'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 48'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 49'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 50'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 51'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 52'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 53'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 54'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 55'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 56'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 57'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 58'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 59'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 60'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 61'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(35.538056,-23.794722),4326) where id = 62'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 63'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 64'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 65'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 66'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 67'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 68'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 69'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 70'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 71'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 72'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 73'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 74'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 75'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 76'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 77'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 78'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 79'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 80'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 81'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 82'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 83'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 84'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 85'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 86'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 87'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 88'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(35.538056,-23.794722),4326) where id = 89'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 90'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 91'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 92'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 93'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 94'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 95'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 96'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 97'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 98'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 99'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 100'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 101'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 102'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 103'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 104'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 105'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 106'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 107'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 108'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 109'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 110'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 111'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 112'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 113'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 114'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 115'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 116'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 117'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 118'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 119'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 120'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 121'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 122'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 123'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 124'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 125'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 126'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 127'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 128'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 129'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 130'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 131'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 132'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 133'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 134'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 135'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 136'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 137'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 138'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 139'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(35.538056,-23.794722),4326) where id = 140'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 141'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 142'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 143'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 144'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(35.538056,-23.794722),4326) where id = 145'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 146'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 147'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 148'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 149'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 150'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 151'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 152'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 153'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 154'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 155'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 156'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 157'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 158'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 159'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 160'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 161'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 162'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 163'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 164'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 165'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 166'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 167'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 168'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 169'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 170'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 171'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 172'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 173'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 174'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 175'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 176'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 177'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 178'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 179'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(35.538056,-23.794722),4326) where id = 180'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 181'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 182'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 183'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 184'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 185'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 186'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 187'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 188'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 189'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 190'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 191'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 192'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 193'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 194'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 195'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 196'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 197'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 198'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 199'),
    db.query('UPDATE logs set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 200')
  ])

  console.log(`Log Location Load Success! ${AddressBook.length} logs now has a location`)
  console.log(`Loading Locations for: Offered Dives`)

  const OfferedDivesAddressBook = await Promise.all([
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(118.628756,4.114683),4326) where id = 1'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(134.616667,7.5),4326) where id = 2'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 3'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 4'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 5'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 6'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(34.253889,27.722222),4326) where id = 7'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 8'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(114.191304,-21.817378),4326) where id = 9'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 10'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 11'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 12'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-90.55,-0.666667),4326) where id = 13'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 14'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(121.070833,13.549722),4326) where id = 15'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-121.9,36.8),4326) where id = 16'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-118.416667,33.383333),4326) where id = 17'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-119.416667,34.008333),4326) where id = 18'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 19'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 20'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-81.290303,19.327874),4326) where id = 21'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 22'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(35.538056,-23.794722),4326) where id = 23'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 24'),
    db.query('UPDATE "offeredDives" set geog = ST_SetSRID(ST_MakePoint(97.866667,9.416667),4326) where id = 25')
  ])

  console.log(`Offered Dives Location Load Success! ${OfferedDivesAddressBook.length} offered dives now has a location`)
  console.log(`Loading Locations for: Dive Shops`)

  const ShopAddressBook = await Promise.all([
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(118.83,10),4326) where id = 1'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-88.188611,17.498611),4326) where id = 2'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(138.7581,-33.0255),4326) where id = 3'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(34.329722,27.912222),4326) where id = 4'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-157.816667,21.3),4326) where id = 5'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(115.088056,-8.335),4326) where id = 6'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-118.400833,34.007778),4326) where id = 7'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-81.544167,24.666944),4326) where id = 8'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-74.0059,40.7127),4326) where id = 9'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(32.683333,-27.533333),4326) where id = 10'),
    db.query('UPDATE diveshops set geog = ST_SetSRID(ST_MakePoint(-3.05,58.9),4326) where id = 11')
  ])

  console.log(`Dive Shop Location Load Success! ${ShopAddressBook.length} shops now has a location`)
  console.log(`Location Load Success!`)
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
