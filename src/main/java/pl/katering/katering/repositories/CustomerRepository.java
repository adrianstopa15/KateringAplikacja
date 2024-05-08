package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c WHERE c.user.user_id = :id")
    Customer findByUserId(Integer id);

    @Query("SELECT c FROM Customer c WHERE c.customer_id = :id")
    Customer findByCustomerId(Integer id);
}
