package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	svc "github.com/sharkbyte79/birdup/internal/service"
)

// RecentObsHandler returns a HandlerFunc that handles a GET request to
// retrieve a bundle of recent bird observations.
func RecentObsHandler(s svc.BirdService) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		region := ctx.Param("region")

		res, err := s.RecentObsByRegion(region, 14, 30)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}

		ctx.IndentedJSON(http.StatusOK, res)
	}
}

// recentObsHandler returns a HandlerFunc that handles a GET request to
// retrieve a bundle of notable bird observations.
// func NotableObsHandler(s *svc.EBirdService) gin.HandlerFunc {
// 	return func(ctx *gin.Context) {
// 		region := ctx.Param("region")

// 		res, err := s.NotableObsByRegion(region, 14, 30)
// 		if err != nil {
// 			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		}

// 		ctx.IndentedJSON(http.StatusOK, res)
// 	}
// }
