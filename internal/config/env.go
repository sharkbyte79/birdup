package config

import (
	"os"
	"strconv"
)

func GetString(key, fallback string) string {
	e, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}
	return e
}

func GetInt(key string, fallback int) int {
	e, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	i, err := strconv.Atoi(e)
	if err != nil {
		return fallback
	}
	return i
}

func GetBool(key string, fallback bool) bool {
	e, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}

	b, err := strconv.ParseBool(e)
	if err != nil {
		return fallback
	}
	return b
}
