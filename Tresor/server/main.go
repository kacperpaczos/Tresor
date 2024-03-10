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

	// these are the endpoints
	//C
	router.POST("/order/create", routes.AddOrder)
	//R
	router.GET("/waiter/:waiter", routes.GetOrdersByWaiter)
	router.GET("/orders", routes.GetOrders)
	router.GET("/order/:id/", routes.GetOrderById)
	//U
	router.PUT("/waiter/update/:id", routes.UpdateWaiter)
	router.PUT("/order/update/:id", routes.UpdateOrder)
	//D
	router.DELETE("/order/delete/:id", routes.DeleteOrder)

	// this starts the server and allows it to listen for requests.
	router.Run(":" + port)
}
