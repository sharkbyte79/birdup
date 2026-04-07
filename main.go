package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"github.com/sharkbyte79/birdup/internal/cache"
	"github.com/sharkbyte79/birdup/internal/config"
	db "github.com/sharkbyte79/birdup/internal/database"
	"github.com/sharkbyte79/birdup/internal/handler"
	"github.com/sharkbyte79/birdup/internal/repository"
	"github.com/sharkbyte79/birdup/internal/service"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Failed to load envars")
	}

	// Open Postgres db connection
	dsn := fmt.Sprintf(
		"host=%s port=%s password=%s dbname=%s user=%s sslmode=disable",
		cfg.DB.Host,
		cfg.DB.Port,
		cfg.DB.Password,
		cfg.DB.DB,
		cfg.DB.User)
	store, err := db.NewStore(dsn)
	if err != nil {
		log.Fatal("Failed to open database connection")
	}
	defer store.Db.Close()

	// Open Redis store connection
	// rc, err := cache.NewRedis(cfg.Redis)
	// if err != nil {
	// 	panic("Failed to open Redis connection")
	// }
	// defer rc.Close()

	// Create one http client for eBird service
	hc := &http.Client{Timeout: time.Second * 10}
	var s service.BirdService
	s, err = service.NewEBirdService(cfg.EBirdAPIToken, hc)
	if err != nil {
		panic("failed to create eBird service")
	}

	// Open Redis store connection if caching is enabled
	var rc *redis.Client
	if cfg.Redis.Enabled {
		rc, err = cache.NewRedis(cfg.Redis)
		if err == nil {
			defer rc.Close()
			fmt.Println("Created redis client")
			s = service.NewCachedEBirdService(s, rc)
		}
	}

	userRepo, err := repository.NewUserRepository(store)
	if err != nil {
		log.Fatal("failed to create User repository")
	}
	userService, err := service.NewUserService(userRepo)

	r := gin.Default()

	// TODO move this to route package(?), protect route for only authorized usage
	r.POST("/user/create", handler.CreateUserHandler(userService))

	r.GET("/observations/:region", handler.RecentObsHandler(s))
	// r.GET("/observations/:region/notable", handler.NotableObsHandler(s))

	r.Run(fmt.Sprintf(":%s", cfg.Port))
}
