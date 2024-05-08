package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.Diet;
import pl.katering.katering.repositories.DietRepository;

import java.util.List;

@Service
public class DietService {
    private final DietRepository dietRepository;

    @Autowired
    public DietService(DietRepository dietRepository) {
        this.dietRepository = dietRepository;
    }

    public List<Diet> showDiets() {
        return dietRepository.findAll();
    }

    public ResponseEntity<?> addDiet(Diet diet) {
        Diet newDiet = new Diet();
        newDiet.setName(diet.getName());
        newDiet.setDescription(diet.getDescription());

        dietRepository.save(newDiet);

        return ResponseEntity.ok("Pomyślnie dodano dietę");
    }
}
