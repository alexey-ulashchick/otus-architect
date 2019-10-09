package com.java.otus.architect.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class User {

  private Number id;
  private String email;
  private String passwordHash;

}