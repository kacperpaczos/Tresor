package main

import (
	"database/sql"
	"os"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func connectDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", "username:password@tcp(localhost:3306)/mydb")
	if err != nil {
		return nil, err
	}
	return db, nil
}

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		port = "5000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	router.Use(cors.New(config))

	// te są endpointy dla logowania i rejestracji
	router.POST("/login", routes.LoginUser) // logowanie użytkownika
	router.POST("/register", routes.RegisterUser) // rejestracja użytkownika

	// this starts the server and allows it to listen for requests.
	router.Run(":" + port)
}
