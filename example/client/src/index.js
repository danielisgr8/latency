import { SyncModule } from "../../../src";

const latencyButton = document.getElementById("setLatency");
const requestButton = document.getElementById("sendRequest");
const respondButton = document.getElementById("respond");
const result = document.getElementById("result");
const audioInput = document.getElementsByName("audio")[0];
const audio = document.getElementsByTagName("audio")[0];

const baseUrl = `http://${window.location.hostname}:1234`;

const syncModule = new SyncModule(`${baseUrl}/ping`);

let audioResponse = false;
audioInput.onchange = (e) => {
  audioResponse = e.target.checked;
  audio.controls = e.target.checked;
}

latencyButton.onclick = async () => {
  await syncModule.setLatency();
  result.textContent = `Latency: ${syncModule.latency}`;
}

requestButton.onclick = async () => {
  const response = await syncModule.request(`${baseUrl}/data`);
  if(audioResponse) {
    audio.src = `data:audio/ogg;base64,${response}`;
  } else {
    result.textContent = true;
  }
}

respondButton.onclick = () => {
  const req = new XMLHttpRequest();
  req.open("GET", `${baseUrl}/respond`);
  req.send();
}
