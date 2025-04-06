package main

import (
	

	"github.com/gin-gonic/gin"
	
	"github.com/krushalgopale/memex/internal/database"
	"github.com/krushalgopale/memex/internal/routes"
)

func init() {
	// db connection
	database.ConnDB()
}

func main() {
	// routes
	r := gin.Default()
	routes.Routes(r)
	r.Run(":8080")
}
