package com.java.otus.architect.auth;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginResponse {

  private final String token;

}