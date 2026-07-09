package org.birdup.api.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId;
    private String regionCode;
    private LocalDateTime createdAt;

    public Follow() {}

    public Follow(Integer userId, String regionCode) {
        this.userId = userId;
        this.regionCode = regionCode;
        this.createdAt = LocalDateTime.now();
    }
}
