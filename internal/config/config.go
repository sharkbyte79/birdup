// Package config provides a configuration object for accessing all secrets via
// a unitary source.
package config

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

// Config defines a configuration of secrets necessary for the app to function.
type Config struct {
	Port          string
	BaseURL       string
	EBirdAPIToken string
	DB            PostgresConfig
	Redis         RedisConfig
}

// PostgresConfig defines a configuration of credentials for connecting to
// a PostgreSQL database. Use these fields to construct the Data Source Name.
type PostgresConfig struct {
	Password string
	User     string
	DB       string
	Port     string
	Host     string
}

// RedisConfig defines a configuration of credentials for connecting to
// a Redis in-memory store.
type RedisConfig struct {
	Password string
	Address  string
	DB       int
	Enabled  bool
}

// LoadConfig returns a pointer to a Config and an error.
func LoadConfig() (*Config, error) {
	cfg := &Config{
		Port:          os.Getenv("PORT"),
		BaseURL:       os.Getenv("API_BASE_URL"),
		EBirdAPIToken: os.Getenv("EBIRD_API_KEY"),
		DB: PostgresConfig{
			Password: os.Getenv("POSTGRES_PASSWORD"),
			User:     os.Getenv("POSTGRES_USER"),
			DB:       os.Getenv("POSTGRES_DB"),
			Port:     os.Getenv("POSTGRES_PORT"),
			Host:     os.Getenv("POSTGRES_HOST"),
		},
		Redis: RedisConfig{
			Password: os.Getenv("REDIS_PASSWORD"),
			Address:  os.Getenv("REDIS_ADDRESS"),
			DB:       GetInt("REDIS_DB", 0),
			Enabled:  GetBool("REDIS_ENABLED", false),
		},
	}
	return cfg, nil
}
