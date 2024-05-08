package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.MealType;

public interface MealTypeRepository extends JpaRepository<MealType, Integer> {
    @Query("SELECT m FROM MealType m WHERE m.type_id = :id")
    MealType findByMealTypeId(Integer id);
}
