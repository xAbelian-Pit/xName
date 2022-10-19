import express from 'express'

import registryRoute from './registry/registry.route'
import finalResponder from '../middlewares/finalResponder'

const router = express.Router()

const defaultRoutes = [
  {
    // path: '/registry',
    path: '/',
    route: registryRoute,
  },
]

defaultRoutes.forEach((route) => router.use(route.path, route.route))

// API route catch-all final responder
// Skips if invalid route
router.use(finalResponder)

export default router
