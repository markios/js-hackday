import { Router } from 'express'

const healthRouter = (app) => {
  const route = new Router()
  route.get('/healthz', (req, res) => res.json({ message: 'ok' }))
  app.use(route)
}

export default healthRouter