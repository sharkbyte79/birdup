package org.birdup.api.repository;

import org.birdup.api.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUserId(String userId);
}
