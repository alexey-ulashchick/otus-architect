package com.java.otus.architect.page;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PageService {

  private final static String INSERT_PAGE = "insert into pages (`email`, `firstName`, `lastName`, `city`, `gender`, `age`) values (?,?,?,?,?,?)";
  private final static String INSERT_USER_AREA_OF_INTEREST = "insert into users_areasOfInterest (`email`, `areaOfInterest`) value (?,?)";

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Autowired
  DataSource dataSource;

  @Transactional
  public void createPage(Page page) {
    Object[] args = new Object[] { page.getEmail(), page.getFirstName(), page.getLastName(), page.getCity(),
        page.getGender().toString(), page.getAge() };

    for (String areaOfIntrest : page.getAreasOfInterest()) {
      addAreasOfInterest(page.getEmail(), areaOfIntrest);
    }

    jdbcTemplate.update(PageService.INSERT_PAGE, args);
  }

  private int addAreasOfInterest(String email, String areaOfInterest) {
    return jdbcTemplate.update(INSERT_USER_AREA_OF_INTEREST, new Object[] { email, areaOfInterest });
  }

}