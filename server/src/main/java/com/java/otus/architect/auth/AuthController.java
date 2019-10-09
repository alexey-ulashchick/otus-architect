package com.java.otus.architect.auth;

import javax.validation.Valid;

import com.java.otus.architect.user.SignUpRequest;
import com.java.otus.architect.user.SignUpResponse;
import com.java.otus.architect.user.User;
import com.java.otus.architect.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  private UserService userService;

  @PostMapping(path = "/sign-in", consumes = "application/json", produces = "application/json")
  public LoginResponse signIn(@Valid @RequestBody LoginRequest request) throws Exception {
    authenticate(request.getEmail(), request.getPassword()); //TODO: Catch exceptions normally
    User user = userService.getByEmail(request.getEmail());
    String token = jwtTokenUtil.generateToken(user);

    return LoginResponse.builder().token(token).build();
  }

  private void authenticate(String email, String password) throws Exception {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    } catch (DisabledException e) {
      throw new Exception("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new Exception("INVALID_CREDENTIALS", e);
    }
  }

}