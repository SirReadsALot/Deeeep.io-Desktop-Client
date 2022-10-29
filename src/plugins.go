package core

import (
	"encoding/json"
	"log"
	"os"
	"path"
)

type PluginType = uint8

const (
	SCRIPT PluginType = iota
	EXTENSION
)

type Active struct {
	Active bool
}

type Config = map[string]interface{}

type PluginManager struct {
	Plugins map[string]Plugin
}

type Plugin struct {
	Type   PluginType `json:"type"`
	Name   string     `json:"name"`
	Path   string     `json:"path"`
	Src    string     `json:"src"`
	Config Config
}

func NewPluginManager() PluginManager {
	return PluginManager{
		map[string]Plugin{},
	}
}

func (p *PluginManager) LoadConfig() {
	data, err := os.ReadFile("config.json")
	if err == nil {
		p.SetConfig(data)
	}
}

func (p *PluginManager) SetConfig(data []byte) {
	config := Config{}
	json.Unmarshal(data, &config)
	for name, plugin := range p.Plugins {
		value, ok := config[name]
		if ok {
			plugin.Config = value.(Config)
			p.Plugins[name] = plugin
		}
	}
}

func (p *PluginManager) AddPlugin(Type PluginType, name string, path string, config Config) {
	p.Plugins[path] = Plugin{Type, name, path, "", config}
}

func (p *PluginManager) InitPlugins() string {
	flag := "--load-extension="
	var cwd, _ = os.Getwd()
	for name, plugin := range p.Plugins {
		ext := "plugins/" + plugin.Path
		if plugin.Type == EXTENSION {
			flag = flag + path.Join(cwd, ext) + ","
		} else {
			dat, _ := os.ReadFile(ext + "/script.js")
			plugin.Src = string(dat)
			p.Plugins[name] = plugin
		}
	}
	return flag
}

func (p *PluginManager) QueryPlugins() string {
	query := "?"
	for _, plugin := range p.Plugins {
		active, ok := plugin.Config["Active"]
		if plugin.Type == EXTENSION && ok {
			if active.(bool) {
				query = query + plugin.Path + "=true&&"
			}
		}
	}
	return query
}

func (p *PluginManager) GetConfig() map[string]Config {
	var config = map[string]Config{}
	for name, plugin := range p.Plugins {
		config[name] = plugin.Config
	}
	return config
}

func (p *PluginManager) SaveConfig() {
	data, err := json.Marshal(p.GetConfig())
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

func (p *PluginManager) AddPlugins() {
	p.AddPlugin(EXTENSION, "Docassets", "docassets", Config{"Active": true})
	p.AddPlugin(EXTENSION, "Swapper", "swapper", Config{})
	p.AddPlugin(SCRIPT, "DiscordRPC", "rpc", Config{"Usrnm": ""})
}
