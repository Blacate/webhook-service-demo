const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const config = require('./config')


const app = new Koa()
const router = new Router()
const port = config.port || 3000

app.use(logger())
app.use(bodyParser())

const defaultRouters = require('./router')

router.use(defaultRouters.routes(), defaultRouters.allowedMethods())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.log(`webhook service demo start at ${port}`)
})
