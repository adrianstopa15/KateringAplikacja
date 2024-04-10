package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.katering.katering.classes.Address;
import pl.katering.katering.services.AddressService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AddressController {
    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/showAddresses")
    public List<Address> addressesList() {
        return addressService.showAddresses();
    }

    @GetMapping("/showCustomerAddresses")
    public ResponseEntity<?> customerAddressesList(@RequestParam String login) {
        return addressService.showCustomerAddresses(login);
    }
}
