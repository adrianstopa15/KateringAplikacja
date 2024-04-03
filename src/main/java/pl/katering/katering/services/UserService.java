package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isUserExists(String login) {
        return userRepository.existsByLogin(login);
    }

    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

//    public User addUser(User user) {
//        return userRepository.save(user);
//    }

    public List<User> showUser() {
        return userRepository.findAll();
    }

    public String getUserByLogin(String login) {
        Optional<User> abc = userRepository.findByLogin(login);
        return abc.get().getEmail();
    }
}
