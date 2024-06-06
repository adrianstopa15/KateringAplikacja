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
@Table(name = "company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer companyId;

    private String companyName;

    private String login;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String dietType;

    private String email;

    private String phone;

    private String nip;

    private String status = "Oczekujące";

    @JsonIgnore
    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL)
    private Address address;

    @JsonIgnore
    @OneToMany(mappedBy = "company")
    private List<Diet> diets;
}
