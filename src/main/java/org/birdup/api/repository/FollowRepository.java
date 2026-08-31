package org.birdup.api.repository;

import org.birdup.api.model.entity.Follow;
import org.springframework.cache.annotation.CachePut;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

//    @Cacheable(value = "follows", key = "#userId")
    List<Follow> findFollowsByUserIdOrderByRegionCodeAsc(String userId);

    void deleteFollowByUserIdAndRegionCode(String userId, String regionCode);

    @Override
    @CachePut(value = "follows", key = "#entity.userId")
    <S extends Follow> S save(S entity);
}
