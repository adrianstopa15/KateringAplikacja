package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Company;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    @Query("SELECT c FROM Company c WHERE c.companyId = :id")
    Company findByCompanyId(Integer id);

    @Query("SELECT c FROM Company c WHERE c.status = 'Oczekujące'")
    List<Company> findAllCompaniesToAccept();
}
