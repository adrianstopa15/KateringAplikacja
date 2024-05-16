package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Firm;

public interface FirmRepository extends JpaRepository<Firm, Integer> {
    @Query("SELECT f FROM Firm f WHERE f.firmId = :id")
    Firm findByFirmId(Integer id);
}
