package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.*;
import pl.katering.katering.repositories.DietRepository;
import pl.katering.katering.repositories.MacroRepository;
import pl.katering.katering.repositories.MealRepository;
import pl.katering.katering.repositories.MealTypeRepository;

import java.util.List;
import java.util.Map;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final DietRepository dietRepository;
    private final MealTypeRepository mealTypeRepository;
    private final MacroRepository macroRepository;

    @Autowired
    public MealService(MealRepository mealRepository, DietRepository dietRepository, MealTypeRepository mealTypeRepository, MacroRepository macroRepository) {
        this.mealRepository = mealRepository;
        this.dietRepository = dietRepository;
        this.mealTypeRepository = mealTypeRepository;
        this.macroRepository = macroRepository;
    }

    public List<Meal> showMeals() {
        return mealRepository.findAll();
    }

    public ResponseEntity<?> add(Map<String, Object> formData, Integer diet_id, Integer type_id) {
        Meal meal = parseMeal(formData);
        Macro macro = parseMacro(formData);

        Diet diet = dietRepository.findByDietId(diet_id);
        MealType mealType = mealTypeRepository.findByMealTypeId(type_id);

        Meal newMeal = new Meal();
        Macro newMacro = new Macro();

        if (formData.containsKey("name")) {
            newMeal.setName(meal.getName());
        }
        if (formData.containsKey("description")) {
            newMeal.setDescription(meal.getDescription());
        }
        if (formData.containsKey("price")) {
            newMeal.setPrice(meal.getPrice());
        }

        if (formData.containsKey("protein")) {
            newMacro.setProtein(macro.getProtein());
        }
        if (formData.containsKey("fat")) {
            newMacro.setFat(macro.getFat());
        }
        if (formData.containsKey("carbs")) {
            newMacro.setCarbs(macro.getCarbs());
        }
        if (formData.containsKey("calories")) {
            newMacro.setCalories(macro.getCalories());
        }

        newMeal.setDiet(diet);
        newMeal.setMealType(mealType);
        newMacro.setMeal(newMeal);

        mealRepository.save(newMeal);
        macroRepository.save(newMacro);

        return ResponseEntity.ok("Wysłano prośbę o dodanie posiłku do bazy danych");
    }

    public ResponseEntity<?> acceptMeal(Integer id) {
        Meal meal = mealRepository.findByMealId(id);
        meal.setStatus("Zaakceptowane");
        mealRepository.save(meal);

        return ResponseEntity.ok("Pomyślnie zmieniono status posiłku");
    }

    private Meal parseMeal(Map<String, Object> formData) {
        Meal meal = new Meal();
        meal.setName((String) formData.get("name"));
        meal.setDescription((String) formData.get("description"));
        meal.setPrice((Double) formData.get("price"));

        return meal;
    }

    private Macro parseMacro(Map<String, Object> formData) {
        Macro macro = new Macro();
        macro.setProtein((Double) formData.get("protein"));
        macro.setFat((Double) formData.get("fat"));
        macro.setCarbs((Double) formData.get("carbs"));
        macro.setCalories((Double) formData.get("calories"));

        return macro;
    }
}
