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

    public ResponseEntity<?> addAddress(Address address, String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUser_id());
        Address existingAddress = new Address();
        existingAddress.setCity(address.getCity());
        existingAddress.setStreet(address.getStreet());
        existingAddress.setHouse_number(address.getHouse_number());
        existingAddress.setPostal_code(address.getPostal_code());
        if (address.getApartment_number() != null) {
            existingAddress.setApartment_number(address.getApartment_number());
        }
        if (address.getFloor() != null) {
            existingAddress.setFloor(address.getFloor());
        }
        existingAddress.setHousing_type(address.getHousing_type());

        existingAddress.setCustomer(customer);

        return ResponseEntity.ok(addressRepository.save(existingAddress));
    }

    public ResponseEntity<?> editAddress(Address address, Integer id) {
        Address customerAddress = addressRepository.findByAddressId(id);
        if (address.getCity() != null) {
            customerAddress.setCity(address.getCity());
        }
        if (address.getStreet() != null) {
            customerAddress.setStreet(address.getStreet());
        }
        if (address.getHouse_number() != null) {
            customerAddress.setHouse_number(address.getHouse_number());
        }
        if (address.getPostal_code() != null) {
            customerAddress.setPostal_code(address.getPostal_code());
        }
        if (address.getApartment_number() != null) {
            customerAddress.setApartment_number(address.getApartment_number());
        }
        if (address.getFloor() != null) {
            customerAddress.setFloor(address.getFloor());
        }
        if (address.getHousing_type() != null) {
            customerAddress.setHousing_type(address.getHousing_type());
        }

        return ResponseEntity.ok(addressRepository.save(customerAddress));
    }

    public ResponseEntity<?> deleteAddress(Integer id) {
        Address customerAddress = addressRepository.findByAddressId(id);

        addressRepository.delete(customerAddress);

        return ResponseEntity.ok("Pomyślnie usunięto adres");
    }
}
