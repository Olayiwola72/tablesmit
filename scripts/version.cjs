const fs = require('fs')
const path = require('path')

const version = {
  version: process.env.DEPLOY_ID || new Date().toISOString(),
}

fs.writeFileSync(
  path.resolve(__dirname, '..', 'dist', 'version.json'),
  JSON.stringify(version) + '\n',
)
