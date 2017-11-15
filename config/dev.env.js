'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://dealsbank.zhuo.com"',
  // BASE_API: '"https://easy-mock.com/mock/5a05660be264ca23e8c73ce2/dealsbank"', 
 
})
