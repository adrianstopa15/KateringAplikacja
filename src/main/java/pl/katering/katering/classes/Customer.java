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
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customer_id;

    private String first_name;

    private String last_name;

    private String address;

    private Integer phone;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
