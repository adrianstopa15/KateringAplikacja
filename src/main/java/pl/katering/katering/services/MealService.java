package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.*;
import pl.katering.katering.repositories.*;

import java.util.List;
import java.util.Map;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final DietRepository dietRepository;
    private final MealTypeRepository mealTypeRepository;
    private final MacroRepository macroRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public MealService(MealRepository mealRepository, DietRepository dietRepository, MealTypeRepository mealTypeRepository, MacroRepository macroRepository, CompanyRepository companyRepository) {
        this.mealRepository = mealRepository;
        this.dietRepository = dietRepository;
        this.mealTypeRepository = mealTypeRepository;
        this.macroRepository = macroRepository;
        this.companyRepository = companyRepository;
    }

    public List<Meal> showMeals() {
        return mealRepository.findAll();
    }

    public List<Meal> showCompanyMeals(String login) {
        Company company = companyRepository.findByLogin(login);
        return mealRepository.findCompanyMeals(company.getCompanyId());
    }

    public ResponseEntity<?> add(Map<String, Object> formData, Integer dietId, Integer typeId) {
        Meal meal = parseMeal(formData);
        Macro macro = parseMacro(formData);

        Diet diet = dietRepository.findByDietId(dietId);
        MealType mealType = mealTypeRepository.findByMealTypeId(typeId);

        Meal newMeal = new Meal();
        Macro newMacro = new Macro();

        if (formData.containsKey("name")) {
            newMeal.setName(meal.getName());
        }
        if (formData.containsKey("description")) {
            newMeal.setDescription(meal.getDescription());
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

        return ResponseEntity.ok("Pomyślnie dodano posiłek");
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

        return meal;
    }

    private Macro parseMacro(Map<String, Object> formData) {
        Macro macro = new Macro();
        macro.setProtein(Double.parseDouble(String.valueOf(formData.get("protein"))));
        macro.setFat(Double.parseDouble(String.valueOf(formData.get("fat"))));
        macro.setCarbs(Double.parseDouble(String.valueOf(formData.get("carbs"))));
        macro.setCalories(Double.parseDouble(String.valueOf(formData.get("calories"))));

        return macro;
    }
}
