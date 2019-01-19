const gitP = require('simple-git/promise')
const Promise = require('bluebird')
const nodeCmd = require('node-cmd')

const cmd = Promise.promisify(nodeCmd.get, { multiArgs: true, context: nodeCmd })

/**
 * 用于将指定目录初始化为git仓库并拉取更新
 * @param {string} projectDir 项目目录
 * @param {string} gitRepo 项目的git地址
 */
const fetchGitUpdate = (projectDir, gitRepo) => {
  const git = gitP(projectDir)
  // 检查指定目录是不是一个git仓库
  return git.checkIsRepo().then((isRepo) => {
    if (!isRepo) {
      console.log('[INFO] Repo is not exist')
      // 如果不是的话就初始化仓库
      return git.init().then(() => {
        console.log('[INFO] Initing Repo...')
        return git.addRemote('origin', gitRepo)
      })
    }
    console.log('[INFO] Repo is exist.')
    return isRepo
  })
    // 回滚代码到当前commit，避免拉取更新的时候出现merge conflict
    .then(() => git.reset('hard'))
    .then(() => {
      console.log('[INFO] Pulling updates...')
      // 拉取更新
      return git.pull('origin', 'master')
    })
}

/**
 * 在指定目录下执行npm script e.g. npm run build
 * @param {string} script 需要执行的script，需要预先写在package.json中
 * @param {string} projectDir 项目目录
 */
const runNpmScript = (script, projectDir) => cmd(`npm run ${script} --prefix ${projectDir}`)

/**
 * 在指定目录下执行npm command e.g. npm install
 * @param {string} command 需要执行的npm命令
 * @param {string} projectDir 项目目录
 */
const runNpmCommand = (command, projectDir) => cmd(`npm ${command} --prefix ${projectDir}`)

/**
 * 发送邮件函数，需要重写
 * @param {array} log 日志信息
 */
const sendMail = log => console.log(log)

module.exports = {
  fetchGitUpdate,
  runNpmScript,
  runNpmCommand,
  sendMail,
}
