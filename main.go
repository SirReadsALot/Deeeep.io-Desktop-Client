package main

import (
	_ "embed"
	"encoding/json"
	"fmt"

	"io/ioutil"
	"log"

	"image/png"
	"math/rand"
	"net/url"
	"os"

	// "os/exec"

	core "github.com/SirReadsALot/deep_desktop/src"
	"github.com/vova616/screenshot"
	"github.com/zserge/lorca"
)

const SRC = "https://api.github.com/repos/SirReadsALot/Deeeep.io-Desktop-Client/releases/latest"
const VERSION = "v1.7"

//go:embed src/script.js
var script []byte

var index, _ = os.ReadFile("./src/index.html")

//var script, _ = os.ReadFile("./src/script.js")

func main() {
	/* go CheckUpdate()

	appdata, _ := os.UserCacheDir()
	os.Chdir(path.Join(appdata, "DDC", VERSION)) */

	log.SetOutput(ioutil.Discard)
	plugins := core.NewPluginManager()
	plugins.AddPlugins()
	plugins.LoadConfig()
	flags := plugins.InitPlugins()

	ui, err := lorca.New("data:text/html,"+url.PathEscape(`
		<html>
		<head>
		<title>Deeeep.io Desktop Client</title>
		<link rel="icon" href="./assets/favicon.ico">
		</head>
		<style>
		*{padding: 0; margin: 0; overflow: hidden}
		#loading{text-align: center; font-size: 40px; font-weight: bold; position:relative; z-index: 2; color: white;}
		</style>
		<img id="img" src="https://sralcodeproj.netlify.app/assets/myhailot.png" loading="lazy" style="object-fit: cover">
		</html>
	`), "", 1120, 740, flags, "--remote-allow-origins=*") // previous: 887x586
	CheckAndLogFatal(err)

	// <-update

	ui.Bind("setConfig", func(config string) {
		plugins.SetConfig([]byte(config))
	})

	ui.Bind("reload", func() {
		println(plugins.QueryPlugins())
		ui.Load(`https://deeeep.io` + plugins.QueryPlugins())
		EvalDefaultScripts(&ui, plugins)
	})
	ui.Bind("makeWindow", func(content string, width int, height int) {
		lorca.New("data:text/html,"+url.PathEscape(content), "", width, height, "--remote-allow-origins=*")
	})
	ui.Bind("exit", func() {
		ui.Close()
	})
	ui.Bind("screenshot", func() {
		img, err := screenshot.CaptureScreen()
		if err != nil {
			print(err)
		}
		i := rand.Intn(50)
		name := fmt.Sprintf("./screenshots/screenshot%d.png", i)
		save, err := os.Create(name)
		if err != nil {
			print(err)
		}
		err = png.Encode(save, img)
		if err != nil {
			print(err)
		}
		save.Close()
	})

	// time.Sleep(5 * time.Second)
	println(plugins.QueryPlugins())
	ui.Load(`https://deeeep.io` + plugins.QueryPlugins())
	ui.SetBounds(lorca.Bounds{
		Left:        0,
		Top:         0,
		Width:       1200,
		Height:      800,
		WindowState: lorca.WindowStateMaximized,
	})
	EvalDefaultScripts(&ui, plugins)
	core.DiscordRPC()

	defer func() {
		ui.Close()
		plugins.SaveConfig()
	}()

	<-ui.Done()
	fmt.Printf("mainWin exited.")
}

func EvalDefaultScripts(ref *lorca.UI, plugins core.PluginManager) {
	ui := *ref
	config, _ := json.Marshal(plugins.GetConfig())
	data, _ := json.Marshal(plugins.Plugins)
	ui.Eval(
		"const config = " + string(config) +
			";const data = " + string(data) +
			`;document.addEventListener("DOMContentLoaded", () => {
		const app = document.getElementById("app")
		const modal = document.createElement("div")
		app.appendChild(modal)
		modal.outerHTML =` + "`" + string(index) + "`" +
			`})`)
	ui.Eval(string(script))
}

func CheckAndLogFatal(e error) {
	if e != nil {
		panic(e)
	}
}

type Release struct {
	Tag string `json:"tag_name"`
}

/*
func CheckUpdate() {
	resp, err := http.Get(SRC)
	CheckAndLogFatal(err)
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	CheckAndLogFatal(err)
	var release Release
	json.Unmarshal(body, &release)
	if release.Tag != VERSION {
		println(VERSION, release.Tag)
		os.Chdir("./installer")
		cmd := exec.Command("installer")
		err := cmd.Start()
		CheckAndLogFatal(err)
		os.Exit(1)
	}
	core.DiscordRPC()
	update <- ""
}
*/
