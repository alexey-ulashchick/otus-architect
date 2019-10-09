package com.java.otus.architect.user;

import java.util.HashMap;
import java.util.Map;
import javax.sql.DataSource;

import com.java.otus.architect.auth.AuthorizedUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  private final static String TABLE = "users";
  private final static String SELECT_BY_EMAIL = "select * from users where email=?";

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Autowired
  DataSource dataSource;

  public int createUser(User user) {

    Map<String, Object> parameters = new HashMap<String, Object>();
    parameters.put("email", user.getEmail());
    parameters.put("password", user.getPasswordHash());

    return new SimpleJdbcInsert(dataSource).withTableName(UserService.TABLE).usingGeneratedKeyColumns("id")
        .executeAndReturnKey(parameters).intValue();
  }

  public User getByEmail(String email) {
    return jdbcTemplate.queryForObject(UserService.SELECT_BY_EMAIL, new Object[] { email }, new UserRowMapper());
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = getByEmail(username);

    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    return AuthorizedUser.builder().username(user.getEmail()).password(user.getPasswordHash()).build();
  }

}