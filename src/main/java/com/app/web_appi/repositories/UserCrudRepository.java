package com.app.web_appi.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.app.web_appi.entities.User;

public interface UserCrudRepository extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email);
}
