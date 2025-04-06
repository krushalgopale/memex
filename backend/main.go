package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/krushalgopale/memex/internal/database"
	"github.com/krushalgopale/memex/internal/routes"
)

func init() {
	// load env
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// db connection
	database.ConnDB()
}

func main() {
	// routes
	r := gin.Default()
	routes.Routes(r)
	r.Run(":8080")
}
