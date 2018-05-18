import path from 'path'
import asyncPlugin from 'preact-cli-plugin-fast-async'
import envVars from 'preact-cli-plugin-env-vars'

export default (config, env, helpers) => {
    envVars(config, env, helpers)
    asyncPlugin(config)

    config.resolve.alias.src = path.resolve(__dirname, 'src/')
    config.devtool = ''
}
