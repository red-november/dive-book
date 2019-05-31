/* eslint-disable complexity */
const Sequelize = require('sequelize')
const db = require('../db')

const Log = db.define('log', {
  diveName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  // Experience Props

  timeIn: {
    type: Sequelize.TIME,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  timeOut: {
    type: Sequelize.TIME,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // moved to offered dive

  maxDepth: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  tankPressureStart: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  tankPressureEnd: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  tankType: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  beltWeight: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  wetSuitType: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  wetSuitThickness: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      max: 10
    }
  },
  airMixture: {
    type: Sequelize.STRING
    // enum, but string for now
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Awesome Dive!!!!'
  },
  hasStrongCurrent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  visibility: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
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
      await diverInstance.sequelize.models.earnedBadge.findOrCreate({
        where: {
          diverId: diverId,
          badgeId: 1
        }
      })
    }

    // check for aquaman badge (deeper than 30 meters)
    if (!aquaman && hasDivedDeep(diverLogs, 30)) {
      await await diverInstance.sequelize.models.earnedBadge.findOrCreate({
        where: {
          diverId: diverId,
          badgeId: 2
        }
      })
    }

    //check for discoverer badge (more than 40 observations)
    if (!discoverer) {
      const observations = await Log.getAllObservations(diverId)
      observations.length > 40 &&
        (await diverInstance.sequelize.models.earnedBadge.findOrCreate({
          where: {
            diverId: diverId,
            badgeId: 3
          }
        }))
    }

    //check for voyager badge (more than 10 places)
    if (!voyager && hasTraveled(diverLogs, 10)) {
      await diverInstance.sequelize.models.earnedBadge.findOrCreate({
        where: {
          diverId: diverId,
          badgeId: 4
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}

//utility functionas

function hasDivedDeep(arrOfLogs, depth) {
  return !!arrOfLogs.find(log => log.maxDepth > depth)
}

//returns an array of booleans representing badges present in order
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

Log.afterCreate(addBadges)

module.exports = Log
