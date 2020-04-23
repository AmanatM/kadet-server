const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)
const chalk = require('chalk')


server.listen(config.PORT, () => {
  console.log(chalk.cyan(`Server running on port ${config.PORT}`))
})




