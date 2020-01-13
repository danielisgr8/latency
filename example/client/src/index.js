import { SyncModule } from "../../../src";

const latencyButton = document.getElementById("setLatency");
const requestButton = document.getElementById("sendRequest");
const respondButton = document.getElementById("respond");
const result = document.getElementById("result");

const baseUrl = `http://${window.location.hostname}:1234`;

const syncModule = new SyncModule(`${baseUrl}/ping`);

latencyButton.onclick = async () => {
  await syncModule.setLatency();
  result.textContent = `Latency: ${syncModule.latency}`;
}

requestButton.onclick = async () => {
  result.textContent = await syncModule.request(`${baseUrl}/data`);
}

respondButton.onclick = () => {
  const req = new XMLHttpRequest();
  req.open("GET", `${baseUrl}/respond`);
  req.send();
}
