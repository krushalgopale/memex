package database

import (
	"fmt"
	"log"
	"os"

	"github.com/krushalgopale/memex/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnDB() {
	dbURL := os.Getenv("DB_URL")

	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("Database Connected Successfully")

	db.AutoMigrate(&models.User{}, &models.Meme{})
	DB = db
}
