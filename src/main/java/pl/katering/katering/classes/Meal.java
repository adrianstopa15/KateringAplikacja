package pl.katering.katering.classes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meal")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer meal_id;

    private String name;

    private String description;

    private Double price;

    private String status = "Oczekujące";

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "type_id")
    private MealType mealType;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "diet_id")
    private Diet diet;

    @JsonIgnore
    @OneToOne(mappedBy = "meal")
    private Macro macro;
}
