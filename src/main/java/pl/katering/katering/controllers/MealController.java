package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Meal;
import pl.katering.katering.services.MealService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MealController {
    private final MealService mealService;

    @Autowired
    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/showMeals")
    public List<Meal> mealsList() {
        return mealService.showMeals();
    }

    @PostMapping("/addMeal")
    public ResponseEntity<?> addMeal(@RequestBody Map<String, Object> formData, @RequestParam Integer diet_id, @RequestParam Integer type_id) {
        return mealService.add(formData, diet_id, type_id);
    }

    @PostMapping("/acceptMeal")
    public ResponseEntity<?> acceptMeal(@RequestParam Integer id) {
        return mealService.acceptMeal(id);
    }
}
