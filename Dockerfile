FROM golang:1.25-alpine
LABEL authors="layne"

WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY --exclude=./web go.mod go.sum ./ 
RUN go mod download

CMD ["air", "c", ".air.toml"]

