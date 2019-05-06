const router = require('express').Router()
const { Certification } = require('../db/models')
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

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const cert = await Certification.findByPk(id)
    res.status(200).json(cert)
  } catch (error) {
    next(error)
  }
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

router.put('/:id', async (req,res, next) => {
  try {
    const {id} = req.params
    const {certId, provider, date, level, instructorId} = req.body
    const certToUpdate = await Certification.findByPk(id)
    const updatedCert = await certToUpdate.update({
      certId, provider, date, level, instructorId
    })
    res.status(200).json(updatedCert)
  } catch (error) {
    next(error)
  }
})
