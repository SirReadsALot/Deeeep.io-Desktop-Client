const { ipcRenderer } = require("electron");

function main() {
  const btn = document.getElementsByClassName("btn btn-green play")[0];
  const div = document.getElementsByClassName("gamemode-button")[0];
  const label = div.getElementsByClassName("name")[0];

  btn.onclick = () => ipcRenderer.send("gameMode", label.innerHTML)
}

window.addEventListener("load", main)
                    
