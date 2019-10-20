package com.java.otus.architect.page;

import java.util.List;
import java.util.stream.Collectors;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PageService {

  private final static String DELETE_PAGE = "delete from pages where email = ?";
  private final static String DELETE_USERS_AREAS_OF_INTEREST = "delete from users_areasOfInterest where email = ?";
  private final static String INSERT_PAGE = "insert into pages (`email`, `firstName`, `lastName`, `city`, `gender`, `age`) values (?,?,?,?,?,?)";
  private final static String INSERT_USER_AREA_OF_INTEREST = "insert into users_areasOfInterest (`email`, `areaOfInterest`) value (?,?)";
  private final static String SELECT_PAGES = "select email, firstName, lastName, city from pages where firstName like ? or lastName like ? order by email asc limit ? offset ?;";
  private final static String SELECT_BY_EMAIL = "select * from pages left join users_areasOfInterest on pages.email = users_areasOfInterest.email where pages.email = ?";
  private final static String SELECT_AREAS_OF_INTERES = "select * from areasOfInterest";
  private final static String COUNT = "select count(*) from pages WHERE firstName like ? OR lastName like ?";

  private final static int LIMIT = 1000;

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Autowired
  DataSource dataSource;

  @Transactional
  public void createPage(Page page) {
    jdbcTemplate.update(DELETE_PAGE, new Object[] { page.getEmail() });
    jdbcTemplate.update(DELETE_USERS_AREAS_OF_INTEREST, new Object[] { page.getEmail() });

    Object[] args = new Object[] { page.getEmail(), page.getFirstName(), page.getLastName(), page.getCity(),
        page.getGender().toString(), page.getAge() };

    for (String areaOfIntrest : page.getAreasOfInterest()) {
      addAreasOfInterest(page.getEmail(), areaOfIntrest);
    }

    jdbcTemplate.update(INSERT_PAGE, args);
  }

  public int getTotal(String query) {
    return jdbcTemplate.queryForObject(COUNT, new Object[] { query + '%', query + '%' }, Integer.class);
  }

  public List<PartialPage> getAll(String query, int offset) {
    return jdbcTemplate.query(SELECT_PAGES, new Object[] { query + '%', query + '%', LIMIT, offset },
        new PartialRowMapper());
  }

  public Page getByEmail(String email) {
    List<Page> pages = jdbcTemplate.query(SELECT_BY_EMAIL, new Object[] { email }, new PageResultExtractor());
    return pages.get(0);
  }

  public List<String> getAreasOfInterest() {
    return jdbcTemplate.queryForList(SELECT_AREAS_OF_INTERES).stream()
        .map(mapper -> (String) mapper.get("areaOfInterest")).collect(Collectors.toList());
  }

  private int addAreasOfInterest(String email, String areaOfInterest) {
    return jdbcTemplate.update(INSERT_USER_AREA_OF_INTEREST, new Object[] { email, areaOfInterest });
  }

}
