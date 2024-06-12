package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Customer;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c WHERE c.user.userId = :id")
    Customer findByUserId(Integer id);

    @Query("SELECT c FROM Customer c WHERE c.customerId = :id")
    Customer findByCustomerId(Integer id);

    @Query("SELECT c FROM Customer c WHERE c.user.role = 'USER'")
    List<Customer> findCustomersOnly();
}
