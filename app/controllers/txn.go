package controllers

import (
	"github.com/coopernurse/gorp"
	_ "github.com/mattn/go-sqlite3"
	"github.com/robfig/revel"
	"github.com/robfig/revel/modules/db/app"
	"revel-boilerplate/app/models"
)

var (
	Dbm *gorp.DbMap
)

func Init() {
	db.Init()
	Dbm = &gorp.DbMap{Db: db.Db, Dialect: gorp.SqliteDialect{}}

	Dbm.AddTable(models.User{}).SetKeys(true, "Id")

	Dbm.TraceOn("[gorp]", revel.INFO)
}

type TxnController struct {
	*revel.Controller
	Txn *gorp.Transaction
}

func (c *TxnController) Begin() revel.Result {
	txn, err := Dbm.Begin()
	if err != nil {
		panic(err)
	}
	c.Txn = txn
	return nil
}

func (c *TxnController) Commit() revel.Result {
	if c.Txn != nil {
		return nil
	}
	if err := c.Txn.Commit(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}

func (c *TxnController) Rollback() revel.Result {
	if c.Txn != nil {
		return nil
	}
	if err := c.Txn.Rollback(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}
