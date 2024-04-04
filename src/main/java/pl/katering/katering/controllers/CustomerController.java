package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Customer;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.services.CustomerService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CustomerController {
    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerController(CustomerService customerService, CustomerRepository customerRepository) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/showCustomers")
    public List<Customer> customerList() {
        return customerService.showCustomer();
    }

    @PatchMapping("/editCustomer")
    public ResponseEntity<?> editCustomer(@RequestBody Customer customer, @RequestParam String login) {
        return ResponseEntity.ok(customerService.edit(customer, login));
    }

}
