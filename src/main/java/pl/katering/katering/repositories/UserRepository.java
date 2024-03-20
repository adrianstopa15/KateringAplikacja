package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.katering.katering.classes.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByLogin(String login);

    boolean existsByEmail(String email);
}
