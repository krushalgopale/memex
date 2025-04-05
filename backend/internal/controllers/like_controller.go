package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/krushalgopale/memex/internal/database"
	"github.com/krushalgopale/memex/internal/models"
)

func LikeMeme(c *gin.Context) {
	memeID := c.Param("id")

	var meme models.Meme
	if err := database.DB.First(&meme, memeID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meme not found"})
		return
	}

	meme.Likes += 1

	if err := database.DB.Save(&meme).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to like meme"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Meme liked successfully"})
}
