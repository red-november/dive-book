const User = require('./user')
const DiveShop = require('./diveShop')
const Log = require('./log')
const Certification = require('./certification')
const OfferedDive = require('./offeredDive')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

DiveShop.belongsToMany(User, {through: 'usershops'})
User.belongsToMany(DiveShop, {through: 'usershops'})
Log.belongsToMany(User, {through: 'userlog'})
User.belongsToMany(Log, {through: 'userlog'})
Certification.belongsTo(User)
User.hasMany(Certification)

OfferedDive.belongsToMany(Log, {through: 'logoffereddive'})
Log.belongsToMany(OfferedDive, {through: 'logoffereddive'})

DiveShop.belongsToMany(OfferedDive, {through: 'divesofferedbyshop'})
OfferedDive.belongsToMany(DiveShop, {through: 'divesofferedbyshop'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  DiveShop,
  Log,
  Certification,
  OfferedDive
}
