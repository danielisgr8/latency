const result = document.querySelector(".result");
const form = document.querySelector("form");

const getTime = async () => {
  const req = new XMLHttpRequest();

  req.open("GET", `http://${window.location.hostname}:1234`);
  return new Promise((resolve) => {
    let timestamp;

    req.addEventListener("load", () => {
      return resolve(performance.now() - timestamp);
    });

    timestamp = performance.now();
    req.send();
  })

}

const updateLatency = async (sampleCount) => {
  const times = new Array(sampleCount);
  for(let i = 0; i < sampleCount; i++) {
    times[i] = await getTime();
  }
  const avg = times.reduce((prev, cur) => prev + cur, 0) / sampleCount;
  result.textContent = `Latency: ${avg} ms`;
}

form.onsubmit = async (e) => {
  e.preventDefault();

  const sampleCount = form.elements["samples"].value;
  updateLatency(sampleCount);
}
