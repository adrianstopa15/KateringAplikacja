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

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        if (userService.isUserExists(user.getLogin())) {
            return ResponseEntity.badRequest().body("Użytkownik o podanej nazwie już istnieje");
        }

        User newUser = new User();
        newUser.setLogin(user.getLogin());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        // Ustawienie domyślnej roli na USER
        newUser.setRole(Role.valueOf("USER")); // Dostosuj to do swojego modelu, np. używając enuma zamiast Stringa, jeśli to konieczne

        userService.addUser(newUser);

        Customer newCustomer = new Customer();
        newCustomer.setUser(newUser);
        customerService.addCustomer(newCustomer);

        return ResponseEntity.ok("Pomyślnie dodano użytkownika");
    }

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello user");
    }
// Sprawdzenie login
    @GetMapping("/checkUsername")
    public ResponseEntity<?> checkUsernameAvailability(@RequestParam String username) {
        boolean exists = userService.isUserExists(username);
        return ResponseEntity.ok(Map.of("isAvailable", !exists)); // Zwraca obiekt JSON
    }
// Sprawdzanie email
    @GetMapping("/checkEmail")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        boolean exists = userRepository.existsByEmail(email);
        return ResponseEntity.ok(Map.of("isAvailable", !exists)); // Zwraca obiekt JSON
    }
}
