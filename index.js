const fs = require('node:fs')

function config (options = {}) {
  try{
    const path = options.path  ?? '.env'
    const envFile = fs.readFileSync(path, 'utf-8')
    if(envFile === '') return

    const envData = envFile.replaceAll(/[\r\"\']/g,'').split('\n')
    const keyList = envData.map(key => {
      return [ key.split('=')[0],  key.split('=')[1] ]
    });

    process.env = Object.fromEntries(keyList)
  }catch(err){
    if(err.code === 'ENOENT') return
  }
}

module.exports = { config }
