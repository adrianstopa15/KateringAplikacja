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
@Table(name = "diet")
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dietId;

    private String dietName;

    private String dietDescription;

    //cena dodanie

    private String status = "Oczekujące";

    @JsonIgnore
    @OneToMany(mappedBy = "diet")
    private List<Meal> meals;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "dietTypeId")
    private DietType dietType;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "companyId")
    private Company company;
}
