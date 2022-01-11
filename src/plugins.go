package core

import (
	"encoding/json"
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
	Active bool `json:"active"`
	// Installed bool
}

type PluginManager struct {
	Plugins map[string]Plugin
	Config  map[string]Config
}

type Plugin struct {
	Type    PluginType `json:"type"`
	Name    string     `json:"name"`
	Path    string     `json:"path"`
	Default bool       `json:"default"`
	Src     string     `json:"src"`
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

func (p *PluginManager) AddPlugin(Type PluginType, Name string, Path string, Default bool) {
	p.Plugins[Path] = Plugin{Type, Name, Path, Default, ""}
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
		ext := "plugins/" + plugin.Path
		if plugin.Type == EXTENSION {
			flag = flag + path.Join(cwd, ext) + ","
		} else {
			dat, _ := os.ReadFile(ext + "/script.js")
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
			query = query + plugin.Path + "=true&&"
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
