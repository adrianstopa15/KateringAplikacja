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
@Table(name = "firm")
public class Firm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer firmId;

    private String companyName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String dietType;

    private String email;

    private String phone;

    private String nip;

    private String status = "Oczekujące";

    @JsonIgnore
    @OneToOne(mappedBy = "firm", cascade = CascadeType.ALL)
    private Address address;
}
