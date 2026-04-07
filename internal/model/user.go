package model

import "time"

// User models a single Birdup account.
type User struct {
	FirebaseId string    `json:"firebaseID"` // User ID assigned by Firebase
	Email      string    `json:"email"`      // Email provided at sign up
	CreatedAt  time.Time `json:"createdAt"`  // Timestamp for account creation
}

type CreateUserRequest struct {
	FirebaseID string `json:"firebaseId"`
	Email      string `json:"email"`
}

type GetUserRequest struct {
	FirebaseID string `json:"firebaseId"`
}
