import { $ecomConfig } from '@ecomplus/utils'
import * as EventEmitter from 'eventemitter3'

import login from './methods/login'
import createEcomplusSession from './methods/create-ecomplus-session'
import checkLogin from './methods/check-login'
import logout from './methods/logout'
import getAuthenticationId from './methods/get-authentication-id'
import getSession from './methods/get-session'
import setSession from './methods/set-session'
import fetchAuthentication from './methods/fetch-authentication'
import fetchStore from './methods/fetch-store'
import requestApi from './methods/request-api'

/**
 * Construct a new E-Com Plus admin account instance object.
 * @constructor
 * @param {number} [storeId=$ecomConfig.get('store_id')] - Preset Store ID number
 * @param {string} [lang] - Snake case language code
 *
 * @example

// Default instance
const ecomAuth = new EcomAuth()

 * @example

// Optionally defining Store ID and language
const storeId = 2000
const lang = 'en_us'
const customEcomAuth = new EcomAuth(storeId, lang)

 */

const EcomAuth = function (storeId, lang) {
  const ecomAuth = this

  /**
   * Construct a new account instance object.
   * @memberof EcomAuth
   * @type {function}
   * @see EcomAuth
   */
  ecomAuth.Constructor = EcomAuth

  /**
   * Respective Store ID number.
   * @memberof EcomAuth
   * @type {number}
   */
  ecomAuth.storeId = storeId || $ecomConfig.get('store_id')

  /**
   * Instance language code.
   * @memberof EcomAuth
   * @type {string}
   */
  ecomAuth.lang = lang

  /**
   * Authentication session object.
   * @memberof EcomAuth
   * @type {object}
   */
  ecomAuth.session = {
    store_id: ecomAuth.storeId
  }

  const emitter = new EventEmitter()
  ;['on', 'off', 'once'].forEach(method => {
    ecomAuth[method] = (ev, fn) => {
      emitter[method](ev, fn)
    }
  })

  this.login = (userOrEmail, password) => login(ecomAuth, userOrEmail, password)

  this.createEcomplusSession = () => createEcomplusSession(ecomAuth)

  this.checkLogin = () => checkLogin(ecomAuth)

  this.logout = () => logout(ecomAuth)

  this.getAuthenticationId = () => getAuthenticationId(ecomAuth)

  this.getSession = () => getSession(ecomAuth)

  this.setSession = newSession => setSession(ecomAuth, newSession)

  this.fetchAuthentication = mustSkipSession => fetchAuthentication(ecomAuth, mustSkipSession)

  this.fetchStore = mustSkipSession => fetchStore(ecomAuth, mustSkipSession)

  this.requestApi = (url, method, data, axiosConfig) => requestApi(ecomAuth, url, method, data, axiosConfig)
}

export default EcomAuth
