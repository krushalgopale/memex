package middleware

import (
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(c *gin.Context) {
	// Get JWT token form cookie
	tokenString, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token missing"})
		c.Abort()
		return
	}

	// Parse JWT token
	jwtSecretKey := []byte(os.Getenv("JWT_SECRET"))
	token, err := jwt.Parse(
		tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtSecretKey, nil
		}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	// Token validation
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		c.Abort()
		return
	}

	// Extract claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{"error": "Failed to parse claims"},
		)
		c.Abort()
		return
	}

	// Store user ID in context
	if sub, ok := claims["sub"].(string); ok {
		uid, err := strconv.ParseUint(sub, 10, 64)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
			c.Abort()
			return
		}
		c.Set("userID", uint(uid))
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}
}
