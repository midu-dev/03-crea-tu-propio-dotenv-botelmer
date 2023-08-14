const fs = require('node:fs')

function config (options = {}) {
    const path = options.path  ?? '.env'
    
    const fileExists = fs.existsSync(path)
    if(!fileExists) return

    const envFile = fs.readFileSync(path, 'utf-8')
    if(envFile.trim() === '') return

    const envData = envFile.replaceAll(/[\r\"\']/g,'').split('\n')
    envData.forEach(data => {
      const [key, value] = data.split('=')
      process.env[key.trim()] = value.trim()
    });
}

module.exports = { config }
