package main

import (
	"net/url"
	"time"

	"github.com/zserge/lorca"
)

func main() {
	ui, _ := lorca.New("data:text/html,"+url.PathEscape(`
		<title>Deeeep.io Desktop App</title>
		<style>*{padding: 0; margin: 0; overflow: hidden}</style>
		<img id="img" src="https://tinyurl.com/m5a4d3vw"></img>
	`), "", 887, 586)

	time.Sleep(2 * time.Second)

	ui.Load(`https://deeeep.io`)
	ui.SetBounds(lorca.Bounds {0, 0, 1200, 1000, "maximized"})
	ui.Eval(`
	window.onload = () => {
		const app = document.getElementById("app")
		const div = document.createElement('div')
		div.style.position = "absolute"
		div.style.zIndex = "100"
		div.style.width = "100%"
		div.innerHTML = '<nav class="navbar navbar-expand navbar-light bg-light">\
		<div class="collapse navbar-collapse">\
			<ul class="navbar-nav">\
				<li class="nav-item">\
					<a class="nav-link">Home</a>\
				</li>\
				<li class="nav-item">\
					<a class="nav-link">Features</a>\
				</li>\
			</ul>\
		</div>\
		</nav>'
		document.body.insertBefore(div, app)
	}
	`)
	defer ui.Close()
	<-ui.Done()
}
