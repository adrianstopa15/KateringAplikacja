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
        Customer customer = customerRepository.findByUserId(user.get().getUserId());
        List<Address> list = addressRepository.findByCustomerId(customer.getCustomerId());

        return ResponseEntity.ok(list);
    }

    public List<Address> showCompanyAddresses() {
        return addressRepository.findCompanyAddresses();
    }

    public List<Address> showCustomAddresses() {
        return addressRepository.findCustomerAddresses();
    }

    public ResponseEntity<?> addAddress(Address address, String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUserId());
        Address existingAddress = new Address();
        existingAddress.setCity(address.getCity());
        existingAddress.setStreet(address.getStreet());
        existingAddress.setHouseNumber(address.getHouseNumber());
        existingAddress.setPostalCode(address.getPostalCode());
        if (address.getApartmentNumber() != null) {
            existingAddress.setApartmentNumber(address.getApartmentNumber());
        }
        if (address.getFloor() != null) {
            existingAddress.setFloor(address.getFloor());
        }
        existingAddress.setHousingType(address.getHousingType());

        if (customer.getAddresses().isEmpty()) {
            existingAddress.setDefault(true);
        }

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
        if (address.getHouseNumber() != null) {
            customerAddress.setHouseNumber(address.getHouseNumber());
        }
        if (address.getPostalCode() != null) {
            customerAddress.setPostalCode(address.getPostalCode());
        }
        if (address.getApartmentNumber() != null) {
            customerAddress.setApartmentNumber(address.getApartmentNumber());
        }
        if (address.getFloor() != null) {
            customerAddress.setFloor(address.getFloor());
        }
        if (address.getHousingType() != null) {
            customerAddress.setHousingType(address.getHousingType());
        }

        return ResponseEntity.ok(addressRepository.save(customerAddress));
    }

    public ResponseEntity<?> deleteAddress(Integer id) {
        Address customerAddress = addressRepository.findByAddressId(id);

        addressRepository.delete(customerAddress);

        return ResponseEntity.ok("Pomyślnie usunięto adres");
    }

    public ResponseEntity<?> changeDefaultAddress(String login, Integer id) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUserId());
        List<Address> addresses = customer.getAddresses();

        for (Address addr : addresses) {
            addr.setDefault(false);
            addressRepository.save(addr);
        }

        Address address = addressRepository.findByAddressId(id);
        address.setDefault(true);

        addressRepository.save(address);

        return ResponseEntity.ok("Pomyślnie zmieniono domyślny adres");
    }
}
