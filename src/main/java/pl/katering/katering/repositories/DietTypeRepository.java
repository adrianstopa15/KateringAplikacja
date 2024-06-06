package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.DietType;

public interface DietTypeRepository extends JpaRepository<DietType, Integer> {
    @Query("SELECT d FROM DietType d WHERE d.dietTypeId = :id")
    DietType findByDietTypeId(Integer id);

    @Query("SELECT d FROM DietType d WHERE d.name = :name")
    DietType findByName(String name);
}
