package pl.katering.katering.classes;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    private Double priceForDay;

    private String status = "Oczekujące";

    @JsonIgnore
    @OneToMany(mappedBy = "diet", cascade = CascadeType.ALL)
    private List<Meal> meals;

//    @JsonIgnore
//    @JsonManagedReference(value = "diet-dietType")
    @JsonIgnoreProperties("dietType")
    @ManyToOne
    @JoinColumn(name = "dietTypeId")
    private DietType dietType;

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "companyId")
    private Company company;

    @JsonIgnore
    @OneToMany(mappedBy = "diet", cascade = CascadeType.ALL)
    private List<Order> orders;
}
