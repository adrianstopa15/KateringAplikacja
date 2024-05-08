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
@Table(name = "macro")
public class Macro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer macro_id;

    private Double protein;

    private Double fat;

    private Double carbs;

    private Double calories;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;
}
