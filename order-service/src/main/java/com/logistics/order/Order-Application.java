package com.logistics.order;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderApplication {
    
    private final List<Map<String, String>> orders = new ArrayList<>();

    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }

    @PostMapping
    public Map<String, String> createOrder(@RequestBody Map<String, String> order) {
        order.put("id", UUID.randomUUID().toString());
        order.put("status", "PENDING_ASSIGNMENT");
        orders.add(order);
        return order;
    }

    @GetMapping
    public List<Map<String, String>> getOrders() {
        return orders;
    }
}
