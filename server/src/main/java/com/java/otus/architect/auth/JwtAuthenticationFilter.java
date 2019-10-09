package com.java.otus.architect.auth;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
      this.authenticationManager = authenticationManager;

      setFilterProcessesUrl("/sign-up");
      setFilterProcessesUrl("/sign-in");
  }

  // @Override
  // public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
      // String username = request.getParameter("username");
      // String password = request.getParameter("password");
      // String authenticationToken = new UsernamePasswordAuthenticationToken(username, password);

      // return authenticationManager.authenticate(authenticationToken);
  // }

  // @Override
  // protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
  //                                         FilterChain filterChain, Authentication authentication) {
  //     var user = ((User) authentication.getPrincipal());

  //     var roles = user.getAuthorities()
  //         .stream()
  //         .map(GrantedAuthority::getAuthority)
  //         .collect(Collectors.toList());

  //     var signingKey = SecurityConstants.JWT_SECRET.getBytes();

  //     var token = Jwts.builder()
  //         .signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
  //         .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
  //         .setIssuer(SecurityConstants.TOKEN_ISSUER)
  //         .setAudience(SecurityConstants.TOKEN_AUDIENCE)
  //         .setSubject(user.getUsername())
  //         .setExpiration(new Date(System.currentTimeMillis() + 864000000))
  //         .claim("rol", roles)
  //         .compact();

  //     response.addHeader(SecurityConstants.TOKEN_HEADER, SecurityConstants.TOKEN_PREFIX + token);
  // }
}
