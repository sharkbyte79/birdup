package org.birdup.api.service;

import org.birdup.api.repository.FollowRepository;

public class FollowService {

  private final FollowRepository followRepository;

  public FollowService(FollowRepository followRepository) {
    this.followRepository = followRepository;
  }
}
