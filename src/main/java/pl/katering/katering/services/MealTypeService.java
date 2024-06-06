package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.MealType;
import pl.katering.katering.repositories.MealTypeRepository;

import java.util.List;

@Service
public class MealTypeService {
    private final MealTypeRepository mealTypeRepository;

    @Autowired
    public MealTypeService(MealTypeRepository mealTypeRepository) {
        this.mealTypeRepository = mealTypeRepository;
    }

    public List<MealType> showMealTypes() {
        return mealTypeRepository.findAll();
    }

    public ResponseEntity<?> addMealType(MealType mealType) {
        MealType newMealType = new MealType();
        newMealType.setName(mealType.getName());

        mealTypeRepository.save(newMealType);

        return ResponseEntity.ok("Pomyślnie dodano typ posiłku");
    }

    public ResponseEntity<?> editMealType(MealType mealType, Integer id) {
        MealType existMealType = mealTypeRepository.findByMealTypeId(id);
        existMealType.setName(mealType.getName());

        mealTypeRepository.save(existMealType);

        return ResponseEntity.ok("Pomyślnie edytowano typ posiłku");
    }

    public ResponseEntity<?> deleteMealType(Integer id) {
        MealType existMealType = mealTypeRepository.findByMealTypeId(id);

        mealTypeRepository.delete(existMealType);

        return ResponseEntity.ok("Pomyślnie usunięto typ posiłku");
    }
}
