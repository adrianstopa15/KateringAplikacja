package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Preference;
import pl.katering.katering.services.PreferenceService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PreferenceController {
    private final PreferenceService preferenceService;

    @Autowired
    public PreferenceController(PreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }

    @GetMapping("/showPreferences")
    public List<Preference> preferencesList() {
        return preferenceService.showPreferences();
    }

    @GetMapping("/showCustomerPreferences")
    public ResponseEntity<?> customerPreferencesList(@RequestParam String login) {
        return preferenceService.showCustomerPreferences(login);
    }

    @PostMapping("/addPreference")
    public ResponseEntity<?> addPreference(@RequestBody Preference preference, @RequestParam String login) {
        return preferenceService.addPreference(preference, login);
    }

    @PostMapping("/editPreference")
    public ResponseEntity<?> editPreference(@RequestBody Preference preference, @RequestParam Integer id) {
        return preferenceService.editPreference(preference, id);
    }

    @PostMapping("/deletePreference")
    public ResponseEntity<?> deletePreference(@RequestParam Integer id) {
        return preferenceService.deletePreference(id);
    }
}
