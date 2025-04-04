package controllers

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
	"github.com/krushalgopale/memex/internal/database"
	"github.com/krushalgopale/memex/internal/models"
)

func UploadFile(c *gin.Context) {

	cloudinaryURL := os.Getenv("CLOUDINARY_URL")
	cld, err := cloudinary.NewFromURL(cloudinaryURL)

	if err != nil {
		log.Fatal("Cloudinary config error:", err)
	}

	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file is required"})
		return
	}

	file, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open file"})
	}
	defer file.Close()

	ctx := context.Background()

	uploadResult, err := cld.Upload.Upload(ctx, file, uploader.UploadParams{Folder: "memes"})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Uplaod failed"})
		return
	}

	url := models.Meme{
		Url: uploadResult.SecureURL,
	}

	if err := database.DB.Create(&url).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create url"})
	}

	c.JSON(http.StatusOK, gin.H{"message": "Upload successful"})

}
