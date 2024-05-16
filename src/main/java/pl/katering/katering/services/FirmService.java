package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.Address;
import pl.katering.katering.classes.Firm;
import pl.katering.katering.classes.TemporaryAddress;
import pl.katering.katering.repositories.AddressRepository;
import pl.katering.katering.repositories.FirmRepository;
import pl.katering.katering.repositories.TemporaryAddressRepository;

import java.util.List;
import java.util.Map;

@Service
public class FirmService {
    private final FirmRepository firmRepository;
    private final AddressRepository addressRepository;
    private final TemporaryAddressRepository temporaryAddressRepository;

    @Autowired
    public FirmService(FirmRepository firmRepository, AddressRepository addressRepository, TemporaryAddressRepository temporaryAddressRepository) {
        this.firmRepository = firmRepository;
        this.addressRepository = addressRepository;
        this.temporaryAddressRepository = temporaryAddressRepository;
    }

    public List<Firm> showFirms() {
        return firmRepository.findAll();
    }

    public ResponseEntity<?> addFirm(Map<String, Object> formData) {
        Firm firm = parseFirm(formData);
        TemporaryAddress temporaryAddress = parseAddress(formData);

        Firm newFirm = new Firm();
        TemporaryAddress newAddress = new TemporaryAddress();

        if (formData.containsKey("companyName")) {
            newFirm.setCompanyName(firm.getCompanyName());
        }
        if (formData.containsKey("description")) {
            newFirm.setDescription(firm.getDescription());
        }
        if (formData.containsKey("dietType")) {
            newFirm.setDietType(firm.getDietType());
        }
        if (formData.containsKey("email")) {
            newFirm.setEmail(firm.getEmail());
        }
        if (formData.containsKey("phone")) {
            newFirm.setPhone(firm.getPhone());
        }
        if (formData.containsKey("nip")) {
            newFirm.setNip(firm.getNip());
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

        newAddress.setFirm(newFirm);

        firmRepository.save(newFirm);
        temporaryAddressRepository.save(newAddress);

        return ResponseEntity.ok("Wysłano prośbę o akceptację konta firmowego");
    }

    public ResponseEntity<?> acceptFirm(Integer id) {
        Firm firm = firmRepository.findByFirmId(id);
        firm.setStatus("Zaakceptowane");
        firmRepository.save(firm);

        TemporaryAddress address = temporaryAddressRepository.findByFirmId(id);
        Address newAddress = new Address();
        newAddress.setCity(address.getCity());
        newAddress.setStreet(address.getStreet());
        newAddress.setHouseNumber(address.getHouseNumber());
        newAddress.setPostalCode(address.getPostalCode());
        newAddress.setApartmentNumber(address.getApartmentNumber());
        newAddress.setFloor(address.getFloor());
        newAddress.setHousingType(address.getHousingType());
        newAddress.setFirm(firm);

        temporaryAddressRepository.delete(address);

        addressRepository.save(newAddress);

        return ResponseEntity.ok("Pomyślnie zaakceptowano firmę oraz dodano adres");
    }
    private Firm parseFirm(Map<String, Object> formData) {
        Firm firm = new Firm();
        firm.setCompanyName((String) formData.get("companyName"));
        firm.setDescription((String) formData.get("description"));
        firm.setDietType((String) formData.get("dietType"));
        firm.setEmail((String) formData.get("email"));
        firm.setPhone((String) formData.get("phone"));
        firm.setNip((String) formData.get("nip"));

        return firm;
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
