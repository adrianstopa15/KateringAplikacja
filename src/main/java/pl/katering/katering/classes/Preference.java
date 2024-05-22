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
@Table(name = "preference")
public class Preference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer preferenceId;

    private String weight;

    private String height;

    private String age;

    private String gender;

    private String bmi;

    private String selectedGoal;

    private Double activityLevel;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "customerId")
    private Customer customer;
}
