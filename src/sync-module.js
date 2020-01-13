import { getLatency } from "./util";

/**
 * @typedef SyncPacket
 * @type {Object}
 * @property {Number} time  The most up-to-date time of the server when it sent its response
 * @property {Number} delay How many milliseconds after `time` `data` should be processed
 * @property {any}    data  The encapsulated data that the client should receive
 */

/**
 * @callback StreamCallback
 * @param {any} data
 */

 /**
  * A module that facilitates the automatic running of code at times designated by server responses.
  * Accounts for latency in timing.
  * 
  * `setLatency` must be called before any `request` or `requestStream` calls are made.
  */
class SyncModule {
  /**
   * Constructs a new instance of `SyncModule`.
   * Tests the latency of the server it will be communicating with through `pingUrl`.
   * @param {String} pingUrl The URL to ping. This should be sent to the same server the will be used for all future requests.
   */
  constructor(pingUrl) {
    this.pingUrl = pingUrl;
  }

  /**
   * Sets the estimated latency between the client and server.
   * Must be called before any requests are made from this module.
   */
  async setLatency() {
    this.latency = await getLatency(this.pingUrl, 10);
    console.log(this.latency);
  }

  /**
   * Sends a request to the given URL.
   * The response must return a stringified version of type `SyncPacket`.
   * This function will resolve at least after the given amount of time has lapsed.
   * @param {String} url 
   * @returns {Promise<any>}
   */
  request(url) {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = "json";

    return new Promise((resolve) => {
      req.addEventListener("load", () => {
        console.log(req.response);
        const waitTime = req.response.delay - this.latency;

        const timestamp = Date.now();
        if(waitTime <= 0) resolve(req.response.data);
        else setTimeout(() => {
          console.log(Date.now() - timestamp);
          resolve(req.response.data);
        }, waitTime);
      });

      req.send();
    });
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

export default SyncModule;
