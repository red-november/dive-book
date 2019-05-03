const Sequelize = require('sequelize')
const db = require('../db')
// const {Diver, Badge} = require('../db/models')

const Log = db.define('log', {
  diveName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isVerified: {
    type: Sequelize.BOOLEAN
  },

  // Experience Props

  timeIn: {
    type: Sequelize.DATE
  },
  timeOut: {
    type: Sequelize.DATE
  },
  location: {
    type: Sequelize.STRING
  },
  maxDepth: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  tankPressureStart: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tankPressureEnd: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tankType: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  beltWeight: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  wetSuitType: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  wetSuitThickness: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  airMixture: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  description: {
    type: Sequelize.TEXT
  },
  hasStrongCurrent: {
    type: Sequelize.BOOLEAN
  },
  visibility: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

//hooks

// async function addBadge(logInstance) {
//   const diverLogs = await Log.findAll({
//     where: {
//       userId: logInstance.userId
//     }
//   })
//   const diverBadges = await Badge.findAll({
//     include: [
//       {
//         model: Diver,
//         where: {
//           userId: logInstance.userId
//         }
//       }
//     ]
//   })
// }

// Log.afterCreate(addBadge)

module.exports = Log
