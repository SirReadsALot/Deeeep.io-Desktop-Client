package core

import (
	"fmt"

	"github.com/zserge/lorca"
)

func makeWindow(assetswap lorca.UI) {
	fmt.Println("new window works")
	lorca.New("f", "$", 23, 23)
}
