package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.Customer;
import pl.katering.katering.classes.Preference;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.repositories.PreferenceRepository;
import pl.katering.katering.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PreferenceService {
    private final PreferenceRepository preferenceRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public PreferenceService(PreferenceRepository preferenceRepository, UserRepository userRepository, CustomerRepository customerRepository) {
        this.preferenceRepository = preferenceRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    public List<Preference> showPreferences() {
        return preferenceRepository.findAll();
    }
    public ResponseEntity<?> showCustomerPreferences(String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUser_id());
        List<Preference> list = preferenceRepository.findByCustomerId(customer.getCustomer_id());

        return ResponseEntity.ok(list);
    }
    public ResponseEntity<?> addPreference(Preference preference, String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUser_id());
        Preference existingPreference = new Preference();
        existingPreference.setWeight(preference.getWeight());
        existingPreference.setHeight(preference.getHeight());
        existingPreference.setAge(preference.getAge());
        existingPreference.setGender(preference.getGender());
        existingPreference.setBmi(preference.getBmi());
        existingPreference.setSelected_goal(preference.getSelected_goal());
        existingPreference.setActivity_level(preference.getActivity_level());
        existingPreference.setCustomer(customer);

        return ResponseEntity.ok(preferenceRepository.save(existingPreference));
    }
    public ResponseEntity<?> editPreference(Preference preference, Integer id) {
        Preference customerPreference = preferenceRepository.findByPreferenceId(id);
        if (preference.getWeight() != null) {
            customerPreference.setWeight(preference.getWeight());
        }
        if (preference.getHeight() != null) {
            customerPreference.setHeight(preference.getHeight());
        }
        if (preference.getAge() != null) {
            customerPreference.setAge(preference.getAge());
        }
        if (preference.getGender() != null) {
            customerPreference.setGender(preference.getGender());
        }
        if (preference.getBmi() != null) {
            customerPreference.setBmi(preference.getBmi());
        }
        if (preference.getSelected_goal() != null) {
            customerPreference.setSelected_goal(preference.getSelected_goal());
        }
        if (preference.getActivity_level() != null) {
            customerPreference.setActivity_level(preference.getActivity_level());
        }

        return ResponseEntity.ok(preferenceRepository.save(customerPreference));
    }
    public ResponseEntity<?> deletePreference(Integer id) {
        Preference customerPreference = preferenceRepository.findByPreferenceId(id);

        preferenceRepository.delete(customerPreference);

        return ResponseEntity.ok("Pomyślnie usunięto preferencję");
    }
}
