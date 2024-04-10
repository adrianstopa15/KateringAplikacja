package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.Address;
import pl.katering.katering.classes.Customer;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.AddressRepository;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository, UserRepository userRepository, CustomerRepository customerRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    public List<Address> showAddresses() {
        return addressRepository.findAll();
    }

    public ResponseEntity<?> showCustomerAddresses(String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUser_id());
        List<Address> list = addressRepository.findByCustomerId(customer.getCustomer_id());

        return ResponseEntity.ok(list);
    }
}
