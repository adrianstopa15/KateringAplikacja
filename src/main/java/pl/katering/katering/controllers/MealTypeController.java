package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.MealType;
import pl.katering.katering.services.MealTypeService;

import java.util.List;

@RestController
public class MealTypeController {
    private final MealTypeService mealTypeService;

    @Autowired
    public MealTypeController(MealTypeService mealTypeService) {
        this.mealTypeService = mealTypeService;
    }

    @GetMapping("/showMealTypes")
    public List<MealType> mealTypesList() {
        return mealTypeService.showMealTypes();
    }

    @PostMapping("/addMealType")
    public ResponseEntity<?> addMealType(@RequestBody MealType mealType) {
        return mealTypeService.addMealType(mealType);
    }

    @PostMapping("/editMealType")
    public ResponseEntity<?> editMealType(@RequestBody MealType mealType, @RequestParam Integer id) {
        return mealTypeService.editMealType(mealType, id);
    }

    @PostMapping("/deleteMealType")
    public ResponseEntity<?> deleteMealType(@RequestParam Integer id) {
        return mealTypeService.deleteMealType(id);
    }
}
