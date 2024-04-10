package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Address;
import pl.katering.katering.classes.Customer;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.services.CustomerService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/showCustomers")
    public List<Customer> customersList() {
        return customerService.showCustomers();
    }

    @GetMapping("/showCustomer")
    public ResponseEntity<?> showCustomer(String login) {
        return customerService.showCustomer(login);
    }

    @PostMapping("/editCustomer")
    public ResponseEntity<?> editCustomer(@RequestBody Map<String, Object> formData, @RequestParam String login) {
        return ResponseEntity.ok(customerService.edit(formData, login));
    }

}
