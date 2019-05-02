const router = require('express').Router()
const {Log} = require('../db/models')
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

router.get('/user/:userId', async (req, res, next) => {
  const userId = Number(req.params.userId)
  const logs = await Log.findAll({where: userId})
  res.status(200).send(logs)
})
