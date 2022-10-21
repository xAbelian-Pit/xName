import Joi from 'joi'

const validRegistryChainNames = ['ethereum', 'polygon', 'avalanche', 'klaytn']

export const register = {
  body: {
    originChain: Joi.string().valid(...validRegistryChainNames).required(), // chain name
    txHash: Joi.string().required(),
  },
}
