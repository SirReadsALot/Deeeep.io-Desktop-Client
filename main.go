package main

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path"

	core "github.com/SirReadsALot/deep_desktop/src"
	"github.com/zserge/lorca"
)

const SRC = "https://api.github.com/repos/SirReadsALot/Deeeep.io-Desktop-Client/releases/latest"
const VERSION = "v1.7"

var script, _ = os.ReadFile("./src/script.js")
var index, _ = os.ReadFile("./src/index.html")

var update = make(chan string)

func main() {
	go CheckUpdate()

	appdata, _ := os.UserCacheDir()
	os.Chdir(path.Join(appdata, "DDC", VERSION))

	log.SetOutput(ioutil.Discard)
	plugins := core.NewPluginManager()
	plugins.AddPlugins()
	plugins.LoadConfig()
	flags := plugins.InitPlugins()

	ui, err := lorca.New("data:text/html,"+url.PathEscape(`
		<html>
		<title>Deeeep.io Desktop Client</title>
		<style>
		*{padding: 0; margin: 0; overflow: hidden}
		#loading{text-align: center; font-size: 40px; font-weight: bold; position:relative; z-index: 2; color: white;}
		</style>
		<img id="img" src="https://sralcodeproj.netlify.app/assets/myhailot.png">
		</html>
	`), "", 1120, 740, flags, "--disable-dinosaur-easter-egg") // previous: 887x586
	CheckAndLogFatal(err)

	<-update

	ui.Bind("setConfig", func(config string) {
		plugins.SetConfig([]byte(config))
	})

	ui.Bind("reload", func() {
		ui.Load(`https://deeeep.io` + plugins.QueryPlugins())
		EvalDefaultScripts(&ui, plugins)
	})

	ui.Load(`https://deeeep.io` + plugins.QueryPlugins())
	ui.SetBounds(lorca.Bounds{0, 0, 1200, 800, lorca.WindowStateMaximized})
	EvalDefaultScripts(&ui, plugins)

	defer func() {
		ui.Close()
		plugins.SaveConfig()
	}()

	<-ui.Done()
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
