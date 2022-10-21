import express from 'express'

import { validate } from '../../middlewares'
import { registryService } from '../../services'
import { catchAsync, pick } from '../../utils'
import { registryValidation } from '../../validations'

const router = express.Router()

// User registers the tx for transfer/register (setOwn)
router.post(
  '/register',
  validate(registryValidation.register),
  catchAsync(async (req, res, next) => {
    const options = pick(req.body, ['originChain', 'txHash'])
    await registryService.register({ ...options, user: req.user })
    // res.locals = { transaction: transactionHash }
    next()
  }),
)

export default router
