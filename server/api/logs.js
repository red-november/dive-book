const router = require('express').Router()
const {Log, EarnedBadge, Diver, Observation} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allLogs = await Log.findAll()
    res.status(200).json(allLogs)
  } catch (error) {
    next(error)
  }
})

router.get('/:logId', async (req, res, next) => {
  const id = Number(req.params.logId)
  try {
    const log = await Log.findByPk(id)
    res.status(200).send(log)
  } catch (error) {
    next(error)
  }
})

router.delete('/:logId', async (req, res, next) => {
  const id = Number(req.params.logId)
  try {
    const log = await Log.findByPk(id)
    if (req.user.id === log.diverId && !log.isVerified) {
      log.destroy()
      res.sendStatus(202)
    }
    next(new Error('unable to delete log'))
  } catch (error) {
    next(error)
  }
})

router.get('/diver/:diverId', async (req, res, next) => {
  try {
    const diverId = Number(req.params.diverId)
    const logs = await Log.findAll({where: {diverId: diverId}})
    res.status(200).send(logs)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {
      date,
      diveshopId,
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
      visibility,
      hasStrongCurrent,
      offeredDiveId
    } = req.body

    if (diveshopId === '') diveshopId = null
    if (typeof offeredDiveId === 'string') offeredDiveId = null

    if (req.user) {
      const log = await Log.create({
        diveshopId,
        diveName,
        timeIn,
        timeOut,
        location,
        maxDepth,
        tankPressureStart,
        tankPressureEnd,
        tankType,
        beltWeight,
        wetSuitThickness,
        wetSuitType,
        airMixture,
        description,
        visibility,
        date,
        hasStrongCurrent,
        offeredDiveId,
        diverId: req.user.id
      })
      // await log.setDiver(req.user.id)
      res.status(201).send(log)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/diver/:logId', async (req, res, next) => {
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
    visibility,
    hasStrongCurrent,
    diveshopId,
    offeredDiveId
  } = req.body
  try {
    const logId = req.params.logId
    const log = await Log.findByPk(logId)
    if (!log) {
      res.send(404)
    }
    let logUpdate = await log.update({
      diveName,
      timeIn,
      timeOut,
      location,
      maxDepth,
      tankPressureStart,
      tankPressureEnd,
      tankType,
      beltWeight,
      wetSuitThickness,
      wetSuitType,
      airMixture,
      description,
      visibility,
      hasStrongCurrent,
      diveshopId,
      offeredDiveId
    })
    res.status(200).send(logUpdate)
  } catch (err) {
    next(err)
  }
})

router.get('/diver/:diverId/observations', async (req, res, next) => {
  try {
    const diverId = Number(req.params.diverId)
    const logs = await Log.findAll({
      where: {
        diverId
      },
      include: [{model: Observation}]
    })
    res.status(200).send(logs)
  } catch (err) {
    next(err)
  }
})
