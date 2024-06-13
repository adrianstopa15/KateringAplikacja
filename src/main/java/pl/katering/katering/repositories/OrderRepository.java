package pl.katering.katering.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.katering.katering.classes.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o FROM Order o WHERE o.orderId = :id")
    Order findByOrderId(Integer id);

    @Query("SELECT o FROM Order o WHERE o.customer.customerId = :id")
    List<Order> findByCustomerId(Integer id);
}
