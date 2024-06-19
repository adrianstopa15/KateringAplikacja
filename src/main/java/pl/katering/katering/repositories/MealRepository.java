package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Meal;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Integer> {
    @Query("SELECT m FROM Meal m WHERE m.mealId = :id")
    Meal findByMealId(Integer id);

    @Query("SELECT m FROM Meal m WHERE m.diet.company.companyId = :id")
    List<Meal> findCompanyMeals(Integer id);
}
