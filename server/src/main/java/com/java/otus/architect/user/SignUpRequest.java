package com.java.otus.architect.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequest {

  private String email; // TODO: Email Validation

  private String password; // TODO: Email Validation

}