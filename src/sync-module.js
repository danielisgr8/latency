/**
 * @typedef SyncPacket
 * @type {Object}
 * @property {Number} time  The most up-to-date time of the server when it sent its response
 * @property {Number} delay How soon after `time` `data` should be processed
 * @property {any}    data  The encapsulated data that the client should receive
 */

/**
 * @callback StreamCallback
 * @param {any} data
 */

class SyncModule {
  /**
   * Constructs a new instance of `SyncModule`.
   * Tests the latency of the server it will be communicating with through `pingUrl`.
   * @param {String} pingUrl The URL to ping. This should be sent to the same server the will be used for all future requests.
   */
  constructor(pingUrl) {

  }

  /**
   * Sends a request to the given URL.
   * The response must return a stringified version of type `SyncPacket`.
   * This function will resolve at least after the given amount of time has lapsed.
   * @param {String} url 
   * @returns {Promise<any>}
   */
  async request(url) {

  }

  /**
   * Sends a request to the given URL.
   * The response is expected to be a stream of data, rather than a single stringified JSON object.
   * 
   * The response must begin with a stringified `SyncPacket`, omitting the `data` property.
   * After the object, the stream of data may begin.
   * 
   * After the given delay, the `onData` function will begin to be called with the streamed data.
   * `onData` will be called in order.
   * @param {String} url 
   * @param {StreamCallback} onData 
   */
  requestStream(url, onData) {
    // TODO: buffer the data while waiting
  }
}

