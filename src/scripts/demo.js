const tools = require('../utils/tools')

const projectDir = '/tmp/webhook_service_demo'
const gitRepo = 'git@github.com:Blacate/webhook-service-demo.git'
const log = []

const demoFun = () => {
  console.log('[INFO] Start executing the script')
  tools.fetchGitUpdate(projectDir, gitRepo)
    .then(() => {
      console.log('[INFO] Installing dependencies...')
      return tools.runNpmCommand('install', projectDir)
    })
    .then(() => {
      console.log('[INFO] Publishing package...')
      return tools.runNpmScript('testscript', projectDir)
    })
    .then((res) => {
      // 成功的话 打印日志 发送成功邮件
      console.log(res.join('\n'))
      log.push(...res)
      tools.sendMail(log)
    })
    .catch((err) => {
      // 如果捕获到错误就打印错误信息并发送邮件
      console.log(err)
      log.push(err)
      tools.sendMail(log)
    })
}

module.exports = demoFun
