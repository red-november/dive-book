/* eslint-disable complexity */
const Sequelize = require('sequelize')
const db = require('../db')

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

//class methods

//returns an array of all unique observations
Log.getAllObservations = async function(diverId) {
  try {
    const diverLogs = await this.findAll({
      where: {
        diverId: diverId
      }
    })
    const unique = {}
    for (let i = 0; i < diverLogs.length; i++) {
      let obsArr = await diverLogs[i].getObservations()
      for (let j = 0; j < obsArr.length; j++) {
        let currentObs = obsArr[j]
        if (!unique[currentObs.id]) {
          unique[currentObs.id] = currentObs
        }
      }
    }

    return Object.values(unique)
  } catch (error) {
    console.error(error)
  }
}

Log.findDiverLogs = async function(diverId) {
  const diverLogs = await this.findAll({
    where: {
      diverId: diverId
    }
  })

  return diverLogs
}

//instance methods

Log.prototype.getDiverBadges = async function(diverId) {
  const badges = await this.sequelize.models.earnedBadge.findAll({
    where: {
      diverId: diverId
    }
  })
  return badges
}

Log.prototype.getAllBadges = async function() {
  const badges = await this.sequelize.models.badge.findAll()
  return badges
}

//hooks

async function addBadges(logInstance) {
  const diverId = logInstance.diverId
  //get all logs for diver
  try {
    const diverLogs = await Log.findDiverLogs(diverId)
    //get all badges for diver
    const diverBadges = await logInstance.getDiverBadges(diverId)
    //set default statuses for all badges

    const allBadges = await logInstance.getAllBadges()

    let [juvenile, aquaman, discoverer, voyager] = badgesPresent(diverBadges, 4)

    const diverInstance = await logInstance.sequelize.models.diver.findByPk(
      diverId
    )

    // check for Juvenile Badge (more than 9 dives)
    if (!juvenile && diverLogs.length > 9) {
      console.log('diver email:', diverInstance.email)
      await diverInstance.sequelize.models.earnedBadge.findOrCreate({
        where: {
          diverId: diverId,
          badgeId: 1
        }
      })
    }

    // check for aquaman badge (deeper than 30 meters)
    if (!aquaman && hasDivedDeep(diverLogs, 30)) {
      await diverInstance.addBadge(2)
    }

    //check for discoverer badge (more than 40 observations)
    if (!discoverer) {
      const observations = await Log.getAllObservations(diverId)
      observations.length > 40 && (await diverInstance.addBadge(3))
    }

    //check for voyager badge (more than 10 places)
    if (!voyager && hasTraveled(diverLogs, 10)) {
      await diverInstance.addBadge(4)
    }
  } catch (e) {
    console.error(e)
  }
}

//utility function
// function findMaxDepth(arrOfLogs) {
//   let result = 0
//   for (let i = 0; i < arrOfLogs.length; i++) {
//     let currentLog = arrOfLogs[i]
//     if (currentLog.maxDepth > result) {
//       result = currentLog.maxDepth
//     }
//   }
//   return result
// }

function hasDivedDeep(arrOfLogs, depth) {
  return !!arrOfLogs.find(log => log.maxDepth > depth)
}

function badgesPresent(arrOfBadges, numOfBadges) {
  const badgeBooleans = Array(numOfBadges).fill(false)
  //loop through badges, return true at index of present badge
  for (let i = 0; i < arrOfBadges.length; i++) {
    let currentBadge = arrOfBadges[i]
    badgeBooleans[currentBadge.badgeId - 1] = true
  }

  return badgeBooleans
}

function hasTraveled(arrOfLogs, numPlaces) {
  const uniqueLocations = arrOfLogs.reduce((accum, log) => {
    if (!accum[log.location]) {
      accum[log.location] = log.location
    }
    return accum
  }, {})

  return Object.values(uniqueLocations).length > numPlaces
}

// function numOfObservations(arrOfLogs, target) {}

Log.afterCreate(addBadges)

module.exports = Log
