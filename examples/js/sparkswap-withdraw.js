'use strict'

const ccxt = require('../../ccxt')
const log = require('ololog').configure ({ locate: false })

require ('ansicolor').nice

const SPARKSWAP_UID = process.env.SPARKSWAP_UID || 'sparkswap'
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

  try {
    const code = 'BTC'
    const amount = 2.0
    const address = 'deposit-wallet-address'

    log(`Attempting to withdraw ${amount} ${code} from wallet to ${address}`)
    var response = await exchange.withdraw(code, amount, address)
    log(`Successfully withdrew ${amount} ${code} from wallet to ${address}, id: ${response['id']}`)

  } catch(e) {
    log.bright.yellow('Failed to withdraw: ' + e.message)
  }
})()
