package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Address;
import pl.katering.katering.services.AddressService;

import java.util.List;

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

    @GetMapping("/showCustomAddresses")
    public List<Address> customerAddressList() {
        return addressService.showCustomAddresses();
    }

    @GetMapping("/showCompanyAddresses")
    public List<Address> companyAddressList() {
        return addressService.showCompanyAddresses();
    }

    @PostMapping("/addAddress")
    public ResponseEntity<?> addAddress(@RequestBody Address address, @RequestParam String login) {
        return addressService.addAddress(address, login);
    }
    @PostMapping("/addAddressCompany")
    public ResponseEntity<?> addAddressCompany(@RequestBody Address address, @RequestParam String login) {
        return addressService.addAddress(address, login);
    }

    @PostMapping("/editAddress")
    public ResponseEntity<?> editAddress(@RequestBody Address address, @RequestParam Integer id) {
        return addressService.editAddress(address, id);
    }

    @PostMapping("/deleteAddress")
    public ResponseEntity<?> deleteAddress(@RequestParam Integer id) {
        return addressService.deleteAddress(id);
    }

    @PostMapping("/setDefaultAddress")
    public ResponseEntity<?> setDefaultAddress(@RequestParam String login, @RequestParam Integer id) {
        return addressService.changeDefaultAddress(login, id);
    }
}
