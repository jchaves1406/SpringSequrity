package com.app.web_appi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.web_appi.entities.User;

@Repository
public class UserRepository {

	@Autowired
	private UserCrudRepository userCrudRepository;

	public Optional<User> findByEmail(String email) {
		return userCrudRepository.findByEmail(email);
	}

	public User save(User user) {
		return userCrudRepository.save(user);
	}

	public List<User> getAll() {
		return (List<User>) userCrudRepository.findAll();
	}

}
