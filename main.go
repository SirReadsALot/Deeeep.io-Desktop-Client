package main

import (
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"path"
	"time"

	"github.com/hugolgst/rich-go/client"
	"github.com/zserge/lorca"
)

type Config struct {
	Docassets bool `json:Docassets`
}

func main() {
	/*
		if _, err := os.Stat("/plugins"); os.IsNotExist(err) {
			var err = os.Mkdir("plugins", 0755)
			if err != nil {
				log.Fatal(err)
			}
		}
	*/
	cwd, _ := os.Getwd()
	docpath := path.Join(cwd, "plugins/docassets")
	// swappath := path.Join(cwd, "swapper")
	flags := fmt.Sprintf("--load-extension=%v", docpath)
	var config Config
	data, err := os.ReadFile("config.json")
	if err != nil {
		config = Config{false}
		data, _ := json.Marshal(config)
		os.WriteFile("config.json", data, 0644)
	} else {
		json.Unmarshal(data, &config)
	}
	cfcpy := config

	ui, _ := lorca.New("data:text/html,"+url.PathEscape(`
		<title>Deeeep.io Desktop App</title>
		<style>*{padding: 0; margin: 0; overflow: hidden}
		#loading{text-align: center; font-size: 40px; font-weight: bold; position: absolute; z-index: 2; color: white;}</style>
		<!-- <img id="img" src="https://tinyurl.com/m5a4d3vw"></img> -->
		<img id="img" src="https://sralcodeproj.netlify.app/assets/myhailot.png"></img>
		<h3 id="loading">Loading...</h3>
	`)+query(config), "", 1120, 740, flags, "--disable-dinosaur-easter-egg") // previous: 887x586
	time.Sleep(5 * time.Second)

	err = client.Login("817817065862725682")
	if err != nil {
		fmt.Println(err)
		//panic(err) //this apparently crashes the entire client if it doesn't find disc
	}
	now := time.Now()
	err = client.SetActivity(client.Activity{
		Details:    "Playing Unknown gamemode",
		LargeImage: "deeplarge_2",
		LargeText:  "Playing Deeeep.io Desktop Client",
		SmallImage: "ffa",
		SmallText:  "Playing Unknown Gamemode",
		Timestamps: &client.Timestamps{
			Start: &now,
		},
	})

	ui.Bind("setdocassets", func() {
		config.Docassets = !config.Docassets
		ui.Load(`https://beta.deeeep.io` + query(config))
		menu(ui)
	})

	ui.Bind("reload", func() {
		ui.Load(`https://beta.deeeep.io` + query(config))
		menu(ui)
	})
	ui.Bind("showEvoTree", func() {
		EvoTreeUI(ui)
	})

	ui.Load(`https://beta.deeeep.io` + query(config))
	ui.SetBounds(lorca.Bounds{0, 0, 1200, 1000, "maximized"})
	menu(ui)

	defer func() {
		ui.Close()
		if cfcpy != config {
			data, _ := json.Marshal(config)
			os.WriteFile("config.json", data, 0644)
		}
	}()
	<-ui.Done()
}

func query(config Config) string {
	return fmt.Sprintf("?docassets=%v", config.Docassets)
}

/* default
sirreads' pc:
GOARCH=amd64
GOOS=windows
*/

