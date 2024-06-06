package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import pl.katering.katering.classes.DietType;
import pl.katering.katering.repositories.DietTypeRepository;

import java.util.List;

@Service
public class DietTypeService {
    private final DietTypeRepository dietTypeRepository;

    @Autowired
    public DietTypeService(DietTypeRepository dietTypeRepository) {
        this.dietTypeRepository = dietTypeRepository;
    }

    public List<DietType> showDietTypes() {
        return dietTypeRepository.findAll();
    }

    public ResponseEntity<?> addDietType(DietType dietType) {
        DietType newDietType = new DietType();
        newDietType.setName(dietType.getName());

        dietTypeRepository.save(newDietType);

        return ResponseEntity.ok("Pomyślnie dodano nowy rodzaj diety");
    }

    public ResponseEntity<?> editDietType(DietType dietType, Integer id) {
        DietType existDietType = dietTypeRepository.findByDietTypeId(id);
        existDietType.setName(dietType.getName());

        dietTypeRepository.save(existDietType);

        return ResponseEntity.ok("Pomyślnie edytowano rodzaj diety");
    }

    public ResponseEntity<?> deleteDietType(Integer id) {
        DietType dietType = dietTypeRepository.findByDietTypeId(id);

        dietTypeRepository.delete(dietType);

        return ResponseEntity.ok("Pomyślnie usunięto rodzaj diety");
    }
}
