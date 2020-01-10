'use strict'
var init = require('../helpers/init')
var sauce = require('./sauce')

module.exports = {
  before: function (browser, done) {
    init(browser, done)
  },
  'SimpleExecutionConsole': function (browser) {
    browser
    .waitForElementVisible('#terminalCli', 10000)
    .executeScript('console.log(1 + 1)')
    .journalLastChild('2')
  },
  'Async/Await Script': function (browser) {
    browser
    .addFile('asyncAwait.js', { content: asyncAwait })
    .executeScript(`remix.execute('browser/asyncAwait.js')`)
    .journalLastChild('Waiting Promise')
    .pause(5500)
    .journalLastChild('result - Promise Resolved')
  },
  'Call Remix File Manager from a script': function (browser) {
    browser
    .addFile('asyncAwaitWithFileManagerAccess.js', { content: asyncAwaitWithFileManagerAccess })
    .executeScript(`remix.execute('browser/asyncAwaitWithFileManagerAccess.js')`)
    .modalFooterOKClick() // approve API access
    .pause(1000)
    .journalLastChildIncludes('contract Ballot {')
    .end()
  },
  tearDown: sauce
}

const asyncAwait = `
  var p = function () {
    return new Promise(function (resolve, reject)  {
        setTimeout(function ()  {
            resolve("Promise Resolved")
        }, 5000)
    })
  }

  var run = async () => {
    console.log('Waiting Promise')
    var result = await p()
    console.log('result - ', result)
  }

  run()
`

const asyncAwaitWithFileManagerAccess = `
  var p = function () {
    return new Promise(function (resolve, reject)  {
        setTimeout(function ()  {
            resolve("Promise Resolved")
        }, 0)
    })
  }

  var run = async () => {
    console.log('Waiting Promise')
    var result = await p()
    let text = await codeExec.call('fileManager', 'getFile', 'browser/3_Ballot.sol')
    console.log('result - ', text)
  }

  run()
`
