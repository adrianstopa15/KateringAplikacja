package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByLogin(String login);

    @Query("SELECT u FROM User u WHERE u.login = :login")
    User findUsingLogin(String login);

    @Query("SELECT u FROM User u WHERE u.userId = :id")
    User findByUserId(Integer id);

    boolean existsByLogin(String login);

    boolean existsByEmail(String email);
}
