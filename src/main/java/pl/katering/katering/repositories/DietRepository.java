package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Diet;

public interface DietRepository extends JpaRepository<Diet, Integer> {
    @Query("SELECT d FROM Diet d WHERE d.dietId = :id")
    Diet findByDietId(Integer id);
}
