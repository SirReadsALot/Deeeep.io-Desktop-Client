console.log(`[DDC Config] ${JSON.stringify(data)}`)

window.addEventListener('keyup', e => {
  const modal = document.getElementById("ext-modal")
  if (modal && e.key.toLowerCase() == "q") {
    extModal.classList.toggle("hidden")
    extensions.classList.toggle("hidden")
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const extCloses = document.getElementsByClassName("ext-close")
  const extModal = document.getElementById("ext-modal")
  extCloses[0].addEventListener("click", () => {
    extModal.classList.toggle("hidden")
    extensions.classList.toggle("hidden")
  })
  const extensions = document.getElementById("extensions")
  extensions.addEventListener("click", () => {
    extModal.classList.toggle("hidden")
    extensions.classList.toggle("hidden")
  })
  const pills = document.getElementsByClassName("ext-pill")
  const pages = document.getElementsByClassName("ext-page")
  for (const pill of pills) {
    pill.addEventListener("click", () => {
      for (const other of pills) {
        other.classList.remove("active")
      }
      for (const other of pages) {
        other.classList.add("hidden")
      }
      pill.classList.add("active")
      const page = document.getElementById(pill.dataset.name)
      page.classList.remove("hidden")
    })
  }

  // Asset Swapper
  const swapperBtn = document.getElementById("swapper-btn")
  const swapperInput = document.getElementById("swapper-input")
  swapperBtn.addEventListener("click", () => {
    const id = parseInt(swapperInput.value)
    gameScene.gameScene.game.currentScene.myAnimal.setSkin(id)
    console.log(`[DDC Asset Swapper] ${id}`)
  })

  // Doc Assets
  const doc = document.getElementById("doc-enable")
  const docCheck = document.getElementById("doc-check")
  const docBtn = document.getElementById("doc-btn")
  const docCheckInner = document.getElementById("doc-check-inner")
  doc.addEventListener("click", () => {
    docCheck.classList.toggle("active")
    docCheckInner.classList.toggle("active")
    data.docassets.Config.Active = !data.docassets.Config.Active
    updateConfig(data)
  })
  docBtn.addEventListener("click", () => {
    reload()
  })
  if (data.docassets.Config.Active) {
    docCheck.classList.toggle("active")
    docCheckInner.classList.toggle("active")
  }

  // DiscordRPC
  
})

function updateConfig(data) {
  const config = {}
  for (const name in data) {
    config[name] = data[name].Config
  }
  setConfig(JSON.stringify(config))
}





