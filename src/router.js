const KoaRouter = require('koa-router')
// 项目打包脚本
const demoFun = require('./scripts/demo')

const router = new KoaRouter()

router.get('/', async (ctx) => {
  ctx.status = 204
})


router.post('/demo', async (ctx) => {
  const { body } = ctx.request
  if (body.password === 'demopassword') {
    demoFun()
  }
  ctx.body = {
    success: true,
  }
})

module.exports = router
