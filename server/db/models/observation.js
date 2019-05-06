const Sequelize = require('sequelize')
const db = require('../db')

const Observation = db.define('observation', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM(
      'flora',
      'mollusks',
      'fish',
      'coral',
      'mammals',
      'other living things',
      'sponges',
      'inanimate objects',
    ),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  description: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
    defaultValue: "Awesome sighting!"
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/pictures/observations/GenericObservation.jpg'
  },
  color: {
    type: Sequelize.STRING
  },
  shape: {
    type: Sequelize.STRING
  }
})

Observation.LoadData = async function(dataArray) {
  await dataArray.map(async data => {
    let {id, name, category, description, imageURL} = data
    await Observation.create({
      id, name, category, description, imageURL
    })
  })
  console.log("Observation Load Success!")
}

module.exports = Observation
