package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.Address;
import pl.katering.katering.classes.Customer;

import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.repositories.UserRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    @Autowired
    public CustomerService(CustomerRepository customerRepository, UserRepository userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> showCustomers() {
        return customerRepository.findAll();
    }

    public ResponseEntity<?> showCustomer(String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUser_id());
        return ResponseEntity.ok(customer);
    }

    public ResponseEntity<?> edit(Map<String, Object> formData, String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = parseCustomer(formData);
        Address address = parseAddress(formData);

        Customer existingCustomer = customerRepository.findByUserId(user.get().getUser_id());
        Address existingAddress = new Address();

        existingCustomer.setFirst_name(customer.getFirst_name());
        existingCustomer.setLast_name(customer.getLast_name());
        existingCustomer.setPhone(customer.getPhone());

        existingAddress.setCity(address.getCity());
        existingAddress.setStreet(address.getStreet());
        existingAddress.setPostal_code(address.getPostal_code());
        existingAddress.setApartment_number(address.getApartment_number());
        existingAddress.setFloor(address.getFloor());
        existingAddress.setHousing_type(address.getHousing_type());
        existingAddress.setCustomer(existingCustomer);

        existingCustomer.getAddresses().add(existingAddress);

        return ResponseEntity.ok(customerRepository.save(existingCustomer));
    }

    private Customer parseCustomer(Map<String, Object> formData) {
        Customer customer = new Customer();
        customer.setFirst_name((String) formData.get("first_name"));
        customer.setLast_name((String) formData.get("last_name"));
        if (formData.get("phone") != null) {
            customer.setPhone(Integer.parseInt((String) formData.get("phone")));
        }
        return customer;
    }

    private Address parseAddress(Map<String, Object> formData) {
        Address address = new Address();
        address.setCity((String) formData.get("city"));
        address.setStreet((String) formData.get("street"));
        address.setPostal_code((String) formData.get("postal_code"));
//        if (formData.get("apartment_name") != null) {
//            address.setApartment_number(Integer.parseInt((String) formData.get("apartment_number")));
//        }
        address.setApartment_number((Integer) formData.get("apartment_number"));
//        if (formData.get("floor") != null) {
//            address.setFloor(Integer.parseInt((String) formData.get("floor")));
//        }
        address.setFloor((Integer) formData.get("floor"));
        address.setHousing_type((String) formData.get("housing_type"));
        return address;
    }
}
