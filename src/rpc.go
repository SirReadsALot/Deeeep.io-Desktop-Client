package core

import (
	"fmt"
	"time"

	"github.com/hugolgst/rich-go/client"
	// "github.com/zserge/lorca"
)

func DiscordRpc() { //ui *lorca.UI) {
	// (*ui).Bind("DiscordRpc", func() {
	err := client.Login("817817065862725682")
	if err != nil {
		fmt.Println(err)
	}

	now := time.Now()
	ticker := time.NewTicker(5 * time.Second)
	go func() {
		for {
			select {
			case <-ticker.C:
				err = client.SetActivity(client.Activity{
					Details:    "Playing Unknown gamemode",
					LargeImage: "deeplarge_2",
					LargeText:  "Playing Deeeep.io Desktop Client",
					SmallImage: "ffa",
					SmallText:  "Playing Unknown gamemode",
					Timestamps: &client.Timestamps{
						Start: &now,
					},
				})
			}
		}
	}()
	// _ = client.SetActivity(client.Activity{
	// 	Details:    "Playing Unknown gamemode",
	// 	LargeImage: "deeplarge_2",
	// 	LargeText:  "Playing Deeeep.io Desktop Client",
	// 	SmallImage: "ffa",
	// 	SmallText:  "Playing Unknown Gamemode",
	// 	Timestamps: &client.Timestamps{
	// 		Start: &now,
	// 	},
	// })
	// })
}
