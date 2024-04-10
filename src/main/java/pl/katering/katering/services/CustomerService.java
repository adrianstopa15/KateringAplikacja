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
        Address existingAddress = null;
        List<Address> addresses = existingCustomer.getAddresses();
        if (!addresses.isEmpty()) {
            existingAddress = addresses.get(0);
        } else {
            existingAddress = new Address();
        }

        if (formData.containsKey("first_name")) {
            existingCustomer.setFirst_name(customer.getFirst_name());
        }
        if (formData.containsKey("last_name")) {
            existingCustomer.setLast_name(customer.getLast_name());
        }
        if (formData.containsKey("phone")) {
            existingCustomer.setPhone(customer.getPhone());
        }

        if (formData.containsKey("city")) {
            existingAddress.setCity(address.getCity());
        }
        if (formData.containsKey("street")) {
            existingAddress.setStreet(address.getStreet());
        }
        if (formData.containsKey("postalCode")) {
            existingAddress.setPostal_code(address.getPostal_code());
        }
        if (formData.containsKey("apartmentNumber")) {
            existingAddress.setApartment_number(address.getApartment_number());
        }
        if (formData.containsKey("floor")) {
            existingAddress.setFloor(address.getFloor());
        }
        if (formData.containsKey("housingType")) {
            existingAddress.setHousing_type(address.getHousing_type());
        }

        existingAddress.setCustomer(existingCustomer);

        if (addresses.isEmpty()) {
            existingCustomer.getAddresses().add(existingAddress);
        }

        return ResponseEntity.ok(customerRepository.save(existingCustomer));
    }

    public ResponseEntity<?> editCustomer(Customer customer, String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer existingCustomer = customerRepository.findByUserId(user.get().getUser_id());

        if (customer.getFirst_name() != null) {
            existingCustomer.setFirst_name(customer.getFirst_name());
        }
        if (customer.getLast_name() != null) {
            existingCustomer.setLast_name(customer.getLast_name());
        }
        if (customer.getPhone() != null) {
            existingCustomer.setPhone(customer.getPhone());
        }

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
        address.setPostal_code((String) formData.get("postalCode"));
//        if (formData.get("apartment_name") != null) {
//            address.setApartment_number(Integer.parseInt((String) formData.get("apartment_number")));
//        }
        address.setApartment_number((Integer) formData.get("apartmentNumber"));
//        if (formData.get("floor") != null) {
//            address.setFloor(Integer.parseInt((String) formData.get("floor")));
//        }
        address.setFloor((Integer) formData.get("floor"));
        address.setHousing_type((String) formData.get("housingType"));
        return address;
    }
}
