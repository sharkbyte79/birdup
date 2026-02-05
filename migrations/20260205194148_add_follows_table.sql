-- +goose Up
-- +goose StatementBegin
CREATE TABLE follows (
    firebase_id VARCHAR(255) NOT NULL,
    species_code VARCHAR(255) NOT NULL,
    CONSTRAINT fk_firebaseid FOREIGN KEY (firebase_id) REFERENCES users(firebaseid),
    PRIMARY KEY (firebase_id, species_code)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE follows;
-- +goose StatementEnd
