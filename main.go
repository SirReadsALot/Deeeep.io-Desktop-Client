package main

import (
	"net/url"
	"time"
	"os"
	"fmt"
	"path"
	"encoding/json"

	"github.com/zserge/lorca"
)

type config struct {
	Docassets bool `json:docassets`
}

func main() {
	cwd, _ := os.Getwd()
	docpath := path.Join(cwd, "docassets")
	// swappath := path.Join(cwd, "swapper")
	flags := fmt.Sprintf("--load-extension=%v", docpath)

	config := config {false}
	data, err := os.ReadFile("config.json")
	if err != nil {
		data, _ := json.Marshal(config)
    	os.WriteFile("config.json", data, 0644)
	} else {
		json.Unmarshal(data, config)
	}
	cfcpy := config

	ui, _ := lorca.New("data:text/html,"+url.PathEscape(`
		<title>Deeeep.io Desktop App</title>
		<style>*{padding: 0; margin: 0; overflow: hidden}</style>
		<img id="img" src="https://tinyurl.com/m5a4d3vw"></img>
	`)+query(config), "", 887, 586, flags)
	time.Sleep(0 * time.Second)

	ui.Bind("setdocassets", func() {
		config.Docassets = !config.Docassets
		ui.Load(`https://deeeep.io`+query(config))
		menu(ui)
	})

	ui.Bind("reload", func() {
		ui.Load(`https://deeeep.io`+query(config))
		menu(ui)
	})
	
	ui.Load(`https://deeeep.io`+query(config))
	ui.SetBounds(lorca.Bounds {0, 0, 1200, 1000, "maximized"})
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

func query(config config) string {
	return fmt.Sprintf("?docassets=%v", config.Docassets)
}

func menu(ui lorca.UI) {
	ui.Eval(`
	window.onload = () => {
		const app = document.getElementById("app")
		const div = document.createElement('div')
		div.style.position = "absolute"
		div.style.zIndex = "100"
		div.style.width = "100%"
		div.innerHTML = '<nav id="menu" class="navbar navbar-expand navbar-dark bg-dark">\
		<div class="collapse navbar-collapse">\
			<ul class="navbar-nav mr-auto">\
				<li class="nav-item"><a class="nav-link" id="docassets">\
					<img style="width: 30px; height: 30px;" src="https://lh3.googleusercontent.com/JwLoyKugJQ-GNq-hGK94I23EJETk2_2Wi3UrLlShwBa1UTgiWFQQ4uvmKfxi7pacYwBbjg1IxOeus7Tlv8h5-Lui_5Q=w128-h128-e365-rj-sc0x00ffffff">\
				    <div id="doc-btn" class="position-absolute bg-success text-white px-1 rounded"\
						style="font-size: 10px; margin-top: -10px">ON</div>\
				</a></li>\
			</ul>\
			<ul class="navbar-nav">\
				<li class="nav-item"><a class="nav-link pull-right" onclick="dark()">\
					<svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="currentColor">\
						<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />\
					</svg>\
				</a></li>\
			</ul>\
		</div>\
		</nav>'
		document.body.insertBefore(div, app)

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
	}`)
}
