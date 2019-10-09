package com.java.otus.architect.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class User {

  private Number id;
  private String email;
  private String passwordHash;

}