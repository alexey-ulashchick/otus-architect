package com.java.otus.architect.page;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class PageResultExtractor implements ResultSetExtractor<List<Page>> {

  @Override
  public List<Page> extractData(ResultSet rs) throws SQLException, DataAccessException {
    Map<String, Page> map = new HashMap<>();

    while (rs.next()) {
      Page page;
      String email = rs.getString("email");

      if (map.containsKey(email)) {
        page = map.get(email);
      } else {
        page = Page.builder()
          .email(email)
          .firstName(rs.getString("firstName"))
          .lastName(rs.getString("lastName"))
          .city(rs.getString("city"))
          .gender(Gender.valueOf(rs.getString("gender")))
          .age(rs.getInt("age"))
          .areasOfInterest(new ArrayList<String>())
          .build();

        map.put(email, page);
      }

      if (rs.getString("areaOfInterest") != null) {
        page.getAreasOfInterest().add(rs.getString("areaOfInterest"));
      }

    }

    return map.values().stream().collect(Collectors.toList());
  }

}