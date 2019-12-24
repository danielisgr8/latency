const getTime = (url) => {
  const req = new XMLHttpRequest();

  req.open("GET", url);
  return new Promise((resolve) => {
    let timestamp;

    req.addEventListener("load", () => {
      return resolve(performance.now() - timestamp);
    });

    timestamp = performance.now();
    req.send();
  });
}

/**
 * Returns the average latency from pinging the given URL the given number of times.
 * @param {String} url The URL to ping. This should ideally have a small response size for increased accuracy.
 * @param {Number} sampleCount The number of times to ping the given URL.
 * @returns {Number}
 */
const getLatency = async (url, sampleCount) => {
  const times = new Array(sampleCount);

  for(let i = 0; i < sampleCount; i++) {
    times[i] = await getTime(url);
  }

  return times.reduce((prev, cur) => prev + cur, 0) / sampleCount;
}

export { getLatency };
