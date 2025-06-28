package core

import (
	"encoding/json"
	"log"
	"os"
	"path"
	"path/filepath"
	"strings"
)

type PluginType = uint8

const (
	SCRIPT PluginType = iota
	EXTENSION
)

func GetCwd() string {
	if strings.Contains(os.Args[0], "go-build") {
		var cwd, _ = os.Getwd()
		return cwd
	} else {
		var exec, _ = os.Executable()
		return filepath.Dir(exec)
	}
}

var cwd = GetCwd()

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
	data, err := json.Marshal(p.GetConfig())
	CheckAndLogFatal(err)
	return "?config=" + string(data)
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
	err = os.WriteFile(path.Join(cwd, "config.json"), data, 0644)
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
	p.AddPlugin(EXTENSION, "Docassets", "docassets", Config{
		"active":    true,
		"pet":       "",
		"customPet": "",
	})
	// p.AddPlugin(EXTENSION, "Swapper", "swapper", Config{})
	p.AddPlugin(SCRIPT, "DiscordRPC", "rpc", Config{"active": false})
	p.AddPlugin(SCRIPT, "DeeeepioBGM", "deeeepio_bgm", Config{
		"area21": "",
		"area22": "",
		"area25": "",
		"area26": "",
		"area37": "",
		"area38": "",
		"area41": "",
		"area42": "",
	})
}
