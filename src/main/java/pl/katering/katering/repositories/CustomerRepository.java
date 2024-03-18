package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.katering.katering.classes.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

}
