const Sequelize = require('sequelize')
const db = require('../db')

const OfferedDive = db.define('offeredDive', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

OfferedDive.LoadData = async function(dataArray) {
    await dataArray.map(async data => {
      let {id, name, location, description, diveshopId, imageURL} = data
      await OfferedDive.create({
        id, name, location, description, diveshopId, imageURL
      })
    })
    console.log("Offered Dive Load Success!")
  }

module.exports = OfferedDive
