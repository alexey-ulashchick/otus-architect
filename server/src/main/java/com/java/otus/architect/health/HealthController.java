package com.java.otus.architect.health;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class HealthController {

  @GetMapping(path = "/health", produces = "application/json")
  public HealthResponse health() {
    return HealthResponse.builder().status("ok").build();
  }

}
