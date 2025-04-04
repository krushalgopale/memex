package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/krushalgopale/memex/internal/controllers"
	"github.com/krushalgopale/memex/internal/middleware"
)

func Routes(r *gin.Engine) {
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type","Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

  r.OPTIONS("/*path", func(c *gin.Context) {
		c.AbortWithStatus(204)
	})

	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)

	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware)
	protected.POST("/upload", controllers.UploadFile)
	protected.GET("/memes", controllers.DiscoverMemes)
}
