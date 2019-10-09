package com.java.otus.architect.auth;

public class LoginResponse {

  private final String token;

  public String getToken() {
    return token;
  }

  public LoginResponse(String token) {
    this.token = token;
  }
}