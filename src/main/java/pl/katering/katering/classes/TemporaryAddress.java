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
@Table(name = "temporary_address")
public class TemporaryAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addressId;

    private String city;

    private String street;

    private String houseNumber;

    private String postalCode;

    private String apartmentNumber;

    private String floor;

    private String housingType = "firma";

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "companyId")
    private Company company;
}
