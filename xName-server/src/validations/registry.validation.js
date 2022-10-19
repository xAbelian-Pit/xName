import Joi from 'joi'

export const register = {
  body: {
    txHash: Joi.string().required(),
  },
}
