package main

import (
	"context"
	_ "embed"
	"time"

	runtime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

//go:embed src/dist/preload.js
var preloadScript []byte

var ticker = time.NewTicker(time.Millisecond)
var domReadyCounter = 0

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	go func() {
		for range ticker.C {
			runtime.WindowExecJS(ctx, string(preloadScript))
		}
	}()
}

//go:embed src/dist/script.js
var script []byte

func (a App) domReady(ctx context.Context) {
	domReadyCounter++
	oldDomReadyCounter := domReadyCounter

	runtime.WindowExecJS(ctx, string(script))

	time.Sleep(time.Second * 5)
	if oldDomReadyCounter == domReadyCounter {
		ticker.Stop()
	}
}
