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
        Customer customer = customerRepository.findByUserId(user.get().getUserId());
        return ResponseEntity.ok(customer);
    }

    public ResponseEntity<?> edit(Map<String, Object> formData, String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = parseCustomer(formData);
        Address address = parseAddress(formData);

        Customer existingCustomer = customerRepository.findByUserId(user.get().getUserId());
        Address existingAddress = null;
        List<Address> addresses = existingCustomer.getAddresses();
        if (!addresses.isEmpty()) {
            existingAddress = addresses.get(0);
        } else {
            existingAddress = new Address();
        }

        if (formData.containsKey("firstName")) {
            existingCustomer.setFirstName(customer.getFirstName());
        }
        if (formData.containsKey("lastName")) {
            existingCustomer.setLastName(customer.getLastName());
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
        if  (formData.containsKey("houseNumber")) {
            existingAddress.setHouseNumber(address.getHouseNumber());
        }
        if (formData.containsKey("postalCode")) {
            existingAddress.setPostalCode(address.getPostalCode());
        }
        if (formData.containsKey("apartmentNumber")) {
            existingAddress.setApartmentNumber(address.getApartmentNumber());
        }
        if (formData.containsKey("floor")) {
            existingAddress.setFloor(address.getFloor());
        }
        if (formData.containsKey("housingType")) {
            existingAddress.setHousingType(address.getHousingType());
        }


        existingAddress.setCustomer(existingCustomer);

        if (addresses.isEmpty()) {
            existingAddress.setDefault(true);
            existingCustomer.getAddresses().add(existingAddress);
        }

        return ResponseEntity.ok(customerRepository.save(existingCustomer));
    }

    public ResponseEntity<?> editCustomer(Customer customer, Integer id) {
//        Optional<User> user = userRepository.findByLogin(login);
//        Customer existingCustomer = customerRepository.findByUserId(user.get().getUserId());
        Customer existingCustomer = customerRepository.findByCustomerId(id);

        if (customer.getFirstName() != null) {
            existingCustomer.setFirstName(customer.getFirstName());
        }
        if (customer.getLastName() != null) {
            existingCustomer.setLastName(customer.getLastName());
        }
        if (customer.getPhone() != null) {
            existingCustomer.setPhone(customer.getPhone());
        }

        return ResponseEntity.ok(customerRepository.save(existingCustomer));
    }

    public ResponseEntity<?> deleteCustomer(Integer id) {
        Customer customer = customerRepository.findByCustomerId(id);

        customerRepository.delete(customer);

        return ResponseEntity.ok("Pomyślnie usunięto customera");
    }

    private Customer parseCustomer(Map<String, Object> formData) {
        Customer customer = new Customer();
        customer.setFirstName((String) formData.get("firstName"));
        customer.setLastName((String) formData.get("lastName"));
        if (formData.get("phone") != null) {
            customer.setPhone(Integer.parseInt((String) formData.get("phone")));
        }
        return customer;
    }

    private Address parseAddress(Map<String, Object> formData) {
        Address address = new Address();
        address.setCity((String) formData.get("city"));
        address.setStreet((String) formData.get("street"));
        if (formData.get("houseNumber") != null) {
            address.setHouseNumber((String) formData.get("houseNumber"));
        }
        address.setPostalCode((String) formData.get("postalCode"));
//        if (formData.get("apartment_name") != null) {
//            address.setApartment_number(Integer.parseInt((String) formData.get("apartment_number")));
//        }
        address.setApartmentNumber((String) formData.get("apartmentNumber"));
//        if (formData.get("floor") != null) {
//            address.setFloor(Integer.parseInt((String) formData.get("floor")));
//        }
        address.setFloor((String) formData.get("floor"));
        address.setHousingType((String) formData.get("housingType"));
        return address;
    }
}
