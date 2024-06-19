package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Meal;
import pl.katering.katering.services.MealService;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/showCompanyMeals")
    public List<Meal> companyMealsList(@RequestParam String login) {
        return mealService.showCompanyMeals(login);
    }

    @PostMapping("/addMeal")
    public ResponseEntity<?> addMeal(@RequestBody Map<String, Object> formData, @RequestParam Integer dietId, @RequestParam Integer typeId) {
        return mealService.add(formData, dietId, typeId);
    }

    @PostMapping("/acceptMeal")
    public ResponseEntity<?> acceptMeal(@RequestParam Integer id) {
        return mealService.acceptMeal(id);
    }
}
