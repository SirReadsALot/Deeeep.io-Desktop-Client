//console.log(`[DDC Config] ${JSON.stringify(data)}`)

// document.addEventListener('contextmenu', (e) => e.preventDefault())

document.addEventListener("DOMContentLoaded", () => {
	const navBar = document.getElementsByClassName("el-row top-right-nav items-center")[0];
	const updateLog = document.createElement("div");
	updateLog.innerHTML = `<button class="tr-menu-button ext-yellow" role="button" tabindex="0">
  <img src="https://cdn.discordapp.com/attachments/1035856135187595347/1094211126834770030/updatelog.png" style="filter: invert(1);" height="20px" width="20px">
  </button>`;
	navBar.append(updateLog);
	updateLog.addEventListener("click", () => {
		console.log("UpdateLog clicked");
	});

	const ext = document.querySelector(".pink").cloneNode(true);
	ext.style.width = "5.5rem";

	const group = document.querySelector(".el-col-sm-8");
	group.appendChild(ext);
	group.style.maxWidth = "100%";
	group.style.flex = "0 0 100%";

	ext.classList.remove("pink");
	ext.classList.add("green", "ext", "ext-close");
	const extText = document.querySelector("button.ext > span:nth-child(1) > span:nth-child(2)");
	extText.innerText = "Extensions";

	const extIcon = document.querySelector("button.ext > span:nth-child(1) > svg:nth-child(1)");
	extIcon.outerHTML = `<svg width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>`;

	const extCloses = document.getElementsByClassName("ext-close");
	const extModal = document.getElementById("ext-modal");
	for (const ext of extCloses) {
		ext.addEventListener("click", () => {
			extModal.classList.toggle("hidden");
		});
	}
	const pills = document.getElementsByClassName("ext-pill");
	const pages = document.getElementsByClassName("ext-page");
	for (const pill of pills) {
		pill.addEventListener("click", () => {
			for (const other of pills) {
				other.classList.remove("active");
			}
			for (const other of pages) {
				other.classList.add("hidden");
			}
			pill.classList.add("active");
			const page = document.getElementById(pill.dataset.name);
			page.classList.remove("hidden");
		});
	}

	// Asset Swapper
	const swapperBtn = document.getElementById("swapper-btn");
	const swapperInput = document.getElementById("swapper-input");
	swapperBtn.addEventListener("click", () => {
		const id = parseInt(swapperInput.value);
		gameScene.gameScene.game.currentScene.myAnimal.setSkin(id);
		console.log(`[DDC Asset Swapper] ${id}`);
	});

	// Terrain/Pet Swapper
	const petInput = document.getElementById("pet-input");
	const petCustomInput = document.getElementById("pet-custom-input");
	// const terrainInput = document.getElementById("terrain-input").value
	// const terrainCustomInput = document.getElementById("terrain-custom-input").value
	const petBtn = document.getElementById("pet-btn");
	const terrainBtn = document.getElementById("terrain-btn");
	petInput.value = data.docassets.Config.pet;
	petCustomInput.value = data.docassets.Config.customPet;
	terrainBtn.addEventListener("click", () => {
		alert("Sorry, it's under construction 🛠");
	});
	petBtn.addEventListener("click", () => {
		data.docassets.Config.pet = document.getElementById("pet-input").value;
		data.docassets.Config.customPet = document.getElementById("pet-custom-input").value;
		updateConfig(data);
		reload();
	});

	// Multi-Swap
	/*
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
  */

	// Doc Assets
	const doc = document.getElementById("doc-enable");
	const docCheck = document.getElementById("doc-check");
	const docBtn = document.getElementById("doc-btn");
	const docCheckInner = document.getElementById("doc-check-inner");
	doc.addEventListener("click", () => {
		docCheck.classList.toggle("active");
		docCheckInner.classList.toggle("active");
		data.docassets.Config.active = !data.docassets.Config.active;
		updateConfig(data);
	});
	docBtn.addEventListener("click", () => {
		reload();
	});
	if (data.docassets.Config.active) {
		docCheck.classList.toggle("active");
		docCheckInner.classList.toggle("active");
	}

	// DiscordRPC
	const rpc = document.getElementById("rpc-enable");
	const rpcCheck = document.getElementById("rpc-check");
	// const rpcBtn = document.getElementById("rpc-btn")
	const rpcCheckInner = document.getElementById("rpc-check-inner");
	rpc.addEventListener("click", () => {
		rpcCheck.classList.toggle("active");
		rpcCheckInner.classList.toggle("active");
		data.rpc.Config.active = !data.rpc.Config.active;
		updateConfig(data);
	});
	// rpcBtn.addEventListener("click", () => {
	//   reload()
	// })
	if (data.rpc.Config.active) {
		rpcCheck.classList.toggle("active");
		rpcCheckInner.classList.toggle("active");
	}

	// Shortcut Keys
	const home = document.getElementsByClassName("home-page")[0];
	const Exbg = document.getElementsByClassName("w-full h-full absolute")[0];
	Exbg.style.pointerEvents = "none";
	let keydown = false;
	document.addEventListener("keydown", (e) => {
		if (ext && !keydown && home.style.display == "none") {
			if (e.key === "Q" || e.key === "q") {
				extModal.classList.toggle("hidden");
				console.log("Q released");
			} else if (e.key === "Z" || e.key === "z") {
				screenshot();
			} else if (e.key === "E" || e.key === "e") {
				const evoTree = `
          <img src="https://raw.githubusercontent.com/SirReadsALot/Deeeep.io-Desktop-Client/golang/assets/Tree.png">
          <style>
          html, body {
            margin: 0; 
            height: 100%; 
            overflow: hidden;
          }
          </style>
          <script>window.addEventListener('contextmenu', () => evt.preventDefault())</script>
        `;
				makeWindow(evoTree, 865, 663);
			}
		}
		keydown = true;
	});

	document.addEventListener("keyup", () => (keydown = false));

	// Disable chrome shortcuts
	const ctrlOrCmdCodes = new Set(["KeyD", "KeyE", "KeyD", "KeyG", "KeyN", "KeyO", "KeyP", "KeyQ", "KeyR", "KeyS", "KeyT", "KeyW", "KeyY", "Tab", "PageUp", "PageDown", "F4"]);
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
});

function updateConfig(data) {
	const config = {};
	for (const name in data) {
		config[name] = data[name].Config;
	}
	setConfig(JSON.stringify(config));
}
