package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.katering.katering.classes.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByLogin(String login);

    boolean existsByLogin(String login);

}
