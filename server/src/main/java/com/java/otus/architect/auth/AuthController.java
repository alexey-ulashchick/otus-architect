package com.java.otus.architect.auth;

import javax.validation.Valid;

import com.java.otus.architect.user.SignUpRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @PostMapping(path = "/sign-in", consumes = "application/json", produces = "application/json")
  public void signIn(@Valid @RequestBody SignUpRequest request) {
    System.out.println(request);
  }

}