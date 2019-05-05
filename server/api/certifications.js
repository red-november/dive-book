const router = require('express').Router()
const {Certification} = require('../db/models')
module.exports = router

router.get('/diver/:diverId', async (req, res, next) => {
  const diverId = Number(req.params.diverId)
  const certs = await Certification.findAll({
    where: {
      diverId: diverId
    }
  })
  res.status(200).send(certs)
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cert = await Certification.create(req.body)
      res.status(201).send(cert)
    }
  } catch (err) {
    next(err)
  }
})
