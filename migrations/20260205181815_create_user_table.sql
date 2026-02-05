-- +goose Up
-- +goose StatementBegin
CREATE TABLE users (
    firebaseid VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    createdat TIMESTAMPTZ NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
-- +goose StatementEnd
