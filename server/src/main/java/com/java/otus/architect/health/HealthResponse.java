package com.java.otus.architect.health;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class HealthResponse {

  private String status;

}