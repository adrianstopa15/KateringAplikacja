package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Diet;
import pl.katering.katering.services.DietService;

import java.util.List;

@RestController
public class DietController {
    private final DietService dietService;

    @Autowired
    public DietController(DietService dietService) {
        this.dietService = dietService;
    }

    @GetMapping("/showDiets")
    public List<Diet> dietsList() {
        return dietService.showDiets();
    }

    @GetMapping("/showDietsToAccept")
    public List<Diet> dietsToAcceptList() {
        return dietService.showDietsToAccept();
    }

    @GetMapping("/showCompanyDiets")
    public List<Diet> companyDietsList(@RequestParam String login) {
        return dietService.showCompanyDiets(login);
    }

    @PostMapping("/addDiet")
    public ResponseEntity<?> addDiet(@RequestBody Diet diet, @RequestParam String dietTypeName, @RequestParam String login) {
        return dietService.addDiet(diet, dietTypeName, login);
    }

    @PostMapping("/acceptDiet")
    public ResponseEntity<?> acceptDiet(@RequestParam Integer id) {
        return dietService.acceptDiet(id);
    }

}
