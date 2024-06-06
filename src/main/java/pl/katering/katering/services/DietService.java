package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.Company;
import pl.katering.katering.classes.Diet;
import pl.katering.katering.classes.DietType;
import pl.katering.katering.repositories.CompanyRepository;
import pl.katering.katering.repositories.DietRepository;
import pl.katering.katering.repositories.DietTypeRepository;

import java.util.List;

@Service
public class DietService {
    private final DietRepository dietRepository;
    private final CompanyRepository companyRepository;
    private final DietTypeRepository dietTypeRepository;

    @Autowired
    public DietService(DietRepository dietRepository, CompanyRepository companyRepository, DietTypeRepository dietTypeRepository) {
        this.dietRepository = dietRepository;
        this.companyRepository = companyRepository;
        this.dietTypeRepository = dietTypeRepository;
    }

    public List<Diet> showDiets() {
        return dietRepository.findAll();
    }

    public List<Diet> showDietsToAccept() {
        return dietRepository.findDietsToAccept();
    }

    public List<Diet> showCompanyDiets(String login) {
        Company company = companyRepository.findByLogin(login);
        return dietRepository.findByCompanyId(company.getCompanyId());
    }

    public ResponseEntity<?> addDiet(Diet diet, String dietTypeName, String login) {
        DietType dietType = dietTypeRepository.findByName(dietTypeName);
        Company company = companyRepository.findByLogin(login);
        Diet newDiet = new Diet();
        newDiet.setName(diet.getName());
        newDiet.setDescription(diet.getDescription());
        newDiet.setDietType(dietType);
        newDiet.setCompany(company);

        dietRepository.save(newDiet);

        return ResponseEntity.ok("Wysłano prośbę o akceptację diety");
    }

    public ResponseEntity<?> acceptDiet(Integer id) {
        Diet diet = dietRepository.findByDietId(id);
        diet.setStatus("Zaakceptowane");

        dietRepository.save(diet);

        return ResponseEntity.ok("Pomyślnie zaakceptowano dietę");
    }
}
