package com.logistics.tracking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@SpringBootApplication
@RestController
@RequestMapping("/api/tracking")
@CrossOrigin(origins = "*")
public class TrackingApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrackingApplication.class, args);
    }

    @GetMapping("/{orderId}")
    public Map<String, Object> getTrackingDetails(@PathVariable String orderId) {
        return Map.of(
            "orderId", orderId,
            "status", "IN_TRANSIT",
            "latitude", 6.5244,
            "longitude", 3.3792,
            "currentLocation", "Lagos Central Hub"
        );
    }
}
