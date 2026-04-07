package handler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sharkbyte79/birdup/internal/model"
	svc "github.com/sharkbyte79/birdup/internal/service"
	// models "github.com/sharkbyte79/birdup/internal/model"
)

// CreateUserHandler returns a HandlerFunc that handles a POST request to
// create a new User record.
func CreateUserHandler(s *svc.UserService) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newUser model.CreateUserRequest

		// Attempt to bind JSON fields to user creation dto
		if err := ctx.BindJSON(&newUser); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "failed to decode request body",
			})
			return
		}

		u := &model.User{
			FirebaseId: newUser.FirebaseID,
			Email:      newUser.Email,
			CreatedAt:  time.Now(),
		}
		if err := s.Create(u); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		// NOTE returning indented json is more resource intensive
		ctx.IndentedJSON(http.StatusCreated, u)
	}
}

// func GetUserHandler(s *svc.UserService) gin.HandlerFunc {
// 	return func(ctx *gin.Context) {
// 		var userReq dto.GetUserRequest

// 		if err := ctx.BindJSON(&userReq); err != nil {
// 			ctx.JSON(http.StatusBadRequest, gin.H{
// 				"error": err.Error(),
// 			})
// 		}

// 		// user, err :=
// 		ctx.JSON(http.StatusOK)
// 	}
// }

// func DeleteUserHandler(s *svc.UserService) gin.HandlerFunc {}

// func UpdateUserHandler(s *svc.UserService) gin.HandlerFunc {}
