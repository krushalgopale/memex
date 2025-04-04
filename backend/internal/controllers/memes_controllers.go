package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/krushalgopale/memex/internal/database"
	"github.com/krushalgopale/memex/internal/models"
)

func DiscoverMemes(c *gin.Context) {
	memes := models.Meme{}

	if err := database.DB.Find(&memes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find url"})
	}

	c.JSON(http.StatusOK, memes)
}
