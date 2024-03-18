package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Customer;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.services.CustomerService;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<String> editCustomer(@RequestBody Customer customer) {
        Integer customerId = customer.getCustomer_id();

        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        if (customerOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Nie znaleziono klienta");
        }

        Customer newCustomer = customerOptional.get();
        newCustomer.setFirst_name(customer.getFirst_name());
        newCustomer.setLast_name(customer.getLast_name());
        newCustomer.setAddress(customer.getAddress());
        newCustomer.setPhone(customer.getPhone());

        customerService.addCustomer(newCustomer);

        return ResponseEntity.ok("Pomyślnie edytowano dane");
    }

}
