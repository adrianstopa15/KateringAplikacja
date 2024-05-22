package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.Address;
import pl.katering.katering.classes.Company;
import pl.katering.katering.classes.TemporaryAddress;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.AddressRepository;
import pl.katering.katering.repositories.CompanyRepository;
import pl.katering.katering.repositories.TemporaryAddressRepository;

import java.util.List;
import java.util.Map;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final AddressRepository addressRepository;
    private final TemporaryAddressRepository temporaryAddressRepository;
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, AddressRepository addressRepository, TemporaryAddressRepository temporaryAddressRepository, UserService userService, AuthenticationService authenticationService) {
        this.companyRepository = companyRepository;
        this.addressRepository = addressRepository;
        this.temporaryAddressRepository = temporaryAddressRepository;
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    public List<Company> showCompanies() {
        return companyRepository.findAll();
    }

    public ResponseEntity<?> addCompany(Map<String, Object> formData) {
        Company company = parseCompany(formData);
        TemporaryAddress temporaryAddress = parseAddress(formData);

        Company newCompany = new Company();
        TemporaryAddress newAddress = new TemporaryAddress();

        if (formData.containsKey("companyName")) {
            newCompany.setCompanyName(company.getCompanyName());
        }
        if (formData.containsKey("login")) {
            newCompany.setLogin(company.getLogin());
        }
        if (formData.containsKey("description")) {
            newCompany.setDescription(company.getDescription());
        }
        if (formData.containsKey("dietType")) {
            newCompany.setDietType(company.getDietType());
        }
        if (formData.containsKey("email")) {
            newCompany.setEmail(company.getEmail());
        }
        if (formData.containsKey("phone")) {
            newCompany.setPhone(company.getPhone());
        }
        if (formData.containsKey("nip")) {
            newCompany.setNip(company.getNip());
        }

        if (formData.containsKey("city")) {
            newAddress.setCity(temporaryAddress.getCity());
        }
        if (formData.containsKey("street")) {
            newAddress.setStreet(temporaryAddress.getStreet());
        }
        if  (formData.containsKey("houseNumber")) {
            newAddress.setHouseNumber(temporaryAddress.getHouseNumber());
        }
        if (formData.containsKey("postalCode")) {
            newAddress.setPostalCode(temporaryAddress.getPostalCode());
        }
        if (formData.containsKey("apartmentNumber")) {
            newAddress.setApartmentNumber(temporaryAddress.getApartmentNumber());
        }
        if (formData.containsKey("floor")) {
            newAddress.setFloor(temporaryAddress.getFloor());
        }
        if (formData.containsKey("housingType")) {
            newAddress.setHousingType(temporaryAddress.getHousingType());
        }

        newAddress.setCompany(newCompany);
        if (userService.isLoginExists(company.getLogin()) && userService.isEmailExists(company.getEmail())) {
            return ResponseEntity.ok("Konto o podanym loginie i emailu już istnieje");
        } else if (userService.isEmailExists(company.getEmail())) {
            return ResponseEntity.ok("Konto o podanym email już istnieje");
        } else if (userService.isLoginExists(company.getLogin())) {
            return ResponseEntity.ok("Konto o podanym loginie już istnieje");
        }
        companyRepository.save(newCompany);
        temporaryAddressRepository.save(newAddress);

        return ResponseEntity.ok("Wysłano prośbę o akceptację konta firmowego");
    }

    public ResponseEntity<?> acceptCompany(Integer id) {
        Company company = companyRepository.findByCompanyId(id);
        company.setStatus("Zaakceptowane");
        companyRepository.save(company);

        TemporaryAddress address = temporaryAddressRepository.findByCompanyId(id);
        Address newAddress = new Address();
        newAddress.setCity(address.getCity());
        newAddress.setStreet(address.getStreet());
        newAddress.setHouseNumber(address.getHouseNumber());
        newAddress.setPostalCode(address.getPostalCode());
        newAddress.setApartmentNumber(address.getApartmentNumber());
        newAddress.setFloor(address.getFloor());
        newAddress.setHousingType(address.getHousingType());
        newAddress.setCompany(company);

        temporaryAddressRepository.delete(address);

        addressRepository.save(newAddress);

        String login = company.getLogin();
        String email = company.getEmail();

        User request = new User();
        request.setLogin(login);
        request.setEmail(email);

        return ResponseEntity.ok(authenticationService.registerWithRandomPassword(request));
    }
    private Company parseCompany(Map<String, Object> formData) {
        Company company = new Company();
        company.setCompanyName((String) formData.get("companyName"));
        company.setLogin((String) formData.get("login"));
        company.setDescription((String) formData.get("description"));
        company.setDietType((String) formData.get("dietType"));
        company.setEmail((String) formData.get("email"));
        company.setPhone((String) formData.get("phone"));
        company.setNip((String) formData.get("nip"));

        return company;
    }
    private TemporaryAddress parseAddress(Map<String, Object> formData) {
        TemporaryAddress temporaryAddress = new TemporaryAddress();
        temporaryAddress.setCity((String) formData.get("city"));
        temporaryAddress.setStreet((String) formData.get("street"));
        if (formData.get("houseNumber") != null) {
            temporaryAddress.setHouseNumber((String) formData.get("houseNumber"));
        }
        temporaryAddress.setPostalCode((String) formData.get("postalCode"));
        temporaryAddress.setApartmentNumber((String) formData.get("apartmentNumber"));
        temporaryAddress.setFloor((String) formData.get("floor"));
        temporaryAddress.setHousingType((String) formData.get("housingType"));

        return temporaryAddress;
    }
}
