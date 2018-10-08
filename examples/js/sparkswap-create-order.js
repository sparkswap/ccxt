'use strict'

const ccxt = require('../../ccxt')
const log = require('ololog').configure ({ locate: false })

require ('ansicolor').nice

const SPARKSWAP_UID = process.env_SPARKSWAP_UID || 'sparkswap'
const SPARKSWAP_PASSWORD = process.env.SPARKSWAP_PASSWORD || 'sparkswap'
const SPARKSWAP_HOST = process.env.SPARKSWAP_HOST || 'http://localhost:27592'

;(async () => {

  // Instantiate the exchange. All object arguments below ARE REQUIRED to use the
  // sparkswap ccxt class.
  //
  // uid - the username set on your broker daemon
  // password - the password set on your broker daemon
  // url - the url of your broker daemon
  let exchange = new ccxt.sparkswap({
      'uid': SPARKSWAP_UID,
      'password': SPARKSWAP_PASSWORD,
      'urls': {
        'api': SPARKSWAP_HOST,
      }
  });

  const symbol = 'BTC/LTC'
  const type = 'market'
  const side = 'buy'
  const amount = 0.1

  try {
    log('Attempting to create order')
    const res = await exchange.createOrder(symbol, type, side, amount)
    log('Successfully created order', { id: res['id'] })

  } catch(e) {
    log.bright.yellow('Failed to createOrder: ' + e.message)
  }
})()
