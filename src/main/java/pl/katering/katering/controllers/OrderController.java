package pl.katering.katering.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.katering.katering.classes.Order;
import pl.katering.katering.services.OrderService;

import java.util.List;

@RestController
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/showOrders")
    public List<Order> ordersList() {
        return orderService.showOrders();
    }

    @GetMapping("/showCustomerOrders")
    public List<Order> customerOrdersList(@RequestParam String login) {
        return orderService.showCustomerOrders(login);
    }

    @PostMapping("/addOrder")
    public ResponseEntity<?> addOrder(@RequestBody Order order, @RequestParam String login, @RequestParam Integer id) {
        return orderService.addOrder(order, login, id);
    }

    @PostMapping("/deleteOrder")
    public ResponseEntity<?> deleteOrder(@RequestParam Integer id) {
        return orderService.deleteOrder(id);
    }
}
