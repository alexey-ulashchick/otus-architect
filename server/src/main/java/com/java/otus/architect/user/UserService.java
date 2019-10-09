package com.java.otus.architect.user;

import java.util.HashMap;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final static String TABLE = "users";

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

}