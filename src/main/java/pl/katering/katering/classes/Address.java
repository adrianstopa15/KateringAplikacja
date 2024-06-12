package pl.katering.katering.classes;

import com.fasterxml.jackson.annotation.*;
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
@Table(name = "address")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "addressId")

public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addressId;

    private String city;

    private String street;

    private String houseNumber;

    private String postalCode;

    private String apartmentNumber;

    private String floor;

    private String housingType;

    private boolean isDefault;

    //    @JsonIgnore
//    @JsonManagedReference(value = "address-customer")
    @ManyToOne
    @JsonBackReference(value = "customer-address")
    @JoinColumn(name = "customerId")
    private Customer customer;

    //    @JsonIgnore
    @JsonManagedReference(value = "address-company")
    @OneToOne
    @JoinColumn(name = "companyId")
    private Company company;
}