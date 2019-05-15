const Sequelize = require('sequelize')
const db = require('../db')

const Sighting = db.define('sighting', {})

Sighting.addBulk = async function(arrOfObjs) {
  for (let i = 0; i < arrOfObjs.length; i++) {
    let currentPair = arrOfObjs[i]
    await this.findOrCreate({
      where: {
        logId: currentPair.logId,
        observationId: currentPair.observationId
      }
    })
  }
}

Sighting.destroyBulk = async function(arrOfObjs) {
  for (let i = 0; i < arrOfObjs.length; i++) {
    let currentPair = arrOfObjs[i]
    const instance = await this.findOne({
      where: {
        logId: currentPair.logId,
        observationId: currentPair.observationId
      }
    })

    if (instance) {
      await instance.destroy()
    }
  }
}

module.exports = Sighting
