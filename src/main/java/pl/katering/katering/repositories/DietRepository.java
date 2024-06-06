package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Diet;

import java.util.List;

public interface DietRepository extends JpaRepository<Diet, Integer> {
    @Query("SELECT d FROM Diet d WHERE d.dietId = :id")
    Diet findByDietId(Integer id);

    @Query("SELECT d FROM Diet d WHERE d.company.companyId = :id")
    List<Diet> findByCompanyId(Integer id);

    @Query("SELECT d FROM Diet d WHERE d.status = 'Oczekujące'")
    List<Diet> findDietsToAccept();
}
