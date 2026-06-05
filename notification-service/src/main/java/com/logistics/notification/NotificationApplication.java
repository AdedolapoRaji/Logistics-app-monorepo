package com.logistics.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@SpringBootApplication
@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotificationApplication.class, args);
    }

    @PostMapping("/send")
    public Map<String, String> sendAlert(@RequestBody Map<String, String> request) {
        return Map.of(
            "status", "SENT",
            "recipient", request.getOrDefault("email", "customer@logistics.com"),
            "message", "Your package delivery status updated!"
        );
    }
}
