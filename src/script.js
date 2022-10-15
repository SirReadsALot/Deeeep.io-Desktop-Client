window.addEventListener("load", () => {
  const ext = document.querySelector(".pink").cloneNode(true)
  ext.style.width = "5.5rem"

  const group = document.querySelector(".el-col-sm-8")
  group.appendChild(ext)
  group.style.maxWidth = "100%"
  group.style.flex = "0 0 100%"

  ext.classList.remove("pink")
  ext.classList.add("green", "ext", "ext-close")
  const extText = document.querySelector("button.ext > span:nth-child(1) > span:nth-child(2)")
  extText.innerText = "Extensions"

  const extIcon = document.querySelector("button.ext > span:nth-child(1) > svg:nth-child(1)")
  extIcon.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
</svg>`

  const extMain = document.getElementById("ext-main")
  for (const path in data) {
    const extBox = document.createElement("div")
    extMain.appendChild(extBox)
    extBox.outerHTML = `
    <div class="relative ext-box ${config[path].active ? "active" : ""}" id="${path}">
      <div style="bottom: 0" class="text-center absolute w-full p-2">${data[path].name}</div>
    </div>
    `
    const extBoxNew = document.getElementById(path)
    extBoxNew.addEventListener("click", () => {
      extBoxNew.classList.toggle("active")
      config[path].active = extBoxNew.classList.contains("active")
      setConfig(config)
    })
  }

  const extCloses = document.getElementsByClassName("ext-close")
  const extModal = document.getElementById("ext-modal")
  for (const extClose of extCloses) {
    extClose.addEventListener("click", () => {
      extModal.classList.toggle("hidden")
    })
  }
})

window.addEventListener('contextmenu', (evt) => {
  evt.preventDefault();
  console.log("[DDC] [!] contextmenu blocked")
});

window.addEventListener('keydown', e => {
  const evoModal = document.getElementById("evo-modal")
  if (e.key == "q" && e.isComposing) {
    evoModal.classList.toggle("active")
    evoModal.transform = "scale(1)"
    evoModal.opacity = 1
    //alert("key Q held")
  } else if (e.key != "q" || e.repeat) {
    return;
  } else {
    evoModal.classList.toggle("hidden")
    //alert("no key held")
  }
})

window.addEventListener('keyup', e => {
  if (e.key.toLowerCase() == "q") {
    evoModal.style.transform = "scale (0)"
    evoModal.style.opacity = 0
  }
})

console.log("[DDC] initiating fishLevelData logging function...")
window.addEventListener("keydown", e => {
  if (e.key === "w") {
    console.log(game.currentScene.myAnimal.fishLevelData)
  } else {
    return;
  }
})