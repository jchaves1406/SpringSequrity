package login.com.login.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import login.com.login.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

}
