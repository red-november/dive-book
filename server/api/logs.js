const router = require('express').Router()
const {Log, EarnedBadge, Diver, Observation} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const allLogs = await Log.findAll()
  res.status(200).send(allLogs)
})

router.get('/test', async (req, res, next) => {
  try {
    // const diverLogs = await Log.findAll({
    //   include: [{model: Observation}],
    //   where: {
    //     diverId: 1
    //   }
    // })
    // const diverBadges = await Badge.findAll({
    //   include: [
    //     {
    //       model: Diver,
    //       where: {
    //         id: 1
    //       }
    //     }
    //   ]
    // })

    let diverBadges = await EarnedBadge.findAll({where: {diverId: 1}})
    diverBadges = diverBadges.find(b => b.badgeId === 1)

    // const diverLogs = await Log.getAllObservations(1)

    res.json({diverBadges})
  } catch (error) {
    next(error)
  }
})

router.get('/:logId', async (req, res, next) => {
  const id = Number(req.params.logId)
  const log = await Log.findByPk(id)
  res.status(200).send(log)
})

router.get('/diver/:diverId', async (req, res, next) => {
  const diverId = Number(req.params.diverId)
  const logs = await Log.findAll({where: {diverId: diverId}})
  res.status(200).send(logs)
})

router.post('/', async (req, res, next) => {
  try {
    const {
      diveName,
      timeIn,
      timeOut,
      location,
      maxDepth,
      tankPressureStart,
      tankPressureEnd,
      tankType,
      beltWeight,
      wetSuitType,
      wetSuitThickness,
      airMixture,
      description,
      visibility
    } = req.body

    if (req.user) {
      console.log(req.body)
      const log = await Log.create(req.body)
      await log.setDiver(req.user.id)
      // await log.setDiveShop(req.user.diveshopId)
      res.status(201).send(log)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/diver/:diverId', async (req, res, next) => {
  const diverId = req.params.diverId
  const log = await Log.findByPk(diverId)
  if (!log) {
    res.send(404)
  }
  let logUpdate = await log.update(req.body)
  res.status(200).send(logUpdate)
})
