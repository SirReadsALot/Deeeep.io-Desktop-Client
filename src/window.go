package core

import (
	"fmt"

	"github.com/zserge/lorca"
)

func makeWindow() {
	fmt.Println("works")
	lorca.New("f", "$", 23, 23)
}
