package com.java.otus.architect.page;

import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class PageController {

  @Autowired
  PageService pageService;

  @PostMapping(path = "/pages")
  public void createPage(@RequestBody CreatePageRequest request, Principal principal) {
    Page page = Page.builder().email(principal.getName()).firstName(request.getFirstName()).lastName(request.getLastName())
        .city(request.getCity()).gender(request.getGender()).age(request.getAge())
        .areasOfInterest(request.getAreasOfInterest()).build();

    pageService.createPage(page);
  }

  @GetMapping(path = "/pages")
  public List<Page> getPages() {
      return pageService.getAll();
  }

}