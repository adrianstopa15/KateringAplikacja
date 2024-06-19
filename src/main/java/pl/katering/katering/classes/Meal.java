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
    private Integer mealId;

    private String name;

    private String description;

    private String status = "Oczekujące";

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "typeId")
    private MealType mealType;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "dietId")
    private Diet diet;

    @JsonIgnore
    @OneToOne(mappedBy = "meal")
    private Macro macro;
}
