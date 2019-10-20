package com.java.otus.architect.page;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PartialRowMapper implements RowMapper<PartialPage> {

  @Override
  public PartialPage mapRow(ResultSet rs, int rowNum) throws SQLException {
    return PartialPage.builder().email(rs.getString("email")).firstName(rs.getString("firstName"))
        .lastName(rs.getString("lastName")).city(rs.getString("city")).build();
  }

}