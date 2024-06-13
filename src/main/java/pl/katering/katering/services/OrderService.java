package pl.katering.katering.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.katering.katering.classes.Customer;
import pl.katering.katering.classes.Diet;
import pl.katering.katering.classes.Order;
import pl.katering.katering.classes.User;
import pl.katering.katering.repositories.CustomerRepository;
import pl.katering.katering.repositories.DietRepository;
import pl.katering.katering.repositories.OrderRepository;
import pl.katering.katering.repositories.UserRepository;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final DietRepository dietRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserRepository userRepository, CustomerRepository customerRepository, DietRepository dietRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.dietRepository = dietRepository;
    }

    public List<Order> showOrders() {
        return orderRepository.findAll();
    }

    public List<Order> showCustomerOrders(String login) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUserId());
        return orderRepository.findByCustomerId(customer.getCustomerId());
    }

    public ResponseEntity<?> addOrder(Order order, String login, Integer id) {
        Optional<User> user = userRepository.findByLogin(login);
        Customer customer = customerRepository.findByUserId(user.get().getUserId());
        Diet diet = dietRepository.findByDietId(id);
        Order newOrder = new Order();
        newOrder.setOrderName(order.getOrderName());
        newOrder.setStartDate(order.getStartDate());
        newOrder.setEndDate(order.getEndDate());
        long daysBetween = ChronoUnit.DAYS.between(order.getStartDate().toInstant(), order.getEndDate().toInstant());
        Double finalPrice = daysBetween * diet.getPriceForDay();
        newOrder.setPrice(finalPrice);

        newOrder.setCustomer(customer);
        newOrder.setDiet(diet);

        orderRepository.save(newOrder);

        return ResponseEntity.ok("Pomyślnie utworzono zamówienie");
    }

    public ResponseEntity<?> deleteOrder(Integer id) {
        Order order = orderRepository.findByOrderId(id);

        orderRepository.delete(order);

        return ResponseEntity.ok("Pomyślnie usunięto zamówienie");
    }
}
