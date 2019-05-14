const Sequelize = require('sequelize')
const db = require('../db')

const Sighting = db.define('sighting', {})

Sighting.addBulk = async function(arrOfObjs) {
  for (let i = 0; i < arrOfObjs.length; i++) {
    let currentPair = arrOfObjs[i]
    await this.create({
      logId: currentPair.logId,
      observationId: currentPair.observationId
    })
  }
}

module.exports = Sighting
