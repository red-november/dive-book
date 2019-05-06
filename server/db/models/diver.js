const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Diver = db.define('diver', {
  firstName: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  profileImgUrl: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  birthday: {
    type: Sequelize.DATEONLY
  },
  weight: {
    type: Sequelize.INTEGER
  },
  height: {
    type: Sequelize.INTEGER
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = Diver

/**
 * instanceMethods
 */
Diver.prototype.correctPassword = function(candidatePwd) {
  return Diver.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */

Diver.LoadData = async function(dataArray) {
  await dataArray.map(async data => {
    let {id,	firstName,	lastName,	email,	password,	height,	weight,	diveshopId} = data
    await Diver.create({
      id,	firstName,	lastName,	email,	password,	height,	weight,	diveshopId
    })
  })
  console.log("Diver Load Success!")
}

Diver.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Diver.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = diver => {
  if (diver.changed('password')) {
    diver.salt = Diver.generateSalt()
    diver.password = Diver.encryptPassword(diver.password(), diver.salt())
  }
}

Diver.beforeCreate(setSaltAndPassword)
Diver.beforeUpdate(setSaltAndPassword)
Diver.beforeBulkCreate(divers => {
  divers.forEach(setSaltAndPassword)
})
