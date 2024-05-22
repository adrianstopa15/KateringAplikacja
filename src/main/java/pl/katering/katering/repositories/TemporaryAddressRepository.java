package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.TemporaryAddress;

public interface TemporaryAddressRepository extends JpaRepository<TemporaryAddress, Integer> {
    @Query("SELECT a FROM TemporaryAddress a WHERE a.company.companyId = :id")
    TemporaryAddress findByCompanyId(Integer id);
}
