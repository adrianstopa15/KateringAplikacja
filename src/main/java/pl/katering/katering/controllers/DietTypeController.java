package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.DietType;
import pl.katering.katering.services.DietTypeService;

import java.util.List;

@RestController
public class DietTypeController {
    private final DietTypeService dietTypeService;

    @Autowired
    public DietTypeController(DietTypeService dietTypeService) {
        this.dietTypeService = dietTypeService;
    }

    @GetMapping("/showDietTypes")
    public List<DietType> dietTypeList() {
        return dietTypeService.showDietTypes();
    }

    @PostMapping("/addDietType")
    public ResponseEntity<?> addDietType(@RequestBody DietType dietType) {
        return dietTypeService.addDietType(dietType);
    }

    @PostMapping("/editDietType")
    public ResponseEntity<?> editDietType(@RequestBody DietType dietType, @RequestParam Integer id) {
        return dietTypeService.editDietType(dietType, id);
    }

    @PostMapping("/deleteDietType")
    public ResponseEntity<?> deleteDietType(Integer id) {
        return dietTypeService.deleteDietType(id);
    }
}
