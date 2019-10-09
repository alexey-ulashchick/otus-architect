package com.java.otus.architect.user;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserRowMapper implements RowMapper<User> {

  @Override
  public User mapRow(ResultSet rs, int rowNum) throws SQLException {
    return User.builder().email(rs.getString("email")).passwordHash(rs.getString("password")).id(rs.getInt("id"))
        .build();
  }

}