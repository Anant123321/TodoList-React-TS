const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
module.exports = (envVariables) => {
  const { env } = envVariables
  console.log("Environment:",env)
  const webpackToMerge = require(`./webpack.${env}.js`)
  const config = merge(webpackToMerge, commonConfig)
  return config
}
