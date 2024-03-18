package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.katering.katering.classes.Customer;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.repositories.UserRepository;
import pl.katering.katering.services.CustomerService;
import pl.katering.katering.services.UserService;

import java.util.List;

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
        User newUser = new User();
        newUser.setLogin(user.getLogin());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setRole(user.getRole());
        userService.addUser(newUser);

        Customer newCustomer = new Customer();
        newCustomer.setUser(newUser);
        customerService.addCustomer(newCustomer);

        return ResponseEntity.ok("Pomyślnie dodano użytkownika");
    }
}
