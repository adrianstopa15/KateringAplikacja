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

    public boolean isLoginExists(String login) {
        return userRepository.existsByLogin(login);
    }

    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

//    public User addUser(User user) {
//        return userRepository.save(user);
//    }

    public List<User> showUsers() {
        return userRepository.findAll();
    }

    public User getUserByLogin(String login) {
        return userRepository.findByLogin(login)
                .orElseThrow(() -> new IllegalStateException("Użytkownik nie znaleziony"));
    }

    public Integer getUserId(String login) {
        return userRepository.findByLogin(login)
                .map(User::getUserId)
                .orElseThrow(() -> new IllegalStateException("Użytkownik nie znaleziony"));
    }
    public void updateUserFirstLoginStatus(String login, Boolean isFirstLogin) {
        Optional<User> userOptional = userRepository.findByLogin(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirstLogin(isFirstLogin);
            userRepository.save(user);
        } else {
            throw new IllegalStateException("Użytkownik nie znaleziony");
        }
    }
}

