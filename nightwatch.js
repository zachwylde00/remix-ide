'use strict'
require('@babel/register')()

module.exports = {
  'src_folders': ['test-browser/tests'],
  'output_folder': 'reports',
  'custom_commands_path': ['test-browser/commands'],
  'custom_assertions_path': '',
  'page_objects_path': '',
  'globals_path': '',

  'test_settings': {
    'default': {
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'globals': {
        'waitForConditionTimeout': 10000,
        'asyncHookTimeout': 100000
      },
      'screenshots': {
        'enabled': false,
        'path': ''
      },
      'desiredCapabilities': {
        'browserName': 'firefox',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'chrome': {
      'webdriver': {
        'start_process': true,
        'server_path': 'node_modules/selenium-standalone/.selenium/chromedriver/2.43-x64-chromedriver',
        'port': 4444
      },
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true,
        'chromeOptions': {
          'args': ['window-size=2560,1440', 'start-fullscreen']
        }
      }
    },

    'safari': {
      'desiredCapabilities': {
        'browserName': 'safari',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'ie': {
      'desiredCapabilities': {
        'browserName': 'internet explorer',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'firefox': {
      'webdriver': {
        'start_process': true,
        'server_path': 'node_modules/selenium-standalone/.selenium/geckodriver/0.23.0-x64-geckodriver',
        'port': 5555
      },
      'desiredCapabilities': {
        'browserName': 'firefox',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  }
}
