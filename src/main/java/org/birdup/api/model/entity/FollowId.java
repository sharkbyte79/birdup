package org.birdup.api.model.entity;

import java.io.Serializable;

/// Defines a composite primary key for the Follows table
/// consisting of the userId identifying the relevant User
/// account and eBird region code identifying the sighting zone.
public class FollowId implements Serializable {

    private String userId;

    private String regionCode;

    public FollowId() {}

    public FollowId(String userId, String regionCode) {
        this.userId = userId;
        this.regionCode = regionCode;
    }
}
