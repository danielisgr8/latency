/**
 * Sends a request to the given url.
 * Returns a promise resolving to the time to receive a response in milliseconds.
 * @param {String} url 
 * @returns {Promise<Number>} 
 */
const getTime = (url) => {
  const req = new XMLHttpRequest();

  req.open("GET", url);
  return new Promise((resolve) => {
    let timestamp;

    req.addEventListener("load", () => {
      resolve(performance.now() - timestamp);
    });

    // TODO: set this in some other req event listener
    timestamp = performance.now();
    req.send();
  });
}

/**
 * Returns the average latency in milliseconds from pinging the given URL the given number of times.
 * @param {String} url The URL to ping. This should ideally have a small response size for increased accuracy.
 * @param {Number} sampleCount The number of times to ping the given URL.
 * @returns {Promise<Number>}
 */
const getLatency = async (url, sampleCount) => {
  const times = new Array(sampleCount);

  for(let i = 0; i < sampleCount; i++) {
    times[i] = await getTime(url);
  }

  return times.reduce((prev, cur) => prev + cur, 0) / sampleCount;
}

export { getLatency };
