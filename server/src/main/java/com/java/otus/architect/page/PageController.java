package com.java.otus.architect.page;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PageController {

  @Autowired
  PageService pageService;

  @PostMapping(path = "/pages")
  public CreatePageResponse createPage(@RequestBody CreatePageRequest request, Principal principal) {
    Page page = Page.builder().email(principal.getName()).firstName(request.getFirstName())
        .lastName(request.getLastName()).city(request.getCity()).gender(request.getGender()).age(request.getAge())
        .areasOfInterest(request.getAreasOfInterest()).build();

    pageService.createPage(page);

    return CreatePageResponse.builder().build();
  }

  @GetMapping(path = "/pages")
  public List<PartialPage> getPages(@RequestParam(required = false, defaultValue = "") String query) {
    List<PartialPage> partialPages =  pageService.getAll(query);
    // Collections.sort(partialPages, (a,b) -> a.getEmail().compareTo(b.getEmail()));

    return partialPages;
  }

  @GetMapping(path = "/pages/{email}")
  public Page getPage(@PathVariable String email) {
    return pageService.getByEmail(email);
  }

  @GetMapping(path = "/areas-of-interest")
  public List<String> getAreasOfInterest() {
    return pageService.getAreasOfInterest();
  }

}