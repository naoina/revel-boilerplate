package controllers

import (
	"github.com/robfig/revel"
)

func init() {
	revel.OnAppStart(Init)
	revel.InterceptMethod((*TxnController).Begin, revel.BEFORE)
	revel.InterceptMethod((*TxnController).Commit, revel.AFTER)
	revel.InterceptMethod((*TxnController).Rollback, revel.FINALLY)
}
