package com.java.otus.architect.auth;

import org.hibernate.validator.constraints.Email;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {

  @Email(message = "Should be valid email")
  private String email;
  private String password;

}