var evoTreeBtn string = `
const ext = document.querySelector(".pink").cloneNode(true)
ext.style.width = "5.5rem"

const group = document.querySelector(".el-col-sm-8")
group.appendChild(ext)
group.style.maxWidth = "100%"
group.style.flex = "0 0 100%"

ext.style.backgroundColor = "rgb(16,185,129)"
ext.style.borderColor = "rgb(5,150,105)"
ext.addEventListener("mouseenter", () => {
  ext.style.backgroundColor = "rgb(5,150,105)"
  ext.style.borderColor = "rgb(4,120,87)"
})
ext.addEventListener("mouseleave", () => {
  ext.style.backgroundColor = "rgb(16,185,129)"
  ext.style.borderColor = "rgb(5,150,105)"
})

const extText = document.querySelector("button.pink:nth-child(2) > span:nth-child(1) > span:nth-child(2)")
extText.innerText = "EvoTree"

const extIcon = document.querySelector("button.pink:nth-child(2) > span:nth-child(1) > svg:nth-child(1)")
extIcon.outerHTML = `/u0060<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 25 25" version="1.1">
<g id="surface1">
<path style="fill:none;stroke-width:8;stroke-linecap:butt;stroke-linejoin:round;stroke:rgb(100%,100%,100%);stroke-opacity:1;stroke-miterlimit:10;" d="M 50.953125 52.6875 L 70.359375 52.6875 L 70.359375 41.71875 " transform="matrix(0.25,0,0,0.25,0,0)"/>
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 15.566406 9.464844 C 15.566406 8.34375 16.472656 7.4375 17.589844 7.4375 C 18.128906 7.4375 18.644531 7.652344 19.023438 8.03125 C 19.402344 8.410156 19.617188 8.925781 19.617188 9.464844 C 19.617188 10.582031 18.710938 11.492188 17.589844 11.492188 C 16.472656 11.492188 15.566406 10.582031 15.566406 9.464844 Z M 15.566406 9.464844 "/>
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 13.550781 20.296875 L 13.550781 7.4375 L 11.621094 7.4375 L 11.621094 20.296875 Z M 13.550781 20.296875 "/>
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 10.558594 6.730469 C 10.558594 5.613281 11.464844 4.703125 12.585938 4.703125 C 13.125 4.703125 13.640625 4.917969 14.019531 5.296875 C 14.398438 5.675781 14.613281 6.195312 14.613281 6.730469 C 14.613281 7.851562 13.707031 8.757812 12.585938 8.757812 C 11.464844 8.757812 10.558594 7.851562 10.558594 6.730469 Z M 10.558594 6.730469 "/>
<path style="fill:none;stroke-width:8;stroke-linecap:butt;stroke-linejoin:round;stroke:rgb(100%,100%,100%);stroke-opacity:1;stroke-miterlimit:10;" d="M 49.046875 65.703125 L 29.640625 65.703125 L 29.640625 54.734375 " transform="matrix(0.25,0,0,0.25,0,0)"/>
<path style=" stroke:none;fill-rule:evenodd;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9.433594 12.71875 C 9.433594 11.601562 8.527344 10.695312 7.410156 10.695312 C 6.871094 10.695312 6.355469 10.90625 5.976562 11.285156 C 5.59375 11.667969 5.382812 12.183594 5.382812 12.71875 C 5.382812 13.839844 6.289062 14.746094 7.410156 14.746094 C 8.527344 14.746094 9.433594 13.839844 9.433594 12.71875 Z M 9.433594 12.71875 "/>
</g>
</svg>/u0060` 
` // does not work because of the xmlns error

func menu(ui lorca.UI) {
	ui.Eval(`
	window.onload = () => {
		const app = document.getElementById("app")
		//const div = document.createElement('div')
		//div.style.position = "absolute"
		//div.style.zIndex = "100"
		//div.style.width = "100%"
		// div.innerHTML = ''
		// document.body.insertBefore(div, app)
		

		const url = new URL(window.location.href);
		const enabled = url.searchParams.get("docassets")
		const btn = document.getElementById("doc-btn")
		if (enabled == "true") {
			btn.className = "position-absolute bg-success text-white px-1 rounded"
			btn.innerText = "ON"
		} else {
			btn.className = "position-absolute bg-danger text-white px-1 rounded"
			btn.innerText = "OFF"
		}

		function docassets() {
			const btn = document.getElementById("doc-btn")
			if (enabled == "true") {
				localStorage.setItem("docassets", "false")
			} else {
				localStorage.setItem("docassets", "true")
			}
			setdocassets()
		}

		const doc = document.getElementById("docassets")
		doc.onclick = docassets
	}
	
	function dark() {
		const menu = document.getElementById("menu")
		if (menu.classList.contains("navbar-light")) {
			menu.className = "navbar navbar-expand navbar-dark bg-dark"
		} else {
			menu.className = "navbar navbar-expand navbar-light bg-light"
	}
	
	function open_navbar() {
		console.log("DDDDDDDDDDDDDDDD")
	}
	}` + evoTreeBtn)
}

func EvoTreeUI(ui lorca.UI) {
	ui.Eval(`
	<img src="https://media.discordapp.net/attachments/920022907462254694/925363027312799774/evolution_tree_.png?width=908&height=676">
	`)
}
