package main

import (
	"log"
	"net/url"
	"os"
	"time"

	"github.com/SirReadsALot/deep_desktop/src"
	"github.com/zserge/lorca"
)

/* default sirreads' pc:
** GOARCH=amd64
** GOOS=windows
 */

var script, _ = os.ReadFile("./src/script.js")

func main() {
	plugins := core.NewPluginManager()
	plugins.AddPlugin(core.EXTENSION, "docassets", true)
	plugins.AddPlugin(core.EXTENSION, "swapper", true)
	plugins.AddPlugin(core.SCRIPT, "rpc", true)
	plugins.AddPlugin(core.SCRIPT, "evotree", true)
	plugins.LoadConfig()
	flags := plugins.InitPlugins()

	ui, err := lorca.New("data:text/html,"+url.PathEscape(`
		<title>Deeeep.io Desktop App</title>
		<style>*{padding: 0; margin: 0; overflow: hidden}
		#loading{text-align: center; font-size: 40px; font-weight: bold; position: absolute; z-index: 2; color: white;}</style>
		<!-- <img id="img" src="https://tinyurl.com/m5a4d3vw"></img> -->
		<img id="img" src="https://sralcodeproj.netlify.app/assets/myhailot.png"></img>
		<h3 id="loading">Loading...</h3>
	`), "", 1120, 740, flags, "--disable-dinosaur-easter-egg") // previous: 887x586
	time.Sleep(2 * time.Second)
	CheckAndLogFatal(err)

	core.DiscordRpc(&ui)
	ui.Bind("setConfig", func(config map[string]core.Config) {
		plugins.Config = config
		ui.Load(`https://beta.deeeep.io` + plugins.QueryPlugins())
		plugins.ReloadPlugins(&ui)
		ui.Eval(string(script))
	})

	ui.Load(`https://beta.deeeep.io` + plugins.QueryPlugins())
	ui.SetBounds(lorca.Bounds{0, 0, 1200, 1000, "maximized"})
	plugins.ReloadPlugins(&ui)
	ui.Eval(string(script))

	defer func() {
		ui.Close()
		plugins.SaveConfig()
	}()
	<-ui.Done()
}

func CheckAndLogFatal(e error) {
	if e != nil {
		log.Fatal(e)
	}
}
