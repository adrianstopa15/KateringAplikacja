package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Diet;
import pl.katering.katering.services.DietService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/addDiet")
    public ResponseEntity<?> addDiet(@RequestBody Diet diet) {
        return dietService.addDiet(diet);
    }

}
