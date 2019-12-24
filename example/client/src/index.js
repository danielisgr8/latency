import { getLatency } from "../../../src";

const result = document.querySelector(".result");
const form = document.querySelector("form");

const updateLatency = async (sampleCount) => {
  const avg = await getLatency(`http://${window.location.hostname}:1234`, sampleCount);
  result.textContent = `Latency: ${avg} ms`;
}

form.onsubmit = (e) => {
  e.preventDefault();

  const sampleCount = form.elements["samples"].value;
  updateLatency(sampleCount);
}
