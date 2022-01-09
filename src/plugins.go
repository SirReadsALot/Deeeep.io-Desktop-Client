package core

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path"

	"github.com/zserge/lorca"
)

var cwd, _ = os.Getwd()

type PluginType = uint8

const (
	SCRIPT PluginType = iota
	EXTENSION
)

type Config = struct {
	Active bool
	// Installed bool
}

type PluginManager struct {
	Plugins   map[string]Plugin
	Config    map[string]Config
}

type Plugin struct {
	Type    PluginType
	Name    string
	Default bool
	Src     string
	// Url       string
}

func NewPluginManager() PluginManager {
	return PluginManager{
		map[string]Plugin{},
		map[string]Config{},
	}
}

func (p *PluginManager) LoadConfig() {
	config := map[string]Config{}
	data, err := os.ReadFile("config.json")
	if err != nil {
		for name, plugin := range p.Plugins {
			config[name] = Config{plugin.Default}
		}
		data, _ := json.Marshal(config)
		os.WriteFile("config.json", data, 0644)
	} else {
		json.Unmarshal(data, &config)
		for name, plugin := range p.Plugins {
			_, ok := config[name]
			if !ok {
				config[name] = Config{plugin.Default}
			}
		}
	}
	p.Config = config
}

func (p *PluginManager) AddPlugin(Type PluginType, Name string, Default bool) {
	p.Plugins[Name] = Plugin{Type, Name, Default, ""}
}

func (p *PluginManager) InitPlugins() string {
	// if _, err := os.Stat("/plugins"); os.IsNotExist(err) {
	// 	var err = os.Mkdir("plugins", 0755)
	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}
	// }
	flag := "--load-extension="
	for name, plugin := range p.Plugins {
		ext := fmt.Sprintf("plugins/%v", plugin.Name)
		if plugin.Type == EXTENSION {
			flag = fmt.Sprintf("%v%v,", flag, path.Join(cwd, ext))
		} else {
			dat, _ := os.ReadFile(fmt.Sprintf("%v/script.js", ext))
			plugin, _ := p.Plugins[name]
			plugin.Src = string(dat)
			p.Plugins[name] = plugin
		}
	}
	return flag
}

func (p *PluginManager) QueryPlugins() string {
	query := "?"
	for name, plugin := range p.Plugins {
		if plugin.Type == EXTENSION && p.Config[name].Active {
			query = fmt.Sprintf("%v%v=true&&", query, plugin.Name)
		}
	}
	return query
}

func (p *PluginManager) ReloadPlugins(ui *lorca.UI) {
	for name, plugin := range p.Plugins {
		if plugin.Type == SCRIPT && p.Config[name].Active {
			(*ui).Eval(plugin.Src)
		}
	}
}

func (p *PluginManager) SaveConfig() {
	data, err := json.Marshal(p.Config)
	CheckAndLogFatal(err)
	err = os.WriteFile("config.json", data, 0644)
	CheckAndLogFatal(err)
}

//TODO: Currently all extensions are assumed to be installed
// func (p *PluginManager) CheckAndInstall(plugin Plugin) {
// 	for _, plugin := range p.plugins {
// 		if !plugin.Installed {
// 		}
// 	}
// }

func CheckAndLogFatal(e error) {
	if e != nil {
		log.Fatal(e)
	}
}
