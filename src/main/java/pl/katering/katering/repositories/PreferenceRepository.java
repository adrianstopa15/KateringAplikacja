package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Preference;

import java.util.List;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {
    @Query("SELECT p FROM Preference p WHERE p.customer.customer_id = :id")
    List<Preference> findByCustomerId(Integer id);
    @Query("SELECT p FROM Preference p WHERE p.preference_id = :id")
    Preference findByPreferenceId(Integer id);
}
