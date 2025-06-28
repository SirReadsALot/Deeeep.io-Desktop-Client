package main

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"time"

	"io/ioutil"
	"log"

	"image/png"
	"math/rand"
	"net/http"
	"net/url"
	"os"

	"os/exec"

	core "github.com/SirReadsALot/deep_desktop/src"
	"github.com/vova616/screenshot"
	"github.com/zserge/lorca"
)

const SRC = "https://api.github.com/repos/SirReadsALot/Deeeep.io-Desktop-Client/releases/latest"
const VERSION = "v2.1"

//go:embed src/script.js
var script []byte

//go:embed src/index.html
var index []byte

//go:embed src/icon.js
var iconScript []byte

//var index, _ = os.ReadFile("./src/index.html")
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
		<link rel="shortcut icon"type="image/x-icon" href="data:image/x-icon;,">
		</head>
		<style>
		*{padding: 0; margin: 0; overflow: hidden}
		#loading{text-align: center; font-size: 40px; font-weight: bold; position:relative; z-index: 2; color: white;}
		#img{width:1110; height:735}
		</style>
		<img id="img" loading="lazy" style="object-fit: cover">
		<script>
		var IMG = document.getElementById('img')
		ls = ['https://raw.githubusercontent.com/SirReadsALot/sralcodeproj/main/assets/myhailot2.png',
			  'https://raw.githubusercontent.com/SirReadsALot/sralcodeproj/main/assets/myhailot.png',
			  'https://raw.githubusercontent.com/SirReadsALot/sralcodeproj/main/assets/ftyk.png',
			  'https://raw.githubusercontent.com/SirReadsALot/sralcodeproj/main/assets/megamew.png',
			  'https://raw.githubusercontent.com/SirReadsALot/sralcodeproj/main/assets/megamew2.png',
			  'https://raw.githubusercontent.com/SirReadsALot/sralcodeproj/main/assets/megamew3.png',
			  'https://raw.githubusercontent.com/SirReadsALot/sralcodeproj/main/assets/jhmm82.png']

		function rand(kl) {const randInx = Math.floor(Math.random() * kl.length); const item = kl[randInx]; return item}
		const link = rand(ls)
		IMG.setAttribute('src', link)
		</script>
		</html>
	`), "", 1120, 740, flags, "--remote-allow-origins=*") // previous: 887x586
	ui.Eval(string(iconScript))
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

	ui.Bind("getYoutubeInfo", func(id string) string {
		res, _ := http.Post(
			"https://music.youtube.com/youtubei/v1/player?prettyPrint=false",
			"application/json",
			bytes.NewBuffer([]byte(`{"videoId":"`+id+`","context":{"client":{"clientName":"IOS","clientVersion":"19.09.3"}}}`)),
		)
		defer res.Body.Close()
		body, _ := io.ReadAll(res.Body)
		return string(body)
	})

	time.Sleep(5 * time.Second)
	//println(plugins.QueryPlugins())
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
	ui.Eval(string(iconScript))
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
	update := make(chan string)

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
