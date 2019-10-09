package com.java.otus.architect.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  private UserService userService;

  @PostMapping(path = "/sign-up", consumes = "application/json", produces = "application/json")
  public SignUpResponse signUp(@RequestBody SignUpRequest signUpRequest) {
    User user = User.builder().email(signUpRequest.getEmail())
        .passwordHash(bCryptPasswordEncoder.encode(signUpRequest.getPassword())).build();

    int generatedId = userService.createUser(user);

    return SignUpResponse.builder().id(generatedId).build();
  }

}
