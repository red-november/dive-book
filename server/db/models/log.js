const Sequelize = require('sequelize')
const db = require('../db')
const {Diver, Badge, EarnedBadge, Observation} = require('../models')

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

async function addBadge(logInstance) {
  //get all logs for diver
  const diverLogs = await Log.findAll({
    where: {
      diverId: logInstance.diverId
    },
    include: [{model: Observation}]
  })

  //get all badges for diver
  const diverBadges = await Badge.findAll({
    include: [
      {
        model: Diver,
        where: {
          id: logInstance.diverId
        }
      }
    ]
  })
  //check for Juvenile Badge (more than 9 dives)
  if (diverLogs.length > 9) {
    const [instance, wasCreated] = await EarnedBadge.findOrCreate({
      where: {
        diverId: logInstance.diverId,
        badgeId: 1
      }
    })
  }

  //check for aquaman badge (deeper than 30 meters)
  if (hasDivedDeep(diverLogs, 30)) {
    const [instance, wasCreated] = await EarnedBadge.findOrCreate({
      where: {
        diverId: logInstance.diverId,
        badgeId: 2
      }
    })
  }
}

//utility function
function findMaxDepth(arrOfLogs) {
  let result = 0
  for (let i = 0; i < arrOfLogs.length; i++) {
    let currentLog = arrOfLogs[i]
    if (currentLog.maxDepth > result) {
      result = currentLog.maxDepth
    }
  }
  return result
}

function hasDivedDeep(arrOfLogs, depth) {
  return !!arrOfLogs.find(log => log.maxDepth > depth)
}

// function numOfObservations(arrOfLogs, target) {}

// Log.afterCreate(addBadge)

module.exports = Log
