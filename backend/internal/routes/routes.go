package routes

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/krushalgopale/memex/internal/controllers"
	"github.com/krushalgopale/memex/internal/middleware"
)

func Routes(r *gin.Engine) {
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://memex-nf9k.onrender.com"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Access-Control-Allow-Origin","Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)

	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware)
	protected.POST("/upload", controllers.UploadFile)
	protected.POST("/memes/:id/like", controllers.LikeMeme)
	protected.GET("/memes", controllers.DiscoverMemes)
}
