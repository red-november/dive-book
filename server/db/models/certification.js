const Sequelize = require('sequelize')
const db = require('../db')

const Certification = db.define('certification', {
  certId: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  provider: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  level: {
    type: Sequelize.STRING
    // enum
  },
  instructorId: {
    type: Sequelize.STRING
  }
})

Certification.LoadData = async function(dataArray) {
  const certs = await Promise.all(dataArray)
  console.log("Certification Load Success!")
  return certs
}

module.exports = Certification
