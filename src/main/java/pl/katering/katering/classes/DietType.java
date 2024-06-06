package pl.katering.katering.classes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "diet_type")
public class DietType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dietTypeId;

    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "dietType")
    private List<Diet> diets;
}
