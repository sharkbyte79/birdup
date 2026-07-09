package org.birdup.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firebaseId;
    private String email;
    private LocalDateTime createdAt;

    public User() {}

    public User(String firebaseId, String email) {
        this.firebaseId = firebaseId;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
}