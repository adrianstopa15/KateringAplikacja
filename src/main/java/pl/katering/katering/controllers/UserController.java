package pl.katering.katering.controllers;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import pl.katering.katering.classes.Customer;
import pl.katering.katering.classes.Role;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.repositories.UserRepository;
import pl.katering.katering.services.CustomerService;
import pl.katering.katering.services.UserService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/showUsers")
    public List<User> usersList() {
        return userService.showUsers();
    }

    @GetMapping("/hello")
    public ResponseEntity<?> sayHello(@RequestParam String login) {
        return ResponseEntity.ok("Twoj email to: " + userService.getUserByLogin(login));
    }

    @GetMapping("/checkUsername")
    public ResponseEntity<?> checkUsernameAvailability(@RequestParam String username) {
        boolean exists = userService.isLoginExists(username);
        return ResponseEntity.ok(Map.of("isAvailable", !exists));
    }

    @GetMapping("/checkEmail")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        boolean exists = userService.isEmailExists(email);
        return ResponseEntity.ok(Map.of("isAvailable", !exists));
    }
    @PostMapping("/updateFirstLogin")
    public ResponseEntity<?> updateFirstLoginStatus(@RequestParam String login) {
        userService.updateUserFirstLoginStatus(login, false);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/isFirstLogin")
    public ResponseEntity<?> isFirstLogin(@RequestParam String login) {
        try {
            User user = userService.getUserByLogin(login);
            return ResponseEntity.ok(Map.of("isFirstLogin", user.getFirstLogin()));
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
