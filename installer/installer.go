package main

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"

	"github.com/zserge/lorca"
)

type Release struct {
	Url string `json:"zipball_url"`
	Tag string `json:"tag_name"`
}

const SRC = "https://api.github.com/repos/SirReadsALot/Deeeep.io-Desktop-Client/releases/latest"

var version = ""

var percent = 0

func main() {
	ui, _ := lorca.New("data:text/html,"+url.PathEscape(`
	<title>Deeeep.io Desktop Client Installer</title>
	<meta name="theme-color" content="#1c307d">
	<body style="background-color: rgb(44, 62, 80)">
		<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
			<div style="background-color: rgba(0, 0, 0, 0.3); width: 250px; height: 10px; border-radius: 5px;"></div>
			<div style="background-color: rgba(255, 255, 255); height: 10px; border-radius: 5px;
			position: absolute; transform: translateY(-100%);" id="bar"></div>
			<img src="https://beta.deeeep.io/assets/characters/fish.png" id="img"
			style="transform: rotate(90deg) translateX(-82%); position: absolute; width: 50px;">
		</div>
	</body>
	`), "", 0, 0)

	ui.Eval(`
    const img = document.getElementById("img")
    const bar = document.getElementById("bar")
    `)

	ui.SetBounds(lorca.Bounds{
		Left:   500,
		Top:    300,
		Width:  500,
		Height: 300,
	})

	appdata, _ := os.UserCacheDir()
	os.Chdir(appdata)
	err := os.MkdirAll("DDC", os.ModePerm)
	CheckAndLogFatal(err)
	git := Fetch(SRC)
	var release Release
	json.Unmarshal(git, &release)
    version = release.Tag
	zip := Fetch(release.Url)
    Progress(ui, 50)
	err = Unzip(zip, "./DDC", ui)
	CheckAndLogFatal(err)
	ui.Close()

    os.Chdir(path.Join(".", version))
    exec.Command("powershell", "-NoProfile", ".\\shortcut.ps1").Start()
    exec.Command("main").Start()
    CheckAndLogFatal(err)

	defer func() {
		ui.Close()
	}()

	<-ui.Done()
}

func Fetch(src string) []byte {
	resp, err := http.Get(src)
	CheckAndLogFatal(err)
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	CheckAndLogFatal(err)
	return body
}

func CheckAndLogFatal(e error) {
	if e != nil {
		panic(e)
	}
}

func Progress(ui lorca.UI, delta int) {
	percent += delta
	ui.Eval(`
    img.style.marginLeft = "` + fmt.Sprint(percent) + `px"
    bar.style.width = "` + fmt.Sprint(percent) + `px"
    `)
}

func Unzip(body []byte, dest string, ui lorca.UI) error {
	r, err := zip.NewReader(bytes.NewReader(body), int64(len(body)))
	if err != nil {
		return err
	}

	os.MkdirAll(dest, 0755)

	// Closure to address file descriptors issue with all the deferred .Close() methods
	extractAndWriteFile := func(f *zip.File) error {
		rc, err := f.Open()
		if err != nil {
			return err
		}
		defer func() {
			if err := rc.Close(); err != nil {
				panic(err)
			}
		}()

		path := filepath.Join(dest, f.Name)

		// Check for ZipSlip (Directory traversal)
		if !strings.HasPrefix(path, filepath.Clean(dest)+string(os.PathSeparator)) {
			return fmt.Errorf("illegal file path: %s", path)
		}

		if f.FileInfo().IsDir() {
			os.MkdirAll(path, f.Mode())
		} else {
			os.MkdirAll(filepath.Dir(path), f.Mode())
			f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
			if err != nil {
				return err
			}
			defer func() {
				if err := f.Close(); err != nil {
					panic(err)
				}
			}()

			_, err = io.Copy(f, rc)
			if err != nil {
				return err
			}
		}
		return nil
	}

	for _, f := range r.File {
		err := extractAndWriteFile(f)
        Progress(ui, 200 / len(r.File))
		if err != nil {
			return err
		}
	}

    os.Chdir("./DDC")
    os.Rename(r.File[0].Name, version)

	return nil
}
