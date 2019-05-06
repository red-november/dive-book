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
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  shape: {
    type: Sequelize.STRING
  }
})

module.exports = Observation
