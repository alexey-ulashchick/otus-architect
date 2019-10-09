package com.java.otus.architect.page;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class PageController {

  @GetMapping(path = "/page")
  public String getMethodName(@RequestParam String param) {
    return param;
  }

}