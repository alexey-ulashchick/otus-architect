package com.java.otus.architect.page;

import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class PageController {

  @Autowired
  PageService pageService;

  @PostMapping(path = "/page")
  public void createPage(@RequestBody CreatePageRequest request, Principal principal) {
    Page page = Page.builder().email(principal.getName()).firstName(request.getFirstName()).lastName(request.getLastName())
        .city(request.getCity()).gender(request.getGender()).age(request.getAge())
        .areasOfInterest(request.getAreasOfInterest()).build();

    pageService.createPage(page);
  }

}