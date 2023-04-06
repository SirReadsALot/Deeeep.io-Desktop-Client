//console.log(`[DDC Config] ${JSON.stringify(data)}`)
(function () {
  var blockContextMenu

  blockContextMenu = function (evt) {
    evt.preventDefault();
  };

  window.addEventListener('contextmenu', blockContextMenu);
})(); 

document.addEventListener("DOMContentLoaded", () => {

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
  extIcon.outerHTML = `<svg width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>`

  const extCloses = document.getElementsByClassName("ext-close")
  const extModal = document.getElementById("ext-modal")
  for (const ext of extCloses) {
    ext.addEventListener("click", () => {
      extModal.classList.toggle("hidden")
    })
  }
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

  // Multi-Swap
  const swapperInput_m = document.getElementById("m_swap-input")
  const chooseAnimInput = document.getElementById("m_anim-input")
  const saveID = document.getElementById("m_swap-btn")
  const clearBtn = document.getElementById("m_swap-clearbtn")
  const openList = document.getElementById("openList-btn")
  const s_Id = []
  const a_Id = []

  saveID.addEventListener("click", () => {
    const skanId = parseInt(swapperInput_m.value)
    const animalId = parseInt(chooseAnimInput.value)
    s_Id.push(skanId)
    a_Id.push(animalId)
    console.log("SKIN ID'S: " + s_Id)
    console.log("ANIMAL ID's: " + a_Id)
    let fishData = gameScene.gameScene.myAnimal.fishLevelData.fishLevel
    let swap = gameScene.gameScene.game.currentScene.myAnimal.setSkin
    function m_swap() {
      for (n of s_Id) {
        if (fishData === s_Id[n]) {
          swap(s_Id[n])
        }
      }
    }
    m_swap()
  })
  clearBtn.addEventListener("click", () => {
    s_Id.length = 0
    a_Id.length = 0
  })


  const listHTML = `<html>
  <title>Animal ID List</title>
  <style>
  *{padding: 0; margin: 0; overflow:auto;}
  p {font-size: 24px; text-align: center;}
  </style>
  <body>
    <h2><code>Press Ctrl + F to search for the ID you want</code></h2>
    <div id="listArea"></div>
  </body>
  <script>
  const url = "https://sirreadsalot.github.io/sralcodeproj/animal_Id.txt"
  function output(data) {
    document.getElementById("listArea").innerHTML = this.responseText
  }
  function reqList(url) {
    const base = new XMLHttpRequest()
    base.addEventListener("load", output)
    base.open("GET", url)
    base.send()
  }
  reqList(url)

  (function () {
    var blockContextMenu
  
    blockContextMenu = function (evt) {
      evt.preventDefault();
    };
  
    window.addEventListener('contextmenu', blockContextMenu);
  })(); 
  </script>
  </html>`
  openList.addEventListener("click", () => {
    makeWindow(listHTML, 463, 483)
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
  const rpc = document.getElementById("rpc-enable")
  const rpcCheck = document.getElementById("rpc-check")
  const rpcBtn = document.getElementById("rpc-btn")
  const rpcCheckInner = document.getElementById("rpc-check-inner")
  rpc.addEventListener("click", () => {
    rpcCheck.classList.toggle("active")
    rpcCheckInner.classList.toggle("active")
    data.rpc.Config.Active = !data.rpc.Config.Active
    updateConfig(data)
  })
  // rpcBtn.addEventListener("click", () => {
  //   reload()
  // })
  if (data.rpc.Config.Active) {
    rpcCheck.classList.toggle("active")
    rpcCheckInner.classList.toggle("active")
  }

  const ExternalEx = extModal
  const playBtn = document.getElementsByClassName("el-button btn play btn nice-button green block btn play")[0]
  const Exbg = document.getElementsByClassName("w-full h-full absolute")[0]
  Exbg.style.pointerEvents = "none"
  window.addEventListener("keydown", (e) => {
  if (playBtn) {
    switch(e.key) {
      case "q":
      case "Q":
        ExternalEx.style.opacity = 1
        ExternalEx.classList.toggle("active")
        ExternalEx.classList.toggle("absolute")
        console.log("Q pressed")
        break;
      default:
        return
    }
  } else {
    return
  }
  })
  window.addEventListener("keyup", (e) => {
  if (playBtn) {
    switch(e.key) {
      case "q":
      case "Q":
        ExternalEx.style.opacity = 0
        ExternalEx.classList.toggle("hidden")
        ExternalEx.classList.remove("absolute")
        console.log("Q released")
        break;
      default:
        return
    }
  } else {
    return
  }
  })

  window.addEventListener("keydown", (e) => {
    if (e.key === "Z" || e.key === "z") {
      screenshot()
    }
  })
  window.addEventListener("keydown", (e) => {
    if (e.key === "E" || e.key === "e") {
      var evoTree = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>EvoTree</title>
      </head>
      <body>
      <img src="https://raw.githubusercontent.com/SirReadsALot/Deeeep.io-Desktop-Client/golang/assets/Tree.png">
        <style>
        html, body {
          margin: 0; 
          height: 100%; 
          overflow: hidden;
        }
        </style>
        <script>
        (function () {
          var blockContextMenu
        
          blockContextMenu = function (evt) {
            evt.preventDefault();
          };
        
          window.addEventListener('contextmenu', blockContextMenu);
        })(); 
        </script>
      </body>
      </html>
      `
      makeWindow(evoTree, 865, 663)
    }
  })
})
function updateConfig(data) {
  const config = {}
  for (const name in data) {
    config[name] = data[name].Config
  }
  setConfig(JSON.stringify(config))
}

