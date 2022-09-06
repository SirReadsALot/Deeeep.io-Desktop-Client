package main

import (
	"encoding/json"
	"log"
	"net/url"
	"os"
	"time"

	core "github.com/SirReadsALot/deep_desktop/src"
	"github.com/zserge/lorca"
)

/* default sirreads' pc:
** GOARCH=amd64
** GOOS=windows
 */

var script, _ = os.ReadFile("./src/script.js")
var index, _ = os.ReadFile("./src/index.html")

func main() {
	plugins := core.NewPluginManager()
	plugins.AddPlugin(core.EXTENSION, "Docassets", "docassets", true)
	plugins.AddPlugin(core.EXTENSION, "Swapper", "swapper", true)
	plugins.AddPlugin(core.SCRIPT, "DiscordRPC", "rpc", true)
	plugins.AddPlugin(core.SCRIPT, "Evotree", "evotree", true)
	plugins.LoadConfig()
	flags := plugins.InitPlugins()

	ui, err := lorca.New("data:text/html,"+url.PathEscape(`
		<title>Deeeep.io Desktop Client</title>
		<head>
		<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js">
		document.onkeyup = function(e) {
			if (e.ctrlKey && e.which == 68) {
				html2canvas(document.body).then((canvas) => {
					let a = document.createElement("a");
					a.download = "screenshot.png";
					a.href = canvas.toDataURL("image/png");
					// a.click();
				  });
			}
		}
		</script>
		</head>
		<style>*{padding: 0; margin: 0; overflow: hidden}
		#loading{text-align: center; font-size: 40px; font-weight: bold; position: absolute; z-index: 2; color: white;}</style>
		<!-- <img id="img" src="https://tinyurl.com/m5a4d3vw"></img> -->
		<img id="img" src="https://sralcodeproj.netlify.app/assets/myhailot.png"></img>
		<h3 id="loading">Loading...</h3>
	`), "", 1120, 740, flags, "--disable-dinosaur-easter-egg") // previous: 887x586
	time.Sleep(2 * time.Second)
	CheckAndLogFatal(err)

	core.DiscordRpc() //&ui)
	/* ui.Bind("setConfig", func(config map[string]core.Config) {
		plugins.Config = config
	}) */

	ui.Bind("reload", func() {
		ui.Load(`https://beta.deeeep.io` + plugins.QueryPlugins())
		plugins.ReloadPlugins(&ui)
		EvalDefaultScripts(&ui, plugins)
	})

	ui.Load(`https://beta.deeeep.io` + plugins.QueryPlugins())
	ui.SetBounds(lorca.Bounds{0, 0, 1200, 800, ""})
	plugins.ReloadPlugins(&ui)
	EvalDefaultScripts(&ui, plugins)

	defer func() {
		ui.Close()
		plugins.SaveConfig()
	}()

	<-ui.Done()
}

func EvalDefaultScripts(ref *lorca.UI, plugins core.PluginManager) {
	ui := *ref
	config, _ := json.Marshal(plugins.Config)
	data, _ := json.Marshal(plugins.Plugins)
	ui.Eval(
		"const config = " + string(config) +
			";const data = " + string(data),
	)
	ui.Eval(`window.addEventListener("load", () => {
		const app = document.getElementById("app")
		const modal = document.createElement("div")
		app.appendChild(modal)
		modal.outerHTML =` + "`" + string(index) + "`" +
		`})`)
	ui.Eval(string(script))
}

func CheckAndLogFatal(e error) {
	if e != nil {
		log.Fatal(e)
	}
}
