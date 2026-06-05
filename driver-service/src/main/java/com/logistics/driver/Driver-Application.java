package com.logistics.driver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverApplication {

    public static void main(String[] args) {
        SpringApplication.run(DriverApplication.class, args);
    }

    @GetMapping("/available")
    public List<Map<String, String>> getAvailableDrivers() {
        return Arrays.asList(
            Map.of("driverId", "D101", "name", "John Doe", "vehicle", "Prime Truck"),
            Map.of("driverId", "D102", "name", "Alex Smith", "vehicle", "Van 04")
        );
    }
}
