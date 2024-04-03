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
    private final UserRepository userRepository;
    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository, CustomerService customerService, CustomerRepository customerRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/showUsers")
    public List<User> userList() {
        return userService.showUser();
    }

    // raczej do usunięcia, bo jest już register w AuthenticationController
//
//    @PostMapping("/add")
//    public ResponseEntity<String> addUser(@RequestBody User user) {
//        if (userService.isUserExists(user.getLogin())) {
//            return ResponseEntity.badRequest().body("Użytkownik o podanej nazwie już istnieje");
//        }
//
//        User newUser = new User();
//        newUser.setLogin(user.getLogin());
//        newUser.setPassword(user.getPassword());
//        newUser.setEmail(user.getEmail());
//        newUser.setRole(Role.valueOf("USER"));
//
//        userService.addUser(newUser);
//
//        Customer newCustomer = new Customer();
//        newCustomer.setUser(newUser);
//        customerService.addCustomer(newCustomer);
//
//        return ResponseEntity.ok("Pomyślnie dodano użytkownika");
//    }

    @GetMapping("/hello")
    public ResponseEntity<?> sayHello(@RequestParam String login) {
        return ResponseEntity.ok("Twoj email to: " + userService.getUserByLogin(login));
    }

    @GetMapping("/checkUsername")
    public ResponseEntity<?> checkUsernameAvailability(@RequestParam String username) {
        boolean exists = userService.isUserExists(username);
        return ResponseEntity.ok(Map.of("isAvailable", !exists));
    }

    @GetMapping("/checkEmail")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        boolean exists = userService.isEmailExists(email);
        return ResponseEntity.ok(Map.of("isAvailable", !exists));
    }
}
