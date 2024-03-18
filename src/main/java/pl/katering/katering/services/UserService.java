package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> showUser() {
        return userRepository.findAll();
    }
}
