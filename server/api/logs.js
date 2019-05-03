const router = require('express').Router()
const {Log, Diver} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const allLogs = await Log.findAll()
  res.status(200).send(allLogs)
})

router.get('/:logId', async (req, res, next) => {
  const id = Number(req.params.logId)
  const log = await Log.findByPk(id)
  res.status(200).send(log)
})

router.get('/diver/:diverId', async (req, res, next) => {
  const diverId = Number(req.params.diverId)
  console.log(req.params)
  const logs = await Log.findAll({where: {diverId: diverId}})
  res.status(200).send(logs)
})
