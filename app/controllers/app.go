package controllers

import "github.com/robfig/revel"

type App struct {
	TxnController
}

func (c App) Index() revel.Result {
	return c.Render()
}
