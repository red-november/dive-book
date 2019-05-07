const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const DiveShop = db.define('diveshop', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  storeFrontImgUrl: {
    type: Sequelize.STRING
  },
  stampImgUrl: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

DiveShop.LoadData = async function(dataArray) {
  await dataArray.map(async data => {
    let {name, location, email, storeFrontImgUrl} = data
    await DiveShop.create({
      name, location, email, storeFrontImgUrl
    })
  })
  console.log("DiveShop Load Success!")
}

module.exports = DiveShop

// DiveShop.prototype.correctPassword = function(candidatePwd) {
//   return DiveShop.encryptPassword(candidatePwd, this.salt()) === this.password()
// }



/**
 * classMethods
 */
// DiveShop.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64')
// }

// DiveShop.encryptPassword = function(plainText, salt) {
//   return crypto
//     .createHash('RSA-SHA256')
//     .update(plainText)
//     .update(salt)
//     .digest('hex')
// }

/**
 * hooks
 */
// const setSaltAndPassword = diveshop => {
//   if (diveshop.changed('password')) {
//     diveshop.salt = DiveShop.generateSalt()
//     diveshop.password = DiveShop.encryptPassword(
//       diveshop.password(),
//       diveshop.salt()
//     )
//   }
// }

// DiveShop.beforeCreate(setSaltAndPassword)
// DiveShop.beforeUpdate(setSaltAndPassword)
// DiveShop.beforeBulkCreate(diveshops => {
//   diveshops.forEach(setSaltAndPassword)
// })
