package org.birdup.api.model.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@IdClass(FollowId.class)
public class Follow {

    /*@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;*/

    @Id
    private String userId;

    @Id
    private String regionCode;
    private LocalDateTime createdAt;

    public Follow() {}

    public Follow(String userId, String regionCode) {
        this.userId = userId;
        this.regionCode = regionCode;
        this.createdAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getRegionCode() {
        return regionCode;
    }

    public String getUserId() {
        return userId;
    }
}