package com.java.otus.architect.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class SignUpResponse {

  private String email;
}