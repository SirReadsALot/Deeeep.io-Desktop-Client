//console.log(`[DDC Config] ${JSON.stringify(data)}`)

// Hook the PixiJS Assets package
// https://pixijs.download/v7.2.4/docs/PIXI.Assets.html
let PixiAssets;
const ObjectDefineProperty = Object.defineProperty;
Object.defineProperty = function (...args) {
	if (args[0]?.loadTextures) {
		PixiAssets = args[0].Assets;
		Object.defineProperty = ObjectDefineProperty;
	}
	return ObjectDefineProperty.apply(this, args);
};

document.addEventListener('contextmenu', (e) => e.preventDefault())

document.addEventListener("DOMContentLoaded", () => {
  // Hook the gameScene
  let gameScene;
  const originalBind = Function.prototype.bind;
  Function.prototype.bind = function (...args) {
      if (args[0]?.gameScene) {
          gameScene = args[0];
          window.gameScene = args[0];
      }

      return originalBind.apply(this, args);
  };

  // Utility functions
  function randomIdentifier (length = 8) {
    // Create an array of random numbers
    let randValues = crypto.getRandomValues(new Uint8Array(length))
    // We only want the 4 smallest bit of the number (0 - 15)
    randValues = randValues.map((n) => n & 0b1111)
    // Convert all the numbers to a hexadecimal digit (0 - f)
    return Array.from(randValues).map((n) => n.toString(16)).join("")
  }

  const navBar = document.getElementsByClassName("el-row top-right-nav items-center")[0]
  const updateLog = document.createElement("div")
  updateLog.innerHTML = `<div class="tr-menu-button ext-yellow" style="padding-right: 4px; padding-left: 4px;"><div class="el-dropdown nice-dropdown" data-v-7db8124a="" data-v-190e0e28=""><button class="el-button el-button--small el-tooltip__trigger btn nice-button yellow has-icon square only-icon el-tooltip__trigger" aria-disabled="false" type="button" id="el-id-9348-12" role="button" tabindex="0" aria-controls="el-id-9348-13" aria-expanded="false" aria-haspopup="menu" data-v-1676d978="" data-v-7db8124a=""><!--v-if--><span class=""><!----><!----></span>
  <img src="https://cdn.discordapp.com/attachments/1035856135187595347/1094211126834770030/updatelog.png" height="28px" width="28px">
  </button><!--v-if--></div></div>`
  navBar.append(updateLog)
  updateLog.addEventListener("click", () => {
    console.log("UpdateLog clicked")
  })

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
    try {
      gameScene.gameScene.myAnimals.forEach((animal) => animal.setSkin(id))
    } catch (error) {
      console.error(error)
    }
    console.log(`[DDC Asset Swapper] ${id}`)
  })

  // Terrain/Pet Swapper
  // { "<url>": "<asset alias>" }
  const cachedCustomPets = {};
  // { "<url>": <PIXI.Texture> }
  const cachedCustomTerrain = {};

  // Uses the Pixi Asset loader to load a given image URL as a usable texture
  async function loadPixiAsset (type, url, returnAsAlias = true) {
    // Generate a "unique" identifier for each asset
    // This will be internally managed by the swapper
    const id = randomIdentifier();
    const assetName = `${type}_${id}.png`
    const texture = await PixiAssets.load({
      alias: [assetName],
      src: url,
      data: {
        ignoreMultiPack: true
      }
    });
    if (returnAsAlias) {
      return type === "pet" ? `${id}.png` : assetName;
    } else {
      return texture;
    }
  };

  // https://pixijs.download/v7.2.4/docs/PIXI.Assets.html
  const allowedContentTypes = ["avif", "webp", "apng", "png", "jpeg", "gif", "svg+xml"].map((type) => `image/${type}`)
  async function checkUrl (url) {
    const response = await fetch(url, {
        method: 'HEAD'
    });
    const contentType = response.headers.get("Content-Type");
    return allowedContentTypes.includes(contentType)
  };

  const petBtn = document.getElementById("pet-btn")
  const terrainBtn = document.getElementById("terrain-btn")

  // Terrain swapper
  terrainBtn.addEventListener("click", async () => {
    const targetTerrain = Number.parseInt(document.getElementById("terrain-input").value)
    const customUrl = document.getElementById("terrain-custom-input").value

    const urlValid = await checkUrl(customUrl)
    if (!urlValid) return alert("Invalid URL")

    // Check if the given URL is a texture that has been loaded before
    let cached = cachedCustomTerrain[customUrl]
    if (!cached) {
      const texture = await loadPixiAsset("terrain", customUrl, false)
      cached = cachedCustomPets[customUrl] = texture
    }
    // The property in gameScene containing the terrains list has a mangled name
    // We need to figure out this mangled name first
    const mapObjects = gameScene.gameScene[Object.keys(gameScene.gameScene).find((key) => gameScene.gameScene[key] && Object.hasOwn(gameScene.gameScene[key], "terrains"))]
    if (!mapObjects) return

    mapObjects.terrains.forEach(e => {
      if (e?.settings?.texture === targetTerrain && e?.shape?.fill?.texture) {
          // Clear the Graphics and redraw it
          try {
            // Create a backup of the points in the old shape
            // They are stored in this format: [x1, y1, x2, y2, x3, y3, etc...]
            const points = e.shape.geometry.graphicsData[0].shape.points
            e.shape.clear()
            // The "color" option here actually refers to the texture tint
            // #FFFFFF means no tint
            e.shape.beginTextureFill({
              texture: cached, 
              color: "ffffff"
            })
            e.shape.moveTo(points.shift(), points.shift())
            while (points.length > 0) {
                e.shape.lineTo(points.shift(), points.shift())
            }
            e.shape.closePath()
          } catch {}
      }
    })

    console.log(`[DDC Terrain Swapper] Terrain type ${targetTerrain} -> ${customUrl}`)
  })

  // Pet swapper
  petBtn.addEventListener("click", async () => {
    const targetPet = document.getElementById("pet-input").value
    const customUrl = document.getElementById("pet-custom-input").value
    
    const urlValid = await checkUrl(customUrl)
    if (!urlValid) return alert("Invalid URL")

    // Check if the given URL is a texture that has been loaded before
    let cached = cachedCustomPets[customUrl]
    if (!cached) {
      const textureAlias = await loadPixiAsset("pet", customUrl, true)
      cached = cachedCustomPets[customUrl] = textureAlias
    }
    // The property in gameScene containing the entities list has a mangled name
    // We need to figure out this mangled name first
    const objectsManager = gameScene.gameScene[Object.keys(gameScene.gameScene).find((key) => gameScene.gameScene[key] && Object.hasOwn(gameScene.gameScene[key], "entitiesList"))]
    if (!objectsManager) return

    objectsManager.entitiesList.forEach((entity) => {
      if (entity?.petData?.asset === targetPet) {
        // Update the asset name
        // Deeeep.io will auto-prefix the asset name with "pet_"
        // e.g. "fish.png" -> "pet_fish.png"
        // When loading assets, we have to alias them as "pet_name.png"
        // But when setting petData.asset, we have to use "name.png"
        entity.petData.asset = cached
        entity.updateTexture()
      }
    })

    console.log(`[DDC Pet Swapper] ${targetPet} -> ${customUrl}`)
  })

  // Multi-Swap

  const swapperInput_m = document.getElementById("m_swap-input")
  const chooseAnimInput = document.getElementById("m_anim-input")
  const saveID = document.getElementById("m_swap-btn")
  const clearBtn = document.getElementById("m_swap-clearbtn")
  const openList = document.getElementById("openList-btn")
  let currentFishLevel = -1;
  let skins = {};

  saveID.addEventListener("click", () => {
    const skinId = parseInt(swapperInput_m.value)
    const animalId = parseInt(chooseAnimInput.value)
    if (gameScene?.gameScene?.myAnimals?.length && gameScene.gameScene.myAnimals.length > 0 && gameScene.gameScene.myAnimals[0].fishLevelData.fishLevel === animalId) {
      gameScene.gameScene.myAnimals.forEach((a) => a.setSkin(skinId))
    }
    skins[animalId] = skinId
  })

    function onFishLevelChange(id) {
      if (typeof skins[id] === "number") {
        gameScene.gameScene.myAnimals.forEach((a) => a.setSkin(skins[id]))
      }
    }
    setInterval(() => {
      if (!gameScene?.gameScene?.myAnimals?.length || gameScene.gameScene.myAnimals.length < 1) return currentFishLevel = -1;
      const newFishLevel = gameScene.gameScene.myAnimals[0].fishLevelData.fishLevel;
      if (currentFishLevel !== newFishLevel) {
          currentFishLevel = newFishLevel;
          onFishLevelChange(currentFishLevel);
      }
    }, 100)
  clearBtn.addEventListener("click", () => {
    skins = {}
    gameScene.gameScene.myAnimals.forEach((a) => a.setSkin())
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
    data.docassets.Config.active = !data.docassets.Config.active
    updateConfig(data)
  })
  docBtn.addEventListener("click", () => {
    reload()
  })
  if (data.docassets.Config.active) {
    docCheck.classList.toggle("active")
    docCheckInner.classList.toggle("active")
  }

  // DiscordRPC
  const rpc = document.getElementById("rpc-enable")
  const rpcCheck = document.getElementById("rpc-check")
  // const rpcBtn = document.getElementById("rpc-btn")
  const rpcCheckInner = document.getElementById("rpc-check-inner")
  rpc.addEventListener("click", () => {
    rpcCheck.classList.toggle("active")
    rpcCheckInner.classList.toggle("active")
    data.rpc.Config.active = !data.rpc.Config.active
    updateConfig(data)
  })
  // rpcBtn.addEventListener("click", () => {
  //   reload()
  // })
  if (data.rpc.Config.active) {
    rpcCheck.classList.toggle("active")
    rpcCheckInner.classList.toggle("active")
  }

  // Background Music
  const h = {
    cold:     0b000001, // 1
    warm:     0b000010, // 2
    shallow:  0b000100, // 4
    deep:     0b001000, // 8
    fresh:    0b010000, // 16
    salt:     0b100000, // 32
  }
  const habitatCombinations = [
    h.cold  + h.shallow  + h.fresh,
    h.cold  + h.shallow  + h.salt,
    h.cold  + h.deep     + h.fresh,
    h.cold  + h.deep     + h.salt,
    h.warm  + h.shallow  + h.fresh,
    h.warm  + h.shallow  + h.salt,
    h.warm  + h.deep     + h.fresh,
    h.warm  + h.deep     + h.salt,
  ]
  let oldHabitat = -1
  let oldMusicId = ""
  let useSecondPlayer = false
  function stopMusic() {
    for (const e of ["bgm-player", "bgm-player2"]) {
      const player = document.getElementById(e);
      (async () => {
        while (Number.parseFloat(player.volume) > 0) {
          player.volume = (Number.parseFloat(player.volume) - 0.05).toFixed(2)
          await new Promise((r) => setTimeout(r, 100))
        }
        player.pause()
        player.currentTime = 0
      })();
    }
  }
  setInterval(async () => {
    if (!gameScene?.gameScene?.myAnimals[0]) {
      oldHabitat = -1
      return stopMusic()
    };
    
    const habitat = gameScene.gameScene.myAnimals[0]._currentArea
    if (oldHabitat === habitat) return;
    const matchedHabitat = habitatCombinations.find((h) => habitat & h === h)
    if (!matchedHabitat) return stopMusic();
    const youtubeId = data.deeeepio_bgm.Config[`area${matchedHabitat}`] || document.getElementById(`bgm-area-${habitat}`).value
    if (youtubeId === "") return stopMusic();
    if (youtubeId === oldMusicId) return;
    oldHabitat = habitat
    oldMusicId = youtubeId
    
    const playbackInfo = JSON.parse(await getYoutubeInfo(youtubeId))
    const music = playbackInfo?.streamingData?.adaptiveFormats?.find((f) => f.itag === 140);

    const player = document.getElementById(useSecondPlayer ? "bgm-player2" : "bgm-player")
    const oldPlayer = document.getElementById(useSecondPlayer ? "bgm-player" : "bgm-player2")
    useSecondPlayer = !useSecondPlayer
    player.volume = "0.00"
    oldPlayer.volume = "1.00"
    player.src = music.url
    player.play()
    for (let i = 0; i < 20; i++) {
      player.volume = (i * 0.05).toFixed(2)
      oldPlayer.volume = (1 - (i * 0.05)).toFixed(2)
      await new Promise((r) => setTimeout(r, 100))
    }
    player.volume = "1.00"
    oldPlayer.volume = "0.00"
    oldPlayer.pause()
    oldPlayer.currentTime = 0
  }, 5000);
  for (const habitat of habitatCombinations) {
    document.getElementById(`bgm-area-${habitat}`).value = data.deeeepio_bgm.Config[`area${habitat}`]
  }
  document.getElementById("bgm-btn").addEventListener("click", () => {
    for (const habitat of habitatCombinations) {
      data.deeeepio_bgm.Config[`area${habitat}`] = document.getElementById(`bgm-area-${habitat}`).value
    }
    updateConfig(data)
  })

  // Shortcut Keys
  const home = document.getElementsByClassName("home-page")[0]
  const Exbg = document.getElementsByClassName("w-full h-full absolute")[0]
  Exbg.style.pointerEvents = "none"
  let keydown = false 
  if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) return;
  if (!ext || keydown || home.style.display !== "none") return;

    if (e.key.toLowerCase() === "q") {
      extModal.classList.toggle("hidden")
    } else if (e.key.toLowerCase() === "z") {
      screenshot()
    } else if (e.key.toLowerCase() === "t") {
      const evoTree = `
      <title>EvoTree</title>
        <img src="https://raw.githubusercontent.com/SirReadsALot/Deeeep.io-Desktop-Client/golang/assets/Tree.png">
        <style>
        html, body {
          margin: 0; 
          height: 100%; 
          overflow: hidden;
        }
        </style>
        <script>window.addEventListener('contextmenu', (evt) => evt.preventDefault())</script>
      `
      makeWindow(evoTree, 865, 663)
  /*
  document.addEventListener("keydown", (e) => {
    if (ext && !keydown && home.style.display == "none") {
      if (e.key === "Q" || e.key === "q") {
        extModal.classList.toggle("hidden")
        console.log("Q released")
      } else if (e.key === "Z" || e.key === "z") {
        screenshot()
      } else if (e.key === "T" || e.key === "t") {
        const evoTree = `
        <title>EvoTree</title>
          <img src="https://raw.githubusercontent.com/SirReadsALot/Deeeep.io-Desktop-Client/golang/assets/Tree.png">
          <style>
          html, body {
            margin: 0; 
            height: 100%; 
            overflow: hidden;
          }
          </style>
          <script>window.addEventListener('contextmenu', (evt) => evt.preventDefault())</script>
        `
        makeWindow(evoTree, 865, 663)
      }
    }
    keydown = true
  })
  */

  document.addEventListener("keyup", () => {keydown = false})


  const ctrlOrCmdCodes = new Set(["KeyD", "KeyH", "KeyJ", "KeyE", "KeyD", "KeyG", "KeyN", "KeyO", "KeyP", "KeyQ", "KeyR", "KeyS", "KeyT", "KeyW", "KeyY", "Tab", "PageUp", "PageDown", "F4"]);
	const cmdCodes = new Set(["BracketLeft", "BracketRight", "Comma"]);
	const cmdOptionCodes = new Set(["ArrowLeft", "ArrowRight", "KeyB"]);
	const ctrlShiftCodes = new Set(["KeyQ", "KeyW"]);
	const altCodes = new Set(["Home", "ArrowLeft", "ArrowRight", "F4"]);

	function preventDefaultShortcuts(event) {
		let prevent = false;
		if (navigator.userAgent.match(/Mac OS X/)) {
			if (event.metaKey) {
				if (event.keyCode > 48 && event.keyCode <= 57)
					// 1-9
					prevent = true;
				if (ctrlOrCmdCodes.has(event.code) || cmdCodes.has(event.code)) prevent = true;
				if (event.shiftKey && cmdOptionCodes.has(event.code)) prevent = true;
				if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
					if (!event.contentEditable && event.target.nodeName !== "INPUT" && event.target.nodeName !== "TEXTAREA") prevent = true;
				}
			}
		} else {
			if (event.code === "F4") prevent = true;
			if (event.ctrlKey) {
				if (event.keyCode > 48 && event.keyCode <= 57)
					// 1-9
					prevent = true;
				if (ctrlOrCmdCodes.has(event.code)) prevent = true;
				if (event.shiftKey && ctrlShiftCodes.has(event.code)) prevent = true;
			}
			if (event.altKey && altCodes.has(event.code)) prevent = true;
		}

		if (prevent) event.preventDefault();
	}

	document.addEventListener("keydown", preventDefaultShortcuts, false);
	document.addEventListener("keydown", (event) => {
		if ((event.key === "q" || event.key === "Q") && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
		}
	});
})

function updateConfig(data) {
  const config = {}
  for (const name in data) {
    config[name] = data[name].Config
  }
  setConfig(JSON.stringify(config))
}